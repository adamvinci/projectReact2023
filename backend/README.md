# Accepting a payment with Stripe and Klarna

An [Express server](http://expressjs.com) implementation

## Requirements

- Node v10+
- Configured .env file

## How to run

1. Confirm `.env` configuration

Ensure the API keys are configured in `.env` in this directory. It should include the following keys:
# Stripe API keys - see https://stripe.com/docs/development/quickstart#api-keys
STRIPE_PUBLISHABLE_KEY=pk_test...
STRIPE_SECRET_KEY=sk_test...
KLARNA_UID=..
KLARNA_PASSWORD=..

2. Install dependencies and start the server

```
npm install
npm start
```

3. The react frontend will be running on `localhost:4242`. Follow the instructions in the README there to install and start the frontend server.
