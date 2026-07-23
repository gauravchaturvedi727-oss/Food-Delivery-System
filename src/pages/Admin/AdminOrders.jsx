import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import api from "../../services/api";
import "./AdminOrders.css";

function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchOrders() {

        try {

            const response = await api.get("/orders");

            setOrders(response.data.orders);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchOrders();

    }, []);

    async function changeStatus(orderId, orderStatus) {

        try {

            await api.patch(
                `/orders/${orderId}/status`,
                {
                    orderStatus
                }
            );

            setOrders(prev =>
                prev.map(order =>
                    order._id === orderId
                        ? { ...order, orderStatus }
                        : order
                )
            );

            alert("Status Updated");

        } catch (error) {

            console.log(error);

            alert("Unable to update status");

        }

    }

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="admin-content">

                <h1>Order Management</h1>

                <table className="food-table">

                    <thead>

                        <tr>

                            <th>Customer</th>

                            <th>Total</th>

                            <th>Payment</th>

                            <th>Status</th>

                            <th>Change Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            orders.map(order => (

                                <tr key={order._id}>

                                    <td>

                                        {order.user.name}

                                    </td>

                                    <td>

                                        ₹{order.totalPrice}

                                    </td>

                                    <td>

                                        {order.paymentMethod}

                                    </td>

                                    <td>

                                        {order.orderStatus}

                                    </td>

                                    <td>

                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) =>
                                                changeStatus(
                                                    order._id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option>
                                                Pending
                                            </option>

                                            <option>
                                                Preparing
                                            </option>

                                            <option>
                                                Out for Delivery
                                            </option>

                                            <option>
                                                Delivered
                                            </option>

                                            <option>
                                                Cancelled
                                            </option>

                                        </select>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminOrders;