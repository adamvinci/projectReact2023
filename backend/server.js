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
      `${klarnaApiUrl}/payments/v1/authorizations/${authorizationToken}/order`,
      req.body,
      {
        auth: klarnaCredentials,
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error placing Klarna order:", error);
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
