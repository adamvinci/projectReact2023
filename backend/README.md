# Accepting a payment with Stripe and Klarna

An [Express server](http://expressjs.com) implementation

## Requirements

- Node v10+
- Configured .env file

## How to run

1. Confirm `.env` configuration

Ensure the API keys are configured in `.env` in this directory. It should include the following keys:

STRIPE_PUBLISHABLE_KEY=pk_test...
STRIPE_SECRET_KEY=sk_test...
KLARNA_UID=..
KLARNA_PASSWORD=..

2. Install dependencies and start the server

```
npm install
npm start
```

3. This backend will be running on `localhost:5252`
