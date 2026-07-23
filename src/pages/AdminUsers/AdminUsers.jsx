import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import api from "../../services/api";
import "./AdminUsers.css";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    async function fetchUsers() {

        try {

            const response = await api.get("/admin/users");

            if (response.data.success) {
                setUsers(response.data.users);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchUsers();

    }, []);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    async function deleteUser(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            // Backend banne ke baad uncomment karna

            // await api.delete(`/admin/users/${id}`);

            setUsers(users.filter(user => user._id !== id));

            alert("User deleted successfully");

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="admin-content">

                <h1>Users</h1>

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {

                    loading ?

                        <h2>Loading...</h2>

                        :

                        <table className="food-table">

                            <thead>

                                <tr>

                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Joined</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredUsers.length > 0 ?

                                        filteredUsers.map(user => (

                                            <tr key={user._id}>

                                                <td>{user.name}</td>

                                                <td>{user.email}</td>

                                                <td>{user.phone || "-"}</td>

                                                <td>
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>

                                                <td>

                                                    <button
                                                        className="view-btn"
                                                        onClick={() => {

                                                            setSelectedUser(user);
                                                            setShowModal(true);

                                                        }}
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => deleteUser(user._id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                        :

                                        <tr>

                                            <td colSpan="5">

                                                No Users Found

                                            </td>

                                        </tr>

                                }

                            </tbody>

                        </table>

                }

            </div>

            {

                showModal && selectedUser && (

                    <div
                        className="modal-overlay"
                        onClick={() => setShowModal(false)}
                    >

                        <div
                            className="modal"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <h2>User Details</h2>

                            <p>

                                <strong>Name :</strong>

                                {selectedUser.name}

                            </p>

                            <p>

                                <strong>Email :</strong>

                                {selectedUser.email}

                            </p>

                            <p>

                                <strong>Phone :</strong>

                                {selectedUser.phone || "-"}

                            </p>

                            <p>

                                <strong>Address :</strong>

                                {selectedUser.address || "-"}

                            </p>

                            <p>

                                <strong>Joined :</strong>

                                {new Date(selectedUser.createdAt).toLocaleDateString()}

                            </p>

                            <button
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                            >

                                Close

                            </button>

                        </div>

                    </div>

                )

            }

        </div>

    );

}

export default AdminUsers;