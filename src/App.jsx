import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Auth from "./pages/Auth/Auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Profile from "./pages/Profile/Profile";

import AdminFood from "./pages/Admin/AdminFood";
import AddFood from "./pages/Admin/AddFood";
import EditFood from "./pages/Admin/EditFood";

import NotFound from "./pages/NotFound/NotFound";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";


import AdminOrders from "./pages/Admin/AdminOrders";
import AdminUsers from "./pages/AdminUsers/AdminUsers";
import OrderDetails from "./pages/OrderDetails/OrderDetails";

import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Checkout from "./pages/Checkout/Checkout";
function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />

                {/* User Protected Routes */}
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                {/* Admin Routes */}
                <Route
                    path="/admin/foods"
                    element={
                        <AdminRoute>
                            <AdminFood />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/foods/add"
                    element={
                        <AdminRoute>
                            <AddFood />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/foods/edit/:id"
                    element={
                        <AdminRoute>
                            <EditFood />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/orders"
                    element={
                        <AdminRoute>
                            <AdminOrders />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <AdminRoute>
                            <AdminUsers />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/orders/:orderId"
                    element={
                        <ProtectedRoute>
                            <OrderDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/order-success"
                    element={
                        <ProtectedRoute>
                            <OrderSuccess/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />

                {/* <Route path="/auth" element={<Auth />} /> */}

                {/* 404 */}
                <Route path="*" element={<NotFound />} />

            </Routes>

            <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="colored"
            />
        </BrowserRouter>
    );
}

export default App;