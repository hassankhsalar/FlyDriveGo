import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

// react icons
import { IoHeart, IoHeartOutline, IoShareSocialOutline, IoStar } from "react-icons/io5";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const ProductDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Image and Selection states
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState("Black");
    const [quantity, setQuantity] = useState(1);

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosPublic.get(`/products/${id}`);
                setProduct(res.data);
                
                // Initialize selections based on product data
                if (res.data?.colors?.length > 0) {
                    setSelectedColor(res.data.colors[0]);
                }
                
                if (res.data?.sizes?.length > 0) {
                    setSelectedSize(res.data.sizes[0]);
                }
                
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product information");
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, axiosPublic]);

    // Image navigation handlers
    const nextImage = useCallback(() => {
        if (!product?.photo || product.photo.length <= 1) return;
        setCurrentImageIndex((prev) => (prev + 1) % product.photo.length);
    }, [product]);

    const prevImage = useCallback(() => {
        if (!product?.photo || product.photo.length <= 1) return;
        setCurrentImageIndex((prev) => (prev - 1 + product.photo.length) % product.photo.length);
    }, [product]);

    const selectThumbnail = useCallback((index) => {
        setCurrentImageIndex(index);
    }, []);

    // Quantity handlers
    const increaseQuantity = useCallback(() => {
        setQuantity(prev => prev + 1);
    }, []);

    const decreaseQuantity = useCallback(() => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }, []);

    // Keyboard navigation for images
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextImage, prevImage]);

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0FABCA]"></div>
            </div>
        );
    }

    // Error state

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24 mb-12 sm:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {/* Image Section */}
                <div className="relative">
                    <div className="flex flex-col sm:flex-row">
                        {/* Mobile Actions Bar - Only visible on small screens */}
                        <div className="flex sm:hidden justify-end gap-2 mb-3">
                            <button 
                                className="bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-sm transition-all duration-200"
                                title="Share product"
                            >
                                <IoShareSocialOutline className="w-5 h-5 text-gray-700" />
                            </button>
                            <button
                                className="bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-sm transition-all duration-200"
                                onClick={() => setIsFavorite(!isFavorite)}
                                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                                {isFavorite ? (
                                    <IoHeart className="w-5 h-5 text-red-500" />
                                ) : (
                                    <IoHeartOutline className="w-5 h-5 text-gray-700" />
                                )}
                            </button>
                        </div>
                        
                        <div className="relative flex items-center justify-center w-full bg-gray-50 overflow-hidden rounded-lg shadow-sm">
                            {product?.photo && product.photo.length > 0 ? (
                                <img
                                    src={product.photo[currentImageIndex]}
                                    alt={`${product.title} view ${currentImageIndex + 1}`}
                                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-contain transition-all duration-300 ease-in-out"
                                />
                            ) : (
                                <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400">No image available</span>
                                </div>
                            )}
                            
                            {/* Image Navigation Controls */}
                            {product?.photo && product.photo.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevImage} 
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md transition-all duration-200"
                                        aria-label="Previous image"
                                    >
                                        <BiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                                    </button>
                                    <button 
                                        onClick={nextImage} 
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md transition-all duration-200"
                                        aria-label="Next image"
                                    >
                                        <BiChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                                    </button>
                                </>
                            )}
                        </div>
                        
                        {/* Side Actions - Only visible on larger screens */}
                        <div className="hidden sm:flex flex-col justify-start gap-3 ml-4">
                            <button 
                                className="bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-sm transition-all duration-200"
                                title="Share product"
                            >
                                <IoShareSocialOutline className="w-5 h-5 text-gray-700" />
                            </button>
                            <button
                                className="bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-sm transition-all duration-200"
                                onClick={() => setIsFavorite(!isFavorite)}
                                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                                {isFavorite ? (
                                    <IoHeart className="w-5 h-5 text-red-500" />
                                ) : (
                                    <IoHeartOutline className="w-5 h-5 text-gray-700" />
                                )}
                            </button>
                        </div>
                    </div>
                    
                    {/* Thumbnails */}
                    {product?.photo && product.photo.length > 1 && (
                        <div className="flex justify-center sm:justify-start gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                            {product.photo.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => selectThumbnail(index)}
                                    className={`flex-shrink-0 bg-gray-50 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden transition-all duration-200 ${
                                        currentImageIndex === index 
                                            ? "ring-2 ring-[#0FABCA] ring-offset-1" 
                                            : "ring-1 ring-gray-200 hover:ring-gray-300"
                                    }`}
                                >
                                    <img 
                                        src={img} 
                                        alt={`Thumbnail ${index + 1}`} 
                                        className="w-full h-full object-cover" 
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details Section */}
                <div className="flex flex-col">
                    <div className="pb-4 sm:pb-6">
                        <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-1">{product?.brand || "Unknown Brand"}</p>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{product?.title}</h1>
                        
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
                            <div className="flex items-baseline">
                                <span className="text-xl sm:text-2xl font-bold text-[#0FABCA]">${product?.price}</span>
                                {product?.oldPrice && (
                                    <span className="text-gray-400 text-base sm:text-lg line-through ml-2">${product.oldPrice}</span>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-1 bg-gray-50 px-2 sm:px-3 py-1 rounded-full">
                                <IoStar className="text-yellow-400 text-base sm:text-lg" />
                                <span className="text-gray-800 font-medium">{product?.rating || 4.5}</span>
                                <span className="text-gray-500 text-xs sm:text-sm ml-1">({product?.sold || 0} sold)</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6 sm:mb-8 border-t border-gray-200 pt-4 sm:pt-6">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Description</h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            {product.details}
                        </p>
                    </div>

                    {/* Colors Section - Commented out but styled properly */}
                    {/* 
                    <div className="mb-6 sm:mb-8">
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Color</h2>
                            <span className="text-[#0FABCA] font-medium">{selectedColor}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {colors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color.name)}
                                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 ${
                                        selectedColor === color.name 
                                            ? "ring-2 ring-[#0FABCA] ring-offset-2" 
                                            : "ring-1 ring-gray-200"
                                    }`}
                                >
                                    <div className={`w-full h-full rounded-full ${color.class}`}></div>
                                </button>
                            ))}
                        </div>
                    </div>
                    */}

                    {/* Size Options - Commented out but styled properly */}
                    {/* 
                    <div className="mb-6 sm:mb-8">
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Size</h2>
                            <button className="text-[#0FABCA] text-xs sm:text-sm font-medium underline">
                                Size Guide
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center transition-all duration-200 ${
                                        selectedSize === size
                                            ? "bg-[#0FABCA] text-white border-transparent"
                                            : "border border-gray-300 text-gray-600 hover:border-[#0FABCA]"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    */}
                    
                    {/* Quantity Selector */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Quantity</h2>
                        <div className="flex items-center">
                            <button 
                                onClick={decreaseQuantity}
                                className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            >
                                -
                            </button>
                            <div className="w-12 sm:w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center font-medium">
                                {quantity}
                            </div>
                            <button 
                                onClick={increaseQuantity}
                                className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart / Checkout Buttons */}
                    <div className="flex flex-col xs:flex-row gap-3 mt-4 sm:mt-auto">
                        <button className="grow py-3 px-4 sm:px-6 bg-[#0FABCA] hover:bg-[#0D96B3] transition-colors duration-200 rounded-md text-white font-medium shadow-sm text-center">
                            Add To Cart
                        </button>
                        <button className="grow py-3 px-4 sm:px-6 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors duration-200 text-center">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;