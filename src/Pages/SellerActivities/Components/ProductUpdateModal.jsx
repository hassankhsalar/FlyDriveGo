import React from 'react';
import { FaImage } from 'react-icons/fa';
import { useState } from "react";

const ProductUpdateModal = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const uploadImage = async (file) => {
        const apiKey = "5ed41af57010930552edc79050fdff73";
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                setImageUrl(data.data.url);
            }
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>Update Product</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form className='w-full'>
                        <h1 className='text-primary text-3xl text-center font-semibold my-10'>Update Your Product</h1>
                        <div className='p-10 shadow-md '>
                            <h2 className='text-xl font-bold'> Upload Your Product Data</h2>
                            <div className="my-4">
                                <p className='mb-2'>Product Photo </p>
                                <div className="flex items-center">

                                    <p className='text-2xl rounded-full bg-gray-200 p-2 text-gray-600  mr-8 items-center'>
                                        <FaImage /></p>
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
                                    />

                                </div>


                                {imageUrl && (
                                    <div className="">
                                        <p className="text-sm font-semibold">Product Photo:</p>
                                        <img src={imageUrl} alt="Uploaded" className="w-32 h-32 rounded-md shadow-md" />
                                        <p className="text-xs break-all mt-2">URL: <a href={imageUrl} target="_blank" className="text-blue-500">{imageUrl}</a></p>
                                    </div>
                                )}

                            </div>
                            <div className="my-3">
                                <p className='mb-2'>Product Name: </p>
                                <input type="text" className="w-full h-10 rounded-sm border-SmokeWhite p-2 border-2" />
                            </div>
                            <div className="my-3">
                                <p className='mb-2'>Product Details: </p>
                                <textarea className="textarea w-full" placeholder="Add Your Product Details"></textarea>
                            </div>
                            <div className="my-3">
                                <p>Product Price: </p>
                                <input type="text" className='w-full h-10 rounded-sm border-SmokeWhite border-2 p-2' />
                            </div>

                        </div>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            <div className="flex space-x-3 mt-8 justify-end">
                                <button className="btn btn-outline">Cancel</button>
                                <button className="btn btn-neutral">Update Your Products</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default ProductUpdateModal;