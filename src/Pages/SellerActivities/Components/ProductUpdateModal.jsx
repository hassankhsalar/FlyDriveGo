import React, { useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const ProductUpdateModal = ({ selectedProduct, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [productName, setProductName] = useState("");
    const [productDetails, setProductDetails] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

  
    useEffect(() => {
        if (selectedProduct) {
            setImageUrl(selectedProduct.productPhoto || "");
            setProductName(selectedProduct.productName || "");
            setProductDetails(selectedProduct.productDetails || "");
            setProductPrice(selectedProduct.productPrice || "");
            setIsModalOpen(true); 
        }
    }, [selectedProduct]);

    // Image upload function
    const uploadImage = async (file) => {
        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                return data.data.url; 
            }
        } catch (error) {
            console.error("Upload failed:", error);
            return null;
        }
    };

   
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageUrl(URL.createObjectURL(file)); 
        }
    };

    const handleUpdate = async () => {
        if (!selectedProduct?._id) {
            console.error("No product ID provided for update");
            return;
        }

        if (!productName || !productDetails || !productPrice) {
            Swal.fire("Error", "All fields are required", "error");
            return;
        }

        const price = parseFloat(productPrice);
        if (isNaN(price)) {
            Swal.fire("Error", "Product price must be a valid number", "error");
            return;
        }

        let imageUrlToUpdate = imageUrl; 
        if (image) {
            imageUrlToUpdate = await uploadImage(image);
            if (!imageUrlToUpdate) {
                Swal.fire("Error", "Image upload failed. Please try again.", "error");
                return;
            }
        }

        const updatedProduct = {
            productName,
            productDetails,
            productPrice: price,
            productPhoto: imageUrlToUpdate,
        };

        try {
            const res = await axiosPublic.put(`/updateProduct/${selectedProduct._id}`, updatedProduct);
            console.log('Response:', res);

            if (res.data?.success || res.data?.modifiedCount > 0) {
                await refetch();
                Swal.fire("Updated!", "Product updated successfully.", "success");
                setIsModalOpen(false);
            } else {
                Swal.fire("Error", "No changes detected.", "error");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            const errorMessage = error.response?.data?.message || "Failed to update product";
            Swal.fire("Error", errorMessage, "error");
        }
    };

    return (
        <>
            {isModalOpen && (
                <dialog id="productUpdateModal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h1 className='text-primary text-3xl text-center font-semibold my-4'>Update Your Product</h1>
                        <form className='w-full'>
                            <div className='p-6 shadow-md'>
                                <h2 className='text-xl font-bold'>Upload Your Product Data</h2>

                                {/* Image Upload */}
                                <div className="my-4">
                                    <p className='mb-2'>Product Photo</p>
                                    <div className="flex items-center">
                                        <p className='text-2xl rounded-full bg-gray-200 p-2 text-gray-600 mr-8'>
                                            <FaImage />
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="file-input file-input-ghost"
                                        />
                                    </div>

                                    {imageUrl && (
                                        <div>
                                            <img src={imageUrl} alt="Uploaded" className="w-32 h-32 rounded-md shadow-md mt-2" />
                                        </div>
                                    )}
                                </div>

                                {/* Product Name */}
                                <div className="my-3">
                                    <p className='mb-2'>Product Name:</p>
                                    <input
                                        type="text"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        className="w-full h-10 rounded-sm border border-gray-300 p-2"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="my-3">
                                    <p className='mb-2'>Product Details:</p>
                                    <textarea
                                        className="textarea w-full"
                                        value={productDetails}
                                        onChange={(e) => setProductDetails(e.target.value)}
                                        placeholder="Add Your Product Details"
                                    />
                                </div>

                                {/* Product Price */}
                                <div className="my-3">
                                    <p>Product Price:</p>
                                    <input
                                        type="number"
                                        min="0"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        className="w-full h-10 rounded-sm border border-gray-300 p-2"
                                    />
                                </div>
                            </div>
                        </form>

                        {/* Modal Actions */}
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-outline mr-4" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="button" onClick={handleUpdate} className="btn btn-neutral">Update Product</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};

export default ProductUpdateModal;
