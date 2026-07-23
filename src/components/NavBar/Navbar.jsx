import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    function scrollToMenu() {

        const menu = document.getElementById("menu");

        if (menu) {

            menu.scrollIntoView({
                behavior: "smooth"
            });

        }

    }

    return (

        <nav className="navbar">

            <div className="logo">

                <Link to="/">
                    🍔 TEN FOODIES
                </Link>

            </div>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <button
                    className="nav-btn"
                    onClick={scrollToMenu}
                >
                    Menu
                </button>

                {

                    token && (

                        <>
                            <Link to="/cart">Cart</Link>
                            <Link to="/orders">Orders</Link>
                        </>

                    )

                }

            </div>

            <div className="nav-right">

                {

                    token ? (

                        <button
                            className="cart-btn"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    ) : (

                        <>

                            <Link to="/login">

                                <button className="login-btn">
                                    Login
                                </button>

                            </Link>

                            <Link to="/register">

                                <button className="cart-btn">
                                    Register
                                </button>

                            </Link>

                        </>

                    )

                }

            </div>

        </nav>

    );

}

export default Navbar;