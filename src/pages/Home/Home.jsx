import Navbar from "../../components/NavBar/Navbar";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import  {useEffect, useState} from "react"; 
import api from "../../services/api";
import FoodCard from "../../components/FoodCart/FoodCard";
import "./Home.css";

function Home() {

    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchFood() {
    try {

        const response = await api.get("/foods");

        console.log("Response:", response.data);
        console.log("Foods:", response.data.foods);

        setFoods(response.data.foods || []);

    } catch (error) {

        console.log(error);

        setFoods([]);

    } finally {

        setLoading(false);

    }
}

    useEffect(() => {
        fetchFood();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <Navbar />
            <Hero />
            <Categories />

            <div id="menu" className="food-container">
                {foods.map((food) => (
                    <FoodCard
                        key={food._id}
                        food={food}
                    />
                ))}
            </div>
        </>
    );
}

export default Home;