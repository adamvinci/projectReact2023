require("dotenv").config();
// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// KLARNA credential
const klarnaCredentials = {
  uid: process.env.KLARNA_UID,
  password: process.env.KLARNA_PASSWORD,
};

// KLARNA create session
fastify.post("/create-session-klarna", async (request, reply) => {
  try {
    const response = await fastify.post(
      `https://api.klarna.com/payments/v1/sessions`,
      request.body,
      {
        auth: klarnaCredentials,
        headers: { "Content-Type": "application/json" },
      }
    );
    reply.json(response.data);
  } catch (error) {
    console.error("Error creating Klarna session:", error);
    reply.status(500).send("Internal Server Error");
  }
});

// Klarna order
fastify.post(
  "/place-order-klarna/:authorizationToken",
  async (request, reply) => {
    const { authorizationToken } = request.params;
    try {
      const response = await fastify.post(
        `https://api.klarna.com/payments/v1/authorizations/${authorizationToken}/order`,
        request.body,
        {
          auth: klarnaCredentials,
          headers: { "Content-Type": "application/json" },
        }
      );
      reply.json(response.data);
    } catch (error) {
      console.error("Error placing Klarna order:", error);
      reply.status(500).json({ error: "Internal Server Error" });
    }
  }
);

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
