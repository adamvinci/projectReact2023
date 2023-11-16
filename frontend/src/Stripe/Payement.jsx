import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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

  const [clientSecretKlarna, setClientSecretKlarna] = useState("");
  //call to api to get clientsecret
  const getKlarnaClientSecret = async () => {
    try {
      const data = await fetch("/api/create-klarna-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "buy",
          purchase_country: "BE",
          purchase_currency: "EUR",
          locale: "fr-BE",
          order_amount: 1,
          order_tax_amount: 0,
          order_lines: [
            {
              type: "physical",
              //reference: "",
              name: "clothes",
              quantity: 1,
              unit_price: 1,
              tax_rate: 0,
              total_amount: `${price}`,
              total_discount_amount: 0,
              total_tax_amount: 0,
              //image_url: "https://www.exampleobjects.com/logo.png",
              //product_url: "https://www.estore.com/products/f2a8d7e34",
            },
          ],
        }),
      });
    } catch (error) {
      console.error(error);
    }

    const response = await data.json();
    console.log(response);
    const client_token = response.client_token;

    setClientSecretKlarna(client_token);
  };

  // Initialize Klarna Payments
  //Klarna.Payments.init({ client_token: clientSecretKlarna });
  // Load Klarna payment methods into container
  useEffect(() => {
    Klarna.Payments.init({
      client_token: clientSecretKlarna.clientToken,
    });
    Klarna.Payments.load({
      container: "#klarna_container",
    });
  }, [clientSecretKlarna.clientToken]);
  useEffect(() => {
    getKlarnaClientSecret();
  }, []);

  /*
  useEffect(() => {
    // Load Klarna script
    
    const script = document.createElement("script");
    script.src = "https://x.klarnacdn.net/kp/lib/v1/api.js";
    script.async = true;
    document.body.appendChild(script);
    

    // Cleanup: Remove the script from the document when the component unmounts
    
    return () => {
      document.body.removeChild(script);
    };
    
  }, [clientSecretKlarna.clientToken]);
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
        ></Elements>
      )}
      <div id="klarna_container"></div>
    </div>
  );
};

export default Checkout;
