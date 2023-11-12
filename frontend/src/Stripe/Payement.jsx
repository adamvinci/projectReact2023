import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Klarna from "https://x.klarnacdn.net/kp/lib/v1/api.js";
import CheckoutFromKlarna from "./CheckoutFormKlarna";

const initStripe = async () => {
  const res = await axios.get("/api/publishable-key");
  const publishableKey = await res.data.publishable_key;

  return loadStripe(publishableKey);
};

Klarna.Payments.load({
  container: "#klarna-payments-container",
  payment_method_categories: [
    {
      asset_urls: {},
      identifier: "klarna",
      name: "Pay with Klarna",
    },
  ],
  function(res) {
    console.debug(res);
  },
});

/*
const initKlarna = async () => {
  Klarna.Payments.init({
    client_token: "",
  });
};
*/

const Checkout = ({ price }) => {
  const stripePromise = initStripe();

  /*
  const klarnaPromise = initKlarna({
    client_token: clientSecretKlarna.clientToken,
  });
  */

  const [clientSecretSettings, setClientSecretSettings] = useState({
    clientSecret: "",
    loading: true,
  });

  /*
  const [clientSecretKlarna, setClientSecretKlarna] = useState({
    session_id: "",
    clientToken: "",
    loading: true,
  });
  */

  const createPaymentIntent = async () => {
    const response = await axios.post("/api/create-payment-intent", {
      price,
    });

    setClientSecretSettings({
      clientSecret: response.data.client_secret,
      loading: false,
    });
  };

  /*
  const createKlarnaPayment = async () => {
    const response = await axios.post("/api/create-session-klarna");
    setClientSecretKlarna({
      session_id: response.data.session_id,
      clientToken: response.data.clientToken,
      loading: false,
    });
  };
  */

  useEffect(() => {
    createPaymentIntent();
    // createKlarnaPayment();
  }, []);

  return (
    <div>
      {clientSecretSettings.loading ? (
        <h1>Loading ...</h1>
      ) : (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecretSettings.clientSecret,
            appearance: { theme: "stripe" },
          }}
        >
          <CheckoutForm />
        </Elements>
      )}

      <div>
        <CheckoutFromKlarna />
      </div>
    </div>
  );
};

export default Checkout;
