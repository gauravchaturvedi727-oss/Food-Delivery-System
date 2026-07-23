import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./Checkout.css";

function Checkout() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCart();
    }, []);

    async function fetchCart() {

        try {

            const response = await api.get("/cart");

            setCart(response.data.cart.items || []);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load cart");

        }

    }

    const total = cart.reduce((sum, item) => {

        return sum + (item.food.price * item.quantity);

    }, 0);

    async function placeOrder() {

        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        if (!deliveryAddress.trim()) {
            toast.error("Please enter delivery address");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post("/orders/place", {

                deliveryAddress,
                paymentMethod

            });

            if (response.data.success) {

                toast.success("Order Placed Successfully 🎉");

                navigate("/order-success");

            }

        } catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Failed to place order"

            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="checkout">

            <h1>Checkout</h1>

            <div className="checkout-container">

                <div className="address-box">

                    <h2>Delivery Address</h2>

                    <textarea

                        placeholder="Enter your complete address..."

                        value={deliveryAddress}

                        onChange={(e) =>
                            setDeliveryAddress(e.target.value)
                        }

                    />

                    <h2 style={{ marginTop: "20px" }}>
                        Payment Method
                    </h2>

                    <select

                        value={paymentMethod}

                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }

                    >

                        <option value="Cash on Delivery">
                            Cash on Delivery
                        </option>

                        <option value="UPI">
                            UPI
                        </option>

                        <option value="Card">
                            Card
                        </option>

                    </select>

                </div>

                <div className="summary">

                    <h2>Order Summary</h2>

                    {

                        cart.map((item) => (

                            <div
                                key={item.food._id}
                                className="summary-item"
                            >

                                <span>

                                    {item.food.name} × {item.quantity}

                                </span>

                                <span>

                                    ₹{item.food.price * item.quantity}

                                </span>

                            </div>

                        ))

                    }

                    <hr />

                    <h2>Total : ₹{total}</h2>

                    <button

                        onClick={placeOrder}

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Placing Order..."

                                : "Place Order"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Checkout;