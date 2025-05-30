import React, { useContext, useState } from "react";
import { FaImage } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AddProducts = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    const uploadImage = async (file) => {
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
                setImageUrl(data.data.url);
            }
        } catch (error) {
            console.error("Upload failed:", error);
            Swal.fire("Error", "Image upload failed. Please try again.", "error");
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const productsData = {
            title: e.target.productName.value,
            photo: imageUrl,
            details: e.target.productDetails.value,
            price: Number(e.target.productPrice.value),
            quantity: Number(e.target.productQuantity.value),
            sellerName: user?.displayName,
            sellerEmail: user?.email,
            tags, 
        };

        axiosPublic
            .post("/addProducts", productsData)
            .then(() => {
                Swal.fire("Success", "Product Added successfully!", "success");
                e.target.reset();
                setImage(null);
                setImageUrl("");
                setTags([]); 
            })
            .catch((error) => {
                Swal.fire("Error", error.response?.data?.message || "Failed to add product", "error");
            });
    };

    return (
        <div className="md:w-10/12 w-11/12 my-20 mx-auto">
            <form onSubmit={handleAddProduct} className="lg:w-10/12 mx-auto w-full">
                <h1 className="text-primary text-3xl text-center font-semibold my-10">Add Your Product</h1>
                <div className="p-10 shadow-md">
                    <h2 className="text-xl font-bold">Upload Your Product Data</h2>

                    <div className="my-4">
                        <p className="mb-2">Product Photo</p>
                        <div className="flex items-center">
                            <p className="text-2xl rounded-full bg-gray-200 p-2 text-gray-600 mr-8">
                                <FaImage />
                            </p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setImage(file);
                                        uploadImage(file);
                                    }
                                }}
                                className="file-input file-input-ghost"
                                required
                            />
                        </div>

                        {imageUrl && (
                            <div className="my-4">
                                <p className="text-sm font-semibold">Product Photo:</p>
                                <img src={imageUrl} alt="Uploaded" className="w-32 h-32 rounded-md shadow-md" />
                            </div>
                        )}
                    </div>

                    <div className="my-3">
                        <p className="mb-2">Product Name:</p>
                        <input name="productName" type="text" className="w-full h-10 rounded-sm border-2 p-2" required />
                    </div>

                    <div className="my-3">
                        <p className="mb-2">Product Details:</p>
                        <textarea name="productDetails" className="textarea w-full" placeholder="Add Your Product Details"></textarea>
                    </div>

                    <div className="my-3">
                        <p>Product Price:</p>
                        <input name="productPrice" type="number" className="w-full h-10 rounded-sm border-2 p-2" required />
                    </div>

                    <div className="my-3">
                        <p>Product quantity:</p>
                        <input name="productQuantity" type="number" className="w-full h-10 rounded-sm border-2 p-2" required />
                    </div>

                    <div className="my-3">
                        <p className="mb-2">Tags:</p>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Enter a tag"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                className="w-full h-10 rounded-sm border-2 p-2"
                            />
                            <button type="button" onClick={handleAddTag} className="btn btn-neutral">
                                Add Tag
                            </button>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap">
                            {tags.map((tag, index) => (
                                <span key={index} className="m-1 px-3 py-1 bg-gray-200 rounded-lg text-sm">
                                    {tag}{" "}
                                    <button type="button" onClick={() => handleRemoveTag(tag)} className="text-red-500 ml-2">
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="my-3">
                        <p className="mb-2">Seller Name:</p>
                        <input value={user?.displayName} type="text" className="w-full h-10 rounded-sm border-2 p-2" readOnly />
                    </div>
                    <div className="my-3">
                        <p className="mb-2">Seller Email:</p>
                        <input value={user?.email} type="text" className="w-full h-10 rounded-sm border-2 p-2" readOnly />
                    </div>

                    <div className="flex space-x-3 mt-8 justify-end">
                        <button type="button" onClick={() => window.history.back()} className="btn btn-outline">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-neutral">
                            Add to FlyDriveGo
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProducts;
