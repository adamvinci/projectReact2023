import { Link } from "react-router-dom"
const ProductList = ({ products }) => {
    return (
        <div className="container">
            <div className="card">
                <h4>Products </h4>
                <h4>designed by VINCISHOP </h4>
                <hr />
                <ul className="bags">
                    {products.map(content => (
                        <li key={content.id}>
                            <div className="bag_box">
                                <div className="box1">
                                    <Link to={`/products/${content.id}`}><img src={`./src/img/${content.images[0]}`} /></Link>
                                </div>
                                <span>{content.name}</span>


                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}
export default ProductList