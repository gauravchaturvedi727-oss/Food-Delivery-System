import "./FoodCard.css";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import api from "../../services/api";

function FoodCard({ food }) {

    async function addToCart() {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first");
                return;
            }

            const response = await api.post(
                "/cart/add",
                {
                    foodId: food._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Something went wrong");

        }

    }

    return (

        <div className="food-card">

            <div className="food-image">

                <img
                    src={`http://localhost:3000/upload/${food.image}`}
                    alt={food.name}
                />

            </div>

            <div className="food-info">

                <div className="rating">

                    <FaStar />

                    <span>4.8</span>

                </div>

                <h3>{food.name}</h3>

                <p>{food.description}</p>

                <div className="bottom">

                    <h2>₹{food.price}</h2>

                    <button onClick={addToCart}>

                        <FaShoppingCart />

                        Add

                    </button>

                </div>

            </div>

        </div>

    );
}

export default FoodCard;