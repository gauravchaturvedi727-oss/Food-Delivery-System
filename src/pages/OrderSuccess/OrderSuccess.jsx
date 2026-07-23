import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {

    return (

        <div className="success-page">

            <div className="success-card">

                <div className="success-icon">
                    ✔
                </div>

                <h1>Order Placed Successfully!</h1>

                <p>
                    Thank you for your order.
                </p>

                <p>
                    Your food is being prepared and will reach you soon.
                </p>

                <Link
                    to="/orders"
                    className="orders-btn"
                >
                    View My Orders
                </Link>

                <Link
                    to="/"
                    className="home-btn"
                >
                    Continue Shopping
                </Link>

            </div>

        </div>

    );

}

export default OrderSuccess;