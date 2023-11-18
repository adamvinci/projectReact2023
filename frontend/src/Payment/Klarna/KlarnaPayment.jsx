import { useEffect, useState } from "react";
import "./KlarnaPayment.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CheckoutKlarna = ({ price }) => {
  const navigate = useNavigate();
  const [clientSecretKlarna, setClientSecretKlarna] = useState("");

  const getKlarnaClientSecret = async () => {
    const response = await axios.post("/api/create-klarna-session", {price});
    const client_token = response.data.responseData.client_token;

    setClientSecretKlarna(client_token);
  };
  useEffect(() => {
    getKlarnaClientSecret();
  }, []);

  if (clientSecretKlarna) {
    Klarna.Payments.init({
      client_token: clientSecretKlarna,
    });
    Klarna.Payments.load({
      container: "#klarna_container",
      payment_method_categories: '',
    });

  }
  const authorizeHandler = () => {
    if (clientSecretKlarna) {
      Klarna.Payments.authorize({
        payment_method_categories: '',
        billing_address: {
          given_name: "John",
          family_name: "Doe",
          email: "john@doe.com",
          title: "Mr",
          street_address: "512 City Park Ave",
          postal_code: "43215",
          city: "Columbus",
          region: "oh",
          phone: "6142607295",
          country: "US"
        },
      }, async ({ authorization_token }) => {
        const response = await axios.post(`/api/place-klarna-order/${authorization_token}`,{price});
        console.log(response.data)
        if (response.data.fraud_status === 'ACCEPTED') {
          navigate("/cart?redirect_status=succeeded");
        } else {
          navigate("/cart?redirect_status=failed");
        }
      }
      );
    }
  }
  return (
    <div>
      <div id="klarna_container">


      </div>
      <div id="boutonKlarna"> <button onClick={() => authorizeHandler()}>Buy</button></div>
    </div>
  );
};

export default CheckoutKlarna;
