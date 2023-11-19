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

# Credits
Chemin du fichier où se trouve le code réutilisé : ./server.js
Auteur du code source réutilisé : matthewling
URL où le code réutilisé est disponible: https://github.com/matthewling-stripe/vite-react-stripe/blob/main/server.js
Raison de la réutilisation du code: creation session de payement stripe

