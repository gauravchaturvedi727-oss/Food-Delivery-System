import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaPhone,
    FaMapMarkerAlt,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";


import api from "../../services/api";
import "./Signup.css";

function Signup() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        phoneNumber: "",

        deliveryAddress: "",

        password: "",

        confirmPassword: "",

        role: "customer",

        adminSecretKey: ""

    });

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (
    !formData.name ||
    !formData.email ||
    !formData.phoneNumber ||
    !formData.password ||
    !formData.confirmPassword
) {
    return alert("Please fill all fields");
}

if (
    formData.role === "customer" &&
    !formData.deliveryAddress
) {
    return alert("Please enter Delivery Address");
}

if (
    formData.role === "admin" &&
    !formData.adminSecretKey
) {
    return alert("Please enter Admin Secret Key");
}

        if (formData.password !== formData.confirmPassword) {

            return alert("Passwords do not match");

        }

        try {

            setLoading(true);

            const response = await api.post("/auth/signup", {

                name: formData.name,

                email: formData.email,

                phoneNumber: formData.phoneNumber,

                deliveryAddress: formData.deliveryAddress,

                password: formData.password,

                role: formData.role,

                adminSecretKey: formData.adminSecretKey

            });

            alert(response.data.message);

            navigate("/login");

        }

        catch (error) {

            toast.error(error.response?.data?.message);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="register-page">

            <div className="register-card">

                <h1>🍔 Foodie</h1>

                <p>Create your account</p>

                <form onSubmit={handleSubmit}>
                                        {/* Register Role */}

                    <div className="role-glass">

                        <h3>Register As</h3>

                        <div className="role-options">

                            <label
                                className={
                                    formData.role === "customer"
                                        ? "role-card active"
                                        : "role-card"
                                }
                            >

                                <input
                                    type="radio"
                                    name="role"
                                    value="customer"
                                    checked={
                                        formData.role === "customer"
                                    }
                                    onChange={handleChange}
                                />

                                <span>🍽️</span>

                                <h4>Customer</h4>

                                <p>Order delicious food</p>

                            </label>

                            <label
                                className={
                                    formData.role === "admin"
                                        ? "role-card active"
                                        : "role-card"
                                }
                            >

                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={
                                        formData.role === "admin"
                                    }
                                    onChange={handleChange}
                                />

                                <span>👨‍🍳</span>

                                <h4>Admin</h4>

                                <p>Manage Foods & Orders</p>

                            </label>

                        </div>

                    </div>


                    {/* Full Name */}

                    <div className="input-box">

                        <FaUser />

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Email */}

                    <div className="input-box">

                        <FaEnvelope />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Phone */}

                    <div className="input-box">

                        <FaPhone />

                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Address */}

                    {formData.role === "customer" && (
                        <div className="input-box">
                            <FaMapMarkerAlt />
                            <input
                                type="text"
                                name="deliveryAddress"
                                placeholder="Delivery Address"
                                value={formData.deliveryAddress}
                                onChange={handleChange}
                            />
                        </div>
                    )}


                    {/* Secret Key */}

                    {

                        formData.role === "admin" && (

                            <div className="input-box admin-secret">

                                <FaLock />

                                <input
                                    type="password"
                                    name="adminSecretKey"
                                    placeholder="Admin Secret Key"
                                    value={formData.adminSecretKey}
                                    onChange={handleChange}
                                />

                            </div>

                        )

                    }

                                        {/* Password */}

                    <div className="input-box">

                        <FaLock />

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <span
                            className="password-toggle"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {
                                showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </span>

                    </div>


                    {/* Confirm Password */}

                    <div className="input-box">

                        <FaLock />

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                        <span
                            className="password-toggle"
                            onClick={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                        >
                            {
                                showConfirmPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </span>

                    </div>


                    <button
                        className="register-btn"
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Creating Account..."
                                : `Create ${
                                      formData.role === "admin"
                                          ? "Admin"
                                          : "Customer"
                                  } Account`
                        }

                    </button>

                </form>


                <div className="bottom-text">

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Signup;