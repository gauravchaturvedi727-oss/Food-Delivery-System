import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import api from "../../services/api";
import "./AddFood.css";
import { toast } from "react-toastify";

function AddFood() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        available: true,
    });

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    function handleChange(e) {

        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        const data = new FormData();

        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("description", formData.description);
        data.append("available", formData.available);
        data.append("image", image);

        try {

            await api.post("/foods/add", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Food Added Successfully");

            navigate("/admin/foods");

        } catch (error) {

            console.log(error);

            alert("Failed to Add Food");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="admin-content">

                <div className="add-food-container">

                    <h1>Add New Food</h1>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="name"
                            placeholder="Food Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />


                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >

                            <option value="">Select Category</option>
                            <option>Pizza</option>
                            <option>Burger</option>
                            <option>Chinese</option>
                            <option>South Indian</option>
                            <option>Dessert</option>
                            <option>Drinks</option>

                        </select>

                        <textarea
                            name="description"
                            placeholder="Description"
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <label className="checkbox">

                            <input
                                type="checkbox"
                                name="available"
                                checked={formData.available}
                                onChange={handleChange}
                            />

                            Available

                        </label>

                        <button type="submit">

                            {loading ? "Adding..." : "Add Food"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddFood;