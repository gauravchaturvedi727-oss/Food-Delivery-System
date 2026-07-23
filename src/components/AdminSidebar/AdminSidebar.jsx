import "./AdminSidebar.css";
import {
    FaTachometerAlt,
    FaUtensils,
    FaShoppingBag,
    FaUsers,
    FaSignOutAlt
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {

    const navigate = useNavigate();

    function handleLogout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });

    }

    return (
        <div className="admin-sidebar">

            <div className="sidebar-logo">
                <h2>🍔 Foodie</h2>
                <span>Admin Panel</span>
            </div>

            <nav className="sidebar-menu">

                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        isActive ? "menu-item active" : "menu-item"
                    }
                >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/admin/foods"
                    className={({ isActive }) =>
                        isActive ? "menu-item active" : "menu-item"
                    }
                >
                    <FaUtensils />
                    <span>Foods</span>
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        isActive ? "menu-item active" : "menu-item"
                    }
                >
                    <FaShoppingBag />
                    <span>Orders</span>
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        isActive ? "menu-item active" : "menu-item"
                    }
                >
                    <FaUsers />
                    <span>Users</span>
                </NavLink>

            </nav>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                <FaSignOutAlt />
                Logout
            </button>

        </div>
    );
}

export default AdminSidebar;