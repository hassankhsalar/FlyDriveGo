import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";

const MakeSeller = () => {
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    data: sellerRequests,
    isLoading: isSellerLoading,
    isError: isSellerError,
    error: sellerError,
  } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      const res = await axiosPublic.get("/becomeseller");
      return res.data;
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (sellerRequests) {
        try {
          const userPromises = sellerRequests.map(async (seller) => {
            try {
              const res = await axiosPublic.get(`/users?email=${seller.email}`);
              const user = res.data[0] || {};
              return {
                _id: user._id || seller._id,
                email: seller.email,
                storeName: seller.storeName,
                name: user.name,
                userType: user.userType,
                photoURL: user.photoURL,
              };
            } catch (error) {
              console.error(`Error fetching user for ${seller.email}:`, error);
              return {
                _id: seller._id,
                email: seller.email,
                storeName: seller.storeName,
                name: null,
                userType: null,
                photoURL: null,
              };
            }
          });

          const mergedUsers = await Promise.all(userPromises);
          setUsers(mergedUsers);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [sellerRequests, axiosPublic]);

  const makeSeller = async (id) => {
    try {
      const res = await axiosPublic.patch(`/users/moderator/${id}`);
      if (res.data.modifiedCount > 0) {
        setUsers(
          users.map((user) =>
            user._id === id ? { ...user, userType: "seller" } : user
          )
        );
        toast.success("User role updated to seller!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("User role unchanged", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error("Failed to update user role", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

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
              toast.dismiss();
            }}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axiosPublic.delete(`/users/${id}`);
      if (res.data.deletedCount > 0) {
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error("Failed to delete user", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (isSellerLoading || loading)
    return <div className="text-center mt-10">Loading...</div>;
  if (isSellerError)
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {sellerError?.message}
      </div>
    );
  console.log(users);
  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Seller Requests</h2>
      <div>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left text-gray-600">Image</th>
              <th className="py-3 px-4 text-left text-gray-600">Name</th>
              <th className="py-3 px-4 text-left text-gray-600">Email</th>
              <th className="py-3 px-4 text-left text-gray-600">Store Name</th>
              <th className="py-3 px-4 text-left text-gray-600">User Type</th>
              <th className="py-3 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/40"}
                    alt={user.name || user.storeName || "User"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                <td className="py-3 px-4">{user.name || "N/A"}</td>
                <td className="py-3 px-4">{user.email || "N/A"}</td>
                <td className="py-3 px-4">{user.storeName || "N/A"}</td>
                <td className="py-3 px-4 capitalize">
                  {user.userType || "Not assigned"}
                </td>
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    onClick={() => confirmMakeSeller(user._id, user.name)}
                    disabled={user.userType === "seller"}
                    className={`px-4 py-2 rounded-lg text-white transition-all duration-300 shadow-md hover:shadow-lg ${
                      user.userType === "seller"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    Make Seller
                  </button>
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
      <ToastContainer />
    </div>
  );
};

export default MakeSeller;
