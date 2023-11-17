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
  console.log(clientSecretKlarna);

  if (clientSecretKlarna) {
    Klarna.Payments.init({
      client_token: clientSecretKlarna,
    });
    Klarna.Payments.load({
      container: "#klarna_container",
    });
    // Authorize payment with Klarna
    Klarna.Payments.authorize(
      {
        payment_method_categories: {
          payment_method_categories: "pay now",
          auto_finalize: false,
        },
        purchase_country: "BE",
        purchase_currency: "EUR",
        locale: "FR-BE",
        billing_address: {
          given_name: "lambda",
          family_name: "lambda",
          email: "lambda@google.com",
          title: "Mr",
          street_address: "lambda",
          street_address2: "lambda",
          postal_code: "90210",
          city: "lambda",
          region: "BXL",
          phone: "0000000",
          country: "BE",
        },
        order_amount: `${price}`,
        order_tax_amount: 0,
        order_lines: [
          {
            type: "physical",
            reference: "19-402-USA",
            name: "Battery Power Pack",
            quantity: 1,
            unit_price: `${price}`,
            tax_rate: 0,
            total_amount: 10,
            total_discount_amount: 0,
            total_tax_amount: 0,
            product_url: "https://www.estore.com/products/f2a8d7e34",
            image_url: "https://www.exampleobjects.com/logo.png",
          },
        ],
        customer: {
          date_of_birth: "1970-01-01",
        },
      },
      function (res) {
        console.log(res);
      }
    );
    Klarna.Payments.finalize(
      { payment_method_category: "pay_now" },
      {},
      function (res) {}
    );
  }

  return (
    <div>
      <div id="klarna_container"></div>
    </div>
  );
};

export default CheckoutKlarna;
