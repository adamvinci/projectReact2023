import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm.jsx";
import KlarnaButton from "../Klarna/KlarnaButton.jsx";

const initStripe = async () => {
  const res = await axios.get("/api/publishable-key");
  const publishableKey = await res.data.publishable_key;

  return loadStripe(publishableKey);
};

const Checkout = ({ price }) => {
  const stripePromise = initStripe();

  const [clientSecretSettings, setClientSecretSettings] = useState({
    clientSecret: "",
    loading: true,
  });

  const [clientSecretKlarna, setClientSecretKlarna] = useState({
    session_id: "",
    clientToken: "",
  });

  const createPaymentIntent = async () => {
    const response = await axios.post("/api/create-payment-intent", {
      price,
    });

    setClientSecretSettings({
      clientSecret: response.data.client_secret,
      loading: false,
    });
  };

  const createKlarnaPayment = async () => {
    const response = await axios.post("/api/create-session-klarna");
    setClientSecretKlarna({
      session_id: response.data.session_id,
      clientToken: response.data.clientToken,
    });
  };

  useEffect(() => {
    createPaymentIntent();
    createKlarnaPayment();
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
        <KlarnaButton handleClick={createKlarnaPayment} />
      </div>
    </div>
  );
};

export default Checkout;
