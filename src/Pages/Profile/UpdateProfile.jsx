import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, 
  });

  const singleUser = users[0];

 
  useEffect(() => {
    if (singleUser) {
      setName(singleUser.name || "");
      setGender(singleUser.gender || "");
      setPhoneNumber(singleUser.phoneNumber || "");
      setDateOfBirth(singleUser.dateOfBirth || "");
    }
  }, [singleUser]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const updatedData = { displayName: name };
      await updateUserProfile(updatedData);

      const updatedUser = {
        name,
        phoneNumber,
        gender,
        dateOfBirth,
      };

      await axiosPublic.patch(`/users/${user?.email}`, updatedUser);

      console.log("Profile updated successfully");
      navigate(`/my-profile/${user.email}`);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2 text-sm font-medium">
              Gender:
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="dob" className="block mb-2 text-sm font-medium">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium"
            >
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your Phone Number"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
