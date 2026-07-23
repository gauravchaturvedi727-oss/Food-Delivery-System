import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import {
    FaUsers,
    FaUtensils,
    FaShoppingBag,
    FaRupeeSign
} from "react-icons/fa";
import api from "../../services/api";

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalFoods: 0,
        totalOrders: 0,
        totalRevenue: 0,
        recentOrders: []
    });

    const [loading, setLoading] = useState(true);

    async function fetchDashboard() {

        try {

            const response = await api.get("/admin/dashboard");

            if (response.data.success) {
                setStats(response.data.stats);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchDashboard();

    }, []);

    const dashboardCards = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: <FaUsers />
        },
        {
            title: "Foods",
            value: stats.totalFoods,
            icon: <FaUtensils />
        },
        {
            title: "Orders",
            value: stats.totalOrders,
            icon: <FaShoppingBag />
        },
        {
            title: "Revenue",
            value: `₹${stats.totalRevenue}`,
            icon: <FaRupeeSign />
        }
    ];

    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="admin-content">

                <div className="admin-header">

                    <h1>Dashboard</h1>

                    <div className="admin-profile">
                        👨‍💼 Admin
                    </div>

                </div>

                {

                    loading ? (

                        <h2>Loading Dashboard...</h2>

                    ) : (

                        <>
                            <div className="dashboard-cards">

                                {

                                    dashboardCards.map((item, index) => (

                                        <div
                                            className="dashboard-card"
                                            key={index}
                                        >

                                            <div className="card-icon">

                                                {item.icon}

                                            </div>

                                            <h3>{item.title}</h3>

                                            <h2>{item.value}</h2>

                                        </div>

                                    ))

                                }

                            </div>

                            <div className="recent-orders">

                                <h2>Recent Orders</h2>

                                <table className="food-table">

                                    <thead>

                                        <tr>

                                            <th>Customer</th>

                                            <th>Total</th>

                                            <th>Status</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            stats.recentOrders &&
                                            stats.recentOrders.length > 0 ? (

                                                stats.recentOrders.map(order => (

                                                    <tr key={order._id}>

                                                        <td>
                                                            {order.user?.name || "Unknown"}
                                                        </td>

                                                        <td>
                                                            ₹{order.totalPrice}
                                                        </td>

                                                        <td>
                                                            {order.orderStatus}
                                                        </td>

                                                    </tr>

                                                ))

                                            ) : (

                                                <tr>

                                                    <td colSpan="3">

                                                        No Recent Orders

                                                    </td>

                                                </tr>

                                            )

                                        }

                                    </tbody>

                                </table>

                            </div>

                        </>

                    )

                }

            </div>

        </div>

    );

}

export default AdminDashboard;