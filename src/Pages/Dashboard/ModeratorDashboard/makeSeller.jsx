import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

const MakeSeller = () => {
  // Sample JSON data for testing
  const sampleUsers = [
    {
      _id: "1",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "user",
    },
    {
      _id: "2",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "seller",
    },
    {
      _id: "3",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "user",
    },
    {
      _id: "4",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "moderator",
    },
  ];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate fetching users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUsers(sampleUsers);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to make a user a seller (simulated)
  const makeSeller = async (id) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, role: "seller" } : user
        )
      );
      toast.success("User role updated to seller!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error("Failed to update user role", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Function to show confirmation toast for making a seller
  const confirmMakeSeller = (id, name) => {
    toast.info(
      <div>
        <p>
          Are you sure you want to make <strong>{name}</strong> a seller?
        </p>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => {
              makeSeller(id);
              toast.dismiss(); // Close the toast after confirmation
            }}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()} // Close the toast if "No" is clicked
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false, // Keep the toast open until an action is taken
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  // Function to delete a user (simulated)
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error("Failed to delete user", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left text-gray-600">Image</th>
              <th className="py-3 px-4 text-left text-gray-600">Name</th>
              <th className="py-3 px-4 text-left text-gray-600">Email</th>
              <th className="py-3 px-4 text-left text-gray-600">Role</th>
              <th className="py-3 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img
                    src={user.image || "https://via.placeholder.com/40"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4">{user.name || "N/A"}</td>
                <td className="py-3 px-4">{user.email || "N/A"}</td>
                <td className="py-3 px-4 capitalize">
                  {user.role || "Not assigned"}
                </td>
                <td className="py-3 px-4 flex space-x-2">
                  {/* Make Seller Button (disabled if already a seller) */}
                  <button
                    onClick={() => confirmMakeSeller(user._id, user.name)}
                    disabled={user.role === "seller"}
                    className={`px-4 py-2 rounded-lg text-white transition-all duration-300 shadow-md hover:shadow-lg ${
                      user.role === "seller"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    Make Seller
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast Container for displaying toasts */}
      <ToastContainer />
    </div>
  );
};

export default MakeSeller;
