import { useEffect, useState } from "react";
import "./KlarnaPayment.css";

const CheckoutKlarna = ({ price }) => {
  const [clientSecretKlarna, setClientSecretKlarna] = useState("");

  const getKlarnaClientSecret = async () => {
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
    const response = await data.json();
    const client_token = response.responseData.client_token;

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
        order_amount: 2000,
        order_tax_amount: 0,
        order_lines: [{
          type: "physical",
          reference: "19-402-USA",
          name: "Battery Power Pack",
          quantity: 1,
          unit_price: 10,
          tax_rate: 0,
          total_amount: 10,
          total_discount_amount: 0,
          total_tax_amount: 0,
        }],
      }, function (res) {
        console.log(res);
      })
    }
    // Authorize payment with Klarna

  }
  /* Klarna.Payments.finalize(
     { payment_method_category: "pay_now" },
     {},
     function (res) { }
   );*/
  return (
    <div>
      <div id="klarna_container">


      </div>
      <div id="boutonKlarna"> <button onClick={() => authorizeHandler()}>Buy</button></div>
    </div>
  );
};

export default CheckoutKlarna;