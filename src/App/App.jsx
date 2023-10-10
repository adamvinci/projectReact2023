import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch
} from "react-router-dom"
import Footer from '../Footer/Footer'
import Product from '../Product/Product'
import Cart from '../Cart/Cart'
import Header from '../Header/Header'
import ProductList from "../ProductList/ProductList"



const App = () => {

  const products = [
    {
      id: 1,
      name: 't-shirt',
      description: "Elevate your casual style with our comfortable and stylish T-Shirt. Crafted with soft, high-quality fabric, it's perfect for everyday wear and comes in various sizes and colors to suit your preferences.",
      price: 4.00,
      oldPrice: 50,
      "images": [
        "tshirt1.png",
        "tshirt2.png"
      ],
    },
    {
      id: 2,
      name: 'mug',
      description: "  Elevate your daily coffee or tea experience with our premium Ceramic Mug. Designed for comfort and style, this 12 oz mug boasts an ergonomic handle and a sleek, minimalist design. It's microwave and dishwasher safe, making it the perfect choice for your home or office.",
      price: 4.00,
      "images": [
        "mug1.png",
        "mug2.png"
      ],
    },
    {
      id: 3,
      name: 'pillow',
      description: "Experience ultimate comfort and relaxation with our plush Pillow. Made with premium materials, it offers excellent support for a good night's sleep or cozy lounging on the couch.",
      price: 4.00,
      oldPrice: 50,
      "images": [
        "coussin1.png",
        "coussin2.png"
      ],
    },
    {
      id: 4,
      name: 'phone case',
      description: "Keep your smartphone safe and stylish with our Phone Case. Made with precision, it offers full protection while adding a touch of personality to your device. Available in a variety of designs and sizes to match your phone model.",
      price: 4.00,
      "images": [
        "phone1.png",
        "phone2.png"
      ],
    },
    {
      id: 5,
      name: 'hoodie',
      description: "Elevate your comfort and style with our premium Hoodie. Crafted with soft, high-quality fabric, this hoodie is the perfect choice for staying cozy and fashionable. It's available in various sizes and colors to suit your preferences, making it a versatile addition to your wardrobe.",
      price: 4.00,
      oldPrice: 400,
      "images": [
        "hoodie1.png",
        "hoodie2.png"
      ],
    },
    {
      id: 6,
      name: 'laptopcase',
      description: "Protect your valuable tech gear in style with our sleek Computer Case. Designed to fit most laptops securely, it features a modern look and durable construction to keep your device safe.",
      price: 4.00,
      "images": [
        "laptopcase1.png",
        "laptopcase2.png"
      ],
    }
  ];


  const padding = {
    paddingRight: 5
  }
  const match = useMatch('/products/:id')
  const product = match
    ? products.find(note => note.id === Number(match.params.id))
    : null
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/products/:id" element={<Product product={product} />} />
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </div>
      <Footer />

    </div>
  )
}

export default App
