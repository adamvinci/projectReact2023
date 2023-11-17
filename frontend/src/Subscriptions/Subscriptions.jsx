import { useEffect, useState } from "react";
import axios from "axios";
import './Subscription.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from '../Payment/Stripe/CheckoutForm.jsx';

const initStripe = async () => {
    const res = await axios.get("/api/publishable-key");
    const publishableKey = await res.data.publishable_key;

    return loadStripe(publishableKey);
};


const Subscription = () => {
    const stripePromise = initStripe();
    const [subscriptionData, setSubscriptionData] = useState({
        clientSecret: "",
        loading: true,
    });
    const [subscriptionList, setSubscriptionList] = useState({
        products: []
    });

    useEffect(() => {
        async function retrieveSubscriptioList() {
            const response = await axios.get("/api/config");

            setSubscriptionList({
                products: response.data.products,
            });
        }
        retrieveSubscriptioList();
    }, []);

    /** Create the customer and get a client_id */
    const createCustomer = async () => {
        const MySwal = withReactContent(Swal)
        const { value: email } = await MySwal.fire({
            title: "Input email address",
            input: "email",
            inputLabel: "Your email address",
            inputPlaceholder: "Enter your email address"
        });

        const response = await axios.post('/api/create-customer', { email })

        return response.data.customer.id;
    }

    /** Use the client_id and the priceId of the subscription product to create a subscription and call CheckoutForm to finalise the payement*/
    const createSubscription = async (priceId) => {
        const customerId = await createCustomer();

        const response = await axios.post('/api/create-subscription', { priceId, customerId })
        setSubscriptionData({ clientSecret: response.data.clientSecret, loading: false, });
    }

    const checkoutHandler = (subscriptions) => {
        createSubscription(subscriptions.priceId)
    }
    return (

        <div>
            {subscriptionData.loading ? (
                <div className="container mb-5 mt-5">
                    {subscriptionList.products.map((content) => (
                        <div key={content.id}>
                            <div className="pricing card-deck flex-column flex-md-row mb-3">
                                <div className="card card-pricing text-center px-3 mb-4">
                                    <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">{content.name}</span>
                                    <div className="bg-transparent card-header pt-4 border-0">
                                        <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="15"><span className="price">{content.price}</span>€
                                            <span className="h6 text-muted ml-2">/ per month</span>
                                        </h1>
                                    </div>
                                    <div className="card-body pt-0">
                                        <ul className="list-unstyled mb-4">
                                            <li>{content.description}</li>
                                            <li>Monthly updates</li>
                                            <li>Free cancelation</li>
                                        </ul>
                                        <button onClick={() => checkoutHandler(content)} type="button" className="btn btn-outline-secondary mb-3 hvr" >Order now</button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    ))}


                </div>
            ) : (
                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: subscriptionData.clientSecret,
                        appearance: { theme: "stripe" },
                    }}
                >
                    <CheckoutForm />
                </Elements>
            )}
        </div>


    )
}
export default Subscription;