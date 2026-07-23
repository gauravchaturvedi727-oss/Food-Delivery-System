import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaKey
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Auth.css";

function Auth() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
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

    if (isLogin) {
      loginUser();
    } else {
      signupUser();
    }
  }

  async function loginUser() {

    if (!formData.email || !formData.password) {
      return alert("Please fill all fields");
    }

    try {

      setLoading(true);

      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  }

  async function signupUser() {

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
    return alert("Please enter delivery address");
}

    if (
      formData.role === "admin" &&
      !formData.adminSecretKey
    ) {
      return alert("Enter Admin Secret Key");
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

      setIsLogin(true);

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        deliveryAddress: "",
        password: "",
        confirmPassword: "",
        role: "customer",
        adminSecretKey: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );

    } finally {

      setLoading(false);

    }

  }

  return(
    <div className="auth-page">

    <div className="auth-card">

        <h1 className="logo">🍔 FOODIE</h1>

        <p className="subtitle">
            Delicious Food Delivered Fast
        </p>

        <div className="auth-tabs">

            <button
                className={isLogin ? "auth-tab active" : "auth-tab"}
                onClick={() => setIsLogin(true)}
            >
                Login
            </button>

            <button
                className={!isLogin ? "auth-tab active" : "auth-tab"}
                onClick={() => setIsLogin(false)}
            >
                Register
            </button>

        </div>

        <form onSubmit={handleSubmit}>

            {!isLogin && (

                <div className="role-glass">

                    <h3 className="role-title">
                        Select Account Type
                    </h3>

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
                                checked={formData.role === "customer"}
                                onChange={handleChange}
                            />

                            <span>👤</span>

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
                                checked={formData.role === "admin"}
                                onChange={handleChange}
                            />

                            <span>🛠️</span>

                            <h4>Admin</h4>

                            <p>Manage Foods</p>

                        </label>

                    </div>

                </div>

            )}

            {!isLogin && (

                <>
                    {/* Name */}
                    <div className="input-box">
                        <FaUser />
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Phone */}
                    <div className="input-box">
                        <FaPhone />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Customer Only */}
                    {formData.role === "customer" && (

                        <div className="input-box">

                            <FaMapMarkerAlt />

                            <input
                                type="text"
                                placeholder="Delivery Address"
                                name="deliveryAddress"
                                value={formData.deliveryAddress}
                                onChange={handleChange}
                            />

                        </div>

                    )}

                </>

            )}
            <div className="input-box">

                <FaEnvelope />

                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

            </div>
                        <div className="input-box">

                <FaLock />

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                {showPassword ? (

                    <FaEyeSlash
                        className="password-toggle"
                        onClick={() => setShowPassword(false)}
                    />

                ) : (

                    <FaEye
                        className="password-toggle"
                        onClick={() => setShowPassword(true)}
                    />

                )}

            </div>

            {!isLogin && (

                <div className="input-box">

                    <FaLock />

                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    {showConfirmPassword ? (

                        <FaEyeSlash
                            className="password-toggle"
                            onClick={() =>
                                setShowConfirmPassword(false)
                            }
                        />

                    ) : (

                        <FaEye
                            className="password-toggle"
                            onClick={() =>
                                setShowConfirmPassword(true)
                            }
                        />

                    )}

                </div>

            )}

            {!isLogin && formData.role === "admin" && (

                <div className="input-box admin-secret">

                    <FaKey />

                    <input
                        type="password"
                        placeholder="Admin Secret Key"
                        name="adminSecretKey"
                        value={formData.adminSecretKey}
                        onChange={handleChange}
                    />

                </div>

            )}

            <button
                type="submit"
                className="auth-btn"
                disabled={loading}
            >

                {loading
                    ? "Please Wait..."
                    : isLogin
                    ? "Login"
                    : "Register"}

            </button>

        </form>

        <p className="switch-text">

            {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

            <span
                onClick={() => setIsLogin(!isLogin)}
            >

                {isLogin ? " Register" : " Login"}

            </span>

        </p>

    </div>

</div>

);

}

export default Auth;
