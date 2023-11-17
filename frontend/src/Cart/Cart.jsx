import { Context as CartContext } from "../Context/CartContext";
import { useContext } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Cart = () => {
  const navigate = useNavigate();

  const { cart, deleteCart } = useContext(CartContext);

  const MySwal = withReactContent(Swal);

  // search if url contains redirect_status (means that payment succeded or failed) then empty the cart and clear the url
  const [searchParams, setSearchParams] = useSearchParams();
  if (searchParams.has("redirect_status")) {
    if (searchParams.get("redirect_status") === "succeeded") {
      MySwal.fire({
        title: "Payment Accepted",
        icon: "success",
        timer: 5000,
      }).then(() => {
        deleteCart();
        setSearchParams([]);
      });
    } else {
      MySwal.fire({
        title: "Payment Refused",
        icon: "error",
        timer: 5000,
      }).then(() => {
        setSearchParams([]);
      });
    }
  }

  const calculateTotalPrice = () => {
    let totalprice = 0;
    cart.map((product) => {
      totalprice += product.price;
    });
    return totalprice;
  };
  const checkoutHandler = async () => {
    const price = calculateTotalPrice();
    if (price == 0) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "You need to have products in your cart to proceed with the purchase",
      });
    } else {
      const result = await MySwal.fire({
        title: "Choose Payment Method",
        showCancelButton: true,
        confirmButtonText: "Stripe",
        cancelButtonText: "Klarna",
        reverseButtons: true,
        icon: "question",
      });

      if (result.isConfirmed) {
        // User chose Stripe
        navigate("/payement");
      } else {
        // User chose Klarna
        navigate("/klarna");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h2>Shopping Cart</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`src/img/${item.images[0]}`}
                      alt={item.name}
                      width="100"
                      height="100"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Order Summary</h2>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Total Price: ${calculateTotalPrice()}
              </h5>
              <button onClick={checkoutHandler} className="btn btn-primary">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
