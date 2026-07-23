import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import api from "../../services/api";
import "./EditFood.css";
import { toast } from "react-toastify";

function EditFood() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const [food, setFood] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        available: true
    });

    async function fetchFood() {
        try {
            const response = await api.get(`/foods/${id}`);

            setFood({
                name: response.data.food.name,
                description: response.data.food.description,
                price: response.data.food.price,
                category: response.data.food.category,
                available: response.data.food.available
            });

        } catch (error) {
            console.log(error);
            alert("Unable to fetch food details");
        }
    }

    useEffect(() => {
        fetchFood();
    }, []);

    function handleChange(e) {

        const { name, value, type, checked } = e.target;

        setFood({
            ...food,
            [name]: type === "checkbox" ? checked : value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        const formData = new FormData();

        formData.append("name", food.name);
        formData.append("description", food.description);
        formData.append("price", food.price);
        formData.append("category", food.category);
        formData.append("available", food.available);

        if (image) {
            formData.append("image", image);
        }

        try {

            await api.patch(`/foods/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success("Food Updated Successfully");
            navigate("/admin/foods");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Update Failed"
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="admin-content">

                <div className="add-food-container">

                    <h2>Edit Food</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="name"
                            value={food.name}
                            onChange={handleChange}
                            placeholder="Food Name"
                            required
                        />

                        <input
                            type="number"
                            name="price"
                            value={food.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                        />

                        <input
                            type="text"
                            name="category"
                            value={food.category}
                            onChange={handleChange}
                            placeholder="Category"
                            required
                        />

                        <textarea
                            name="description"
                            value={food.description}
                            onChange={handleChange}
                            placeholder="Description"
                            rows="5"
                            required
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                        <label className="checkbox">
                            <input
                                type="checkbox"
                                name="available"
                                checked={food.available}
                                onChange={handleChange}
                            />
                            Available
                        </label>

                        <button type="submit">
                            {loading ? "Updating..." : "Update Food"}
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditFood;