import React, { useState } from "react";
import "./Payement.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Klarna from "https://x.klarnacdn.net/kp/lib/v1/api.js";

const CheckoutFromKlarna = () => {
  const MySwal = withReactContent(Swal);

  // const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    Klarna.Payments.init({
      client_token: clientSecretKlarna.clientToken,
    });

    const [clientSecretKlarna, setClientSecretKlarna] = useState({
      session_id: "",
      clientToken: "",
      loading: true,
    });

    const createKlarnaPayment = async () => {
      const response = await axios.post("/api/create-session-klarna");
      setClientSecretKlarna({
        session_id: response.data.session_id,
        clientToken: response.data.clientToken,
        loading: false,
      });
    };

    useEffect(() => {
      createKlarnaPayment();
    }, []);
  };

  return <div id="klarna-payments-container"></div>;
};

export default CheckoutFromKlarna;
