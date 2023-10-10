import { Context as CartContext } from '../Context/CartContext'
import { useContext } from "react"
import React from "react";
const Cart = () => {

    const { cart } = useContext(CartContext)
    const calculateTotalPrice = () => {
        let totalprice = 0;
        cart.map(product => {
            totalprice += product.price;
        })
        return totalprice;
    }
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
                                        <img src={`./${item.images[0]}`} alt={item.name} width="100" height="100" />
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
                            <h5 className="card-title">Total Price: ${calculateTotalPrice()}</h5>
                            <a href="/checkout" className="btn btn-primary">Proceed to Checkout</a>
                        </div>

                    </div>
                </div>

            </div>
        </div >

    );
}


export default Cart