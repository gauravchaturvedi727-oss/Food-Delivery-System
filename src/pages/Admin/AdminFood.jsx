import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import FoodTable from "../../components/FoodTable/FoodTable";
import "./AdminFood.css";

function AdminFoods() {

    const navigate = useNavigate();

    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    async function fetchFoods() {
        try {
            const response = await api.get("/foods");
            setFoods(response.data.foods);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFoods();
    }, []);

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this food?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/foods/${id}`);

            setFoods((prevFoods) =>
                prevFoods.filter((food) => food._id !== id)
            );

            alert("Food deleted successfully");

        } catch (error) {
            console.log(error);
            alert("Delete failed");
        }
    }

    function handleEdit(food) {
        navigate(`/admin/foods/edit/${food._id}`);
    }

    const filteredFoods = foods.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-container">

            <AdminSidebar />

            <div className="admin-content">

                <div className="foods-header">

                    <h1>Food Management</h1>

                    <Link
                        to="/admin/foods/add"
                        className="add-food-btn"
                    >
                        <FaPlus />
                        Add Food
                    </Link>

                </div>

                <input
                    type="text"
                    className="search-box"
                    placeholder="Search Food..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {
                    loading ? (
                        <h2>Loading...</h2>
                    ) : (
                        <FoodTable
                            foods={filteredFoods}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )
                }

            </div>

        </div>
    );
}

export default AdminFoods;