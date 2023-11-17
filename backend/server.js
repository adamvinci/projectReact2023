require("dotenv").config();

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Fetch the publishable key to initialize Stripe.js
fastify.get("/publishable-key", () => {
  return { publishable_key: process.env.STRIPE_PUBLISHABLE_KEY };
});

// Create a payment intent and return its client secret
fastify.post("/create-payment-intent", async (request) => {
  const { price } = request.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: "eur",
    payment_method_types: ["bancontact", "card", "paypal"],
  });

  return { client_secret: paymentIntent.client_secret };
});
// SUBSCRIPTION
fastify.get('/config', async (req, res) => {
  try {
    const products = await stripe.products.list({
      limit: 2,
    });

    const productsWithPrices = await Promise.all(
      products.data.map(async (product) => {
        const prices = await stripe.prices.list({
          product: product.id,
          limit: 1,
        });

        const price = prices.data.length > 0 ? prices.data[0] : null;

        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: price ? price.unit_amount / 100 : null,
          currency: price ? price.currency : null,
          priceId: product.default_price
        };
      })
    );

    res.send({
      products: productsWithPrices,
    });
  } catch (error) {
    console.error('Error retrieving products and prices:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Create a new customer object
fastify.post('/create-customer', async (req, res) => {

  const customer = await stripe.customers.create({
    email: req.body.email,
  });


  res.send({ customer: customer });
});

fastify.post('/create-subscription', async (req, res) => {
  const customerId = req.body.customerId;
  const priceId = req.body.priceId;
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});



// Run the server
const start = async () => {
  try {
    await fastify.listen(5252);
    console.log("Server listening ... ");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();