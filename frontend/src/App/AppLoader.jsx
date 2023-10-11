import { ProviderWrapper as CountProviderWrapper } from "../Context/CartContext";
import {
    BrowserRouter as Router,

} from "react-router-dom"
import App from "./App.jsx";

const AppLoader = () => {
    return (
        <CountProviderWrapper >
            <Router> <App /></Router>

        </CountProviderWrapper >
    )
}
export default AppLoader