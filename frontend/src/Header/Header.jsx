
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { Link } from "react-router-dom"

const Header = () => {

    return (
        <div >
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Nav className="ms-auto">

                        <Navbar.Brand as={Link} to="/">VinciShop</Navbar.Brand>

                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Products</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Cart<ShoppingCartOutlined /></Nav.Link>
                        <Nav.Link as={Link} to="/subscriptions">Subscription</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
        </div >
    )
}

export default Header