import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import "./OrderDetails.css";

function OrderDetails() {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const orderSteps = [
        "Pending",
        "Preparing",
        "Out for Delivery",
        "Delivered"
    ];

    async function fetchOrder() {

        try {

            const response = await api.get(`/orders/${orderId}`);

            if (response.data.success) {
                setOrder(response.data.order);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchOrder();

    }, []);

    if (loading) {
        return <h2 className="loading">Loading...</h2>;
    }

    if (!order) {
        return <h2 className="loading">Order not found</h2>;
    }

    return (

        <div className="order-details-page">

            <div className="order-details-card">

                <div className="order-header">

                    <h1>Order Details</h1>

                    <Link to="/orders" className="back-btn">
                        ← Back
                    </Link>

                </div>

                <div className="customer-section">

                    <h3>Customer Details</h3>

                    <p><strong>Name :</strong> {order.user.name}</p>

                    <p><strong>Email :</strong> {order.user.email}</p>

                    <p><strong>Address :</strong> {order.deliveryAddress}</p>

                    <p><strong>Payment :</strong> {order.paymentMethod}</p>

                    <p><strong>Total :</strong> ₹{order.totalPrice}</p>

                    <p>
                        <strong>Date :</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                </div>

                <div className="items-section">

                    <h3>Ordered Items</h3>

                    {

                        order.items.map((item) => (

                            <div
                                className="item-card"
                                key={item._id}
                            >

                                <img
                                    src={`http://localhost:3000/upload/${item.food.image}`}
                                    alt={item.food.name}
                                />

                                <div>

                                    <h4>{item.food.name}</h4>

                                    <p>₹{item.price}</p>

                                    <p>Quantity : {item.quantity}</p>

                                </div>

                            </div>

                        ))

                    }

                </div>

                <div className="timeline">

                    <h3>Order Progress</h3>

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

            </div>

        </div>

    );

}

export default OrderDetails;