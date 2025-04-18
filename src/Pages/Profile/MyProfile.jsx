import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaRegMoon } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { LuLogOut, LuImagePlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const { user,  updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const fileInputRef = useRef();
  const [imageUrl, setImageUrl] = useState(user?.photoURL);


    // Fetch Products
      const { data: users = [], isLoading, refetch } = useQuery({
          queryKey: ["users", user?.email],
          queryFn: async () => {
              const res = await axiosPublic.get(`/users/${user?.email}`);
             
              return res.data;
          },
      });
      const singleUser = users[0];
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        const imageLink = data.data.url;
        setImageUrl(imageLink);
        updateUserProfile({ photoURL: imageLink })
          .then(() => {
            Swal.fire("Success", "Image uploaded and profile updated!", "success");
          })
          .catch((err) => {
            console.error("Firebase profile update failed", err);
            Swal.fire("Error", "Failed to update Firebase profile", "error");
          });
      }
       else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      Swal.fire("Error", "Image upload failed. Please try again.", "error");
    }
  };


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <p className="text-xl font-semibold">
          You need to log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      

     

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-8/12 bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="relative">
            <div className="h-28 bg-primary"></div>
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  src={imageUrl || "https://via.placeholder.com/150"}
                  alt="Profile"
                />
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                
              />

              <div
                className="absolute rounded-full border-2 border-white p-1 bottom-3 bg-slate-300 -right-5 transform -translate-x-1/2 cursor-pointer"
                onClick={handleIconClick}
              >
                <LuImagePlus />
              </div>
            </div>
          </div>

          <div className="mt-16 text-center px-6 pb-4 group">
            <h2 className="text-xl font-bold text-gray-800 inline-flex items-center gap-1 justify-center">
              {user?.displayName || "User"}
            
            </h2>
          </div>

          <div className="px-6 py-3">
          <div className="group flex items-center gap-2">
              <span className="font-semibold text-gray-700">Gender:</span>
              <span>{singleUser?.gender || "Not provided"}</span>
             
            </div>
            <div className="group flex items-center gap-2">
              <span className="font-semibold text-gray-700">Date Of Birth:</span>
              <span>{singleUser?.dateOfBirth|| "Not provided"}</span>
             
            </div>

            <div className="group flex items-center gap-2">
              <span className="font-semibold text-gray-700">Phone:</span>
              <span>{singleUser?.phoneNumber || "Not provided"}</span>
             
            </div>
            <div className="group flex items-center gap-2">
              <span className="font-semibold text-gray-700">Mail:</span>
              <span>{singleUser?.email || "Not provided"}</span>
             
            </div>

           

          </div>

          <hr />

          <div className="text-sm text-gray-700">

            <div className="flex items-center justify-between px-6 py-3 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2">
                <FaRegMoon />
                <span>Dark mode</span>
              </div>

              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="synthwave" className="toggle theme-controller" />
              </label>
            </div>

            <div className="px-6 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
              <FiUser />
              <Link to={'/update-profile'}><span>Updates Profile</span></Link>
            </div>



            <div className="px-6 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
              <CiSettings />
              <span>Settings</span>
            </div>

            <div className="px-6 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-red-600">
              <LuLogOut />
              <button className="text-red-600">Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
