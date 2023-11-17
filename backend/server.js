require("dotenv").config();
const axios = require("axios");
const base64 = require("base-64");

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const klarnaApiUrl = "https://api.playground.klarna.com";

// KLARNA credential
const klarnacreds = {
  uid: process.env.KLARNA_UID,
  password: process.env.KLARNA_PASSWORD,
};
const klarnaCredentials = base64.encode(
  `${klarnacreds.uid}:${klarnacreds.password}`
);

// create Klarna session
/*
fastify.post("/create-klarna-session", async (req, res) => {
  //const { price } = req.body;
  //console.log(price);
  try {
    const response = await axios.post(
      `${klarnaApiUrl}/payments/v1/sessions`,
      req.body,
      {
        auth: klarnaCredentials,
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error creating Klarna session:", error);
    res.status(500).send("Internal Server Error");
  }
});
*/
fastify.post("/create-klarna-session", async (req, res) => {
  //const { price } = req.body;
  //console.log(price);
  try {
    const response = await axios.post(
      "https://api.playground.klarna.com/payments/v1/sessions",
      {
        intent: "buy",
        purchase_country: "BE",
        purchase_currency: "EUR",
        locale: "en-US",
        order_amount: 10,
        order_tax_amount: 0,
        order_lines: [
          {
            name: "vinciShop",
            unit_price: 4,
            quantity: 2,
            total_amount: 10,
          },
        ],
      },
      {
        headers: {
          Authorization: `Basic ${klarnaCredentials}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = response.data;
    console.log(responseData);
    res.send({
      responseData,
    });
  } catch (error) {
    console.error("Error creating Klarna session:", error.message);
    reply.status(500).send("Internal Server Error");
  }
});

//  place Klarna order
fastify.post("/place-klarna-order/:authorizationToken", async (req, res) => {
  const { authorizationToken } = req.params;
  try {
    const response = await axios.post(
      `https://api.playground.klarna.com/payments/v1/authorizations/${authorizationToken}/order`,
      {
        purchase_country: "BE",
        purchase_currency: "EUR",
        order_amount: 10,
        order_lines: [
          {
            name: "vinciShop",
            unit_price: 4,
            quantity: 2,
            total_amount: 10,
          },
        ],
      }, {
      headers: {
        Authorization: `Basic ${klarnaCredentials}`,
        "Content-Type": "application/json",
      },
    }
    );
    console.log(response.data)
    res.send(response.data);
  } catch (error) {
    console.error("Error placing Klarna order:", error.response.data);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
