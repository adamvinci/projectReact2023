
import { Context as cartContext } from "../Context/CartContext";
import { useContext } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    const image = product.images[0];
    const changeImage = (image) => {
        const container = document.getElementById('main-image');
        container.src = image.src;
    };
    const { addToCart } = useContext(cartContext);
    const cartHandler = () => {

        addToCart(product);

        MySwal.fire({
            title: 'Product added to the cart',
            icon: 'success',
            position: 'top-end',
            showCancelButton: true,
            confirmButtonText: 'Go to Cart',
            cancelButtonText: 'Continue Shopping',
            timer: 5000
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/cart');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                navigate('/');
            }
        });
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="images p-3">
                                    <div className="text-center p-4">
                                        <img id="main-image" src={`../src/img/${image}`} width="250" alt="Main" />
                                    </div>
                                    <div className="thumbnail text-center">
                                        {product.images.map((img, index) => (
                                            <img key={index} onClick={(e) =>
                                                changeImage(e.target)} src={`../src/img/${img}`} width="70" alt="Thumbnail 1" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="product p-4">
                                    <div className="mt-4 mb-3">
                                        <span className="text-uppercase text-muted brand">VinciShop</span>
                                        <h5 className="text-uppercase">{product.name}</h5>
                                        <div className="price d-flex flex-row align-items-center">
                                            <span className="act-price">${product.price}   &nbsp;  </span>
                                            {product.oldPrice ? (
                                                <div className="ml-2">
                                                    <span className="dis-price">${product.oldPrice}&nbsp;</span>
                                                    <span className="text-danger ml-5">{((product.oldPrice - product.price) / product.oldPrice) * 100}% OFF</span>
                                                </div>
                                            ) : ''}

                                        </div>
                                    </div>
                                    <p className="about">{product.description}</p>

                                    <div className="cart mt-4 align-items-center">
                                        <button onClick={cartHandler} className="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button>
                                        <i className="fa fa-heart text-muted"></i>
                                        <i className="fa fa-share-alt text-muted"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product