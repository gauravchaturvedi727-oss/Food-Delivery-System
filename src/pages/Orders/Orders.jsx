import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Orders.css";
import { toast } from "react-toastify";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const orderSteps = [
        "Pending",
        "Preparing",
        "Out for Delivery",
        "Delivered"
    ];

    async function fetchOrders() {

        try {

            const response = await api.get("/orders/my-orders");

            if (response.data.success) {
                setOrders(response.data.orders);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    async function cancelOrder(orderId) {

        try {

            const response = await api.patch(`/orders/cancel/${orderId}`);

            if (response.data.success) {

                toast.success("Order Cancelled Successfully");

                fetchOrders();

            }

        } catch (error) {

            console.log(error);

            toast.error(error.response?.data?.message || "Something went wrong");

        }

    }

    useEffect(() => {

        fetchOrders();

    }, []);

    return (

        <div className="orders-page">

            <h1>My Orders</h1>

            {

                loading ?

                    <h2>Loading...</h2>

                    :

                    orders.length === 0 ?

                        <h2>No Orders Found</h2>

                        :

                        <div className="orders-container">

                            {

                                orders.map((order) => (

                                    <div
                                        className="order-card"
                                        key={order._id}
                                    >

                                        <div className="order-top">

                                            <h3>

                                                Order #{order._id.slice(-6)}

                                            </h3>

                                            <span
                                                className={`status ${order.orderStatus
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")}`}
                                            >

                                                {order.orderStatus}

                                            </span>

                                        </div>

                                        <div className="order-body">

                                            <p>
                                                <strong>Total :</strong> ₹{order.totalPrice}
                                            </p>

                                            <p>
                                                <strong>Items :</strong> {order.items.length}
                                            </p>

                                            <p>
                                                <strong>Date :</strong>{" "}
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>

                                        </div>

                                        <div className="order-items">

                                            <h4>Ordered Items</h4>

                                            {

                                                order.items.map((item, index) => (

                                                    <div
                                                        className="order-item"
                                                        key={index}
                                                    >

                                                        <span>

                                                            {item.food?.name}

                                                        </span>

                                                        <span>

                                                            x{item.quantity}

                                                        </span>

                                                    </div>

                                                ))

                                            }

                                        </div>

                                        <div className="timeline">

                                            <h4>Order Progress</h4>

                                            {

                                                orderSteps.map((step, index) => (

                                                    <div
                                                        key={index}
                                                        className={`timeline-step ${
                                                            orderSteps.indexOf(order.orderStatus) >= index
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                    >

                                                        <div className="circle"></div>

                                                        <span>{step}</span>

                                                    </div>

                                                ))

                                            }

                                        </div>

                                        <div className="order-actions">

                                            <button
                                                className="details-btn"
                                                onClick={() => navigate(`/orders/${order._id}`)}
                                            >
                                                View Details
                                            </button>

                                            {

                                                order.orderStatus === "Pending" && (

                                                    <button
                                                        className="cancel-btn"
                                                        onClick={() => cancelOrder(order._id)}
                                                    >
                                                        Cancel Order
                                                    </button>

                                                )

                                            }

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

            }

        </div>

    );

}

export default Orders;