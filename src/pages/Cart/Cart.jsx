import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./Cart.css";

function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchCart();
    }, []);

    async function fetchCart() {

        try {

            setLoading(true);

            const response = await api.get("/cart");

            setCart(response.data.cart.items || []);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load cart."
            );

        } finally {

            setLoading(false);

        }

    }

    async function updateQuantity(foodId, quantity) {

        if (quantity < 1) return;

        try {

            setUpdating(true);

            await api.patch(`/cart/update/${foodId}`, {
                quantity,
            });

            fetchCart();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update quantity."
            );

        } finally {

            setUpdating(false);

        }

    }

    async function removeItem(foodId) {

        const confirmDelete = window.confirm(
            "Remove this item from cart?"
        );

        if (!confirmDelete) return;

        try {

            setUpdating(true);

            await api.delete(`/cart/remove/${foodId}`);

            toast.success("Item Removed");

            fetchCart();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to remove item."
            );

        } finally {

            setUpdating(false);

        }

    }

    async function clearCart() {

        const confirmClear = window.confirm(
            "Are you sure you want to clear the cart?"
        );

        if (!confirmClear) return;

        try {

            setUpdating(true);

            await api.delete("/cart/clear");

            setCart([]);

            toast.success("Cart Cleared");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to clear cart."
            );

        } finally {

            setUpdating(false);

        }

    }

    const total = cart.reduce((sum, item) => {

        return sum + (item.food.price * item.quantity);

    }, 0);

    if (loading) {

        return (
            <div className="cart-loading">
                <h2>Loading Cart...</h2>
            </div>
        );

    }

    return (

        <div className="cart">

            <h1>My Cart</h1>

            {

                cart.length === 0 ?

                    <div className="empty-cart">

                        <h2>🛒 Your Cart is Empty</h2>

                        <p>Add some delicious food first.</p>

                    </div>

                    :

                    <>

                        {

                            cart.map((item) => (

                                <div
                                    className="cart-item"
                                    key={item.food._id}
                                >

                                    <img
                                        src={`http://localhost:3000/upload/${item.food.image}`}
                                        alt={item.food.name}
                                    />

                                    <div className="cart-info">

                                        <h3>{item.food.name}</h3>

                                        <p>
                                            Price : ₹{item.food.price}
                                        </p>

                                        <p>
                                            Subtotal :
                                            ₹{item.food.price * item.quantity}
                                        </p>

                                    </div>

                                    <div className="quantity">

                                        <button
                                            disabled={
                                                item.quantity === 1 ||
                                                updating
                                            }
                                            onClick={() =>
                                                updateQuantity(
                                                    item.food._id,
                                                    item.quantity - 1
                                                )
                                            }
                                        >
                                            -
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            disabled={updating}
                                            onClick={() =>
                                                updateQuantity(
                                                    item.food._id,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                    <button
                                        className="remove-btn"
                                        disabled={updating}
                                        onClick={() =>
                                            removeItem(item.food._id)
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            ))

                        }

                        <div className="cart-footer">

                            <h2>
                                Total : ₹{total}
                            </h2>

                            <div className="cart-buttons">

                                <button
                                    className="clear-btn"
                                    disabled={updating}
                                    onClick={clearCart}
                                >
                                    Clear Cart
                                </button>

                                <button
                                    className="checkout-btn"
                                    onClick={() => navigate("/checkout")}
                                >
                                    Proceed to Checkout
                                </button>

                            </div>

                        </div>

                    </>

            }

        </div>

    );

}

export default Cart;