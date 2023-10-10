import React, { useEffect, useState } from "react";

const Context = React.createContext(null)

const ProviderWrapper = ({ children }) => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];

    const [cart, setCart] = useState(cartFromLocalStorage);
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    const addToCart = (product) => {
        setCart(cart.concat(product));
    }


    const exposedValue = {
        cart,
        addToCart

    };

    return <Context.Provider value={exposedValue}>{children}</Context.Provider>
}

export {
    Context,
    ProviderWrapper,
} 