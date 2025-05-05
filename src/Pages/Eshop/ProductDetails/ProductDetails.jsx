import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure"; // Added import for secure axios
import useCart from "../../../Hooks/useCart"; // Added import for cart hook
import Swal from "sweetalert2"; // Added import for Swal

// react icons
import { IoHeart, IoHeartOutline, IoShareSocialOutline, IoStar } from "react-icons/io5";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import useAuth from "../../../Hooks/useAuth";

const ProductDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure(); // Added axios secure instance
    const [cart, refetch] = useCart(); // Added cart hook
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Image and Selection states
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState("Black");
    const [quantity, setQuantity] = useState(1);
    const [isExpanded, setIsExpanded] = useState(false);

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

    // Quantity handlers with animation
    const increaseQuantity = useCallback(() => {
        setQuantity(prev => prev + 1);
    }, []);

    const decreaseQuantity = useCallback(() => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }, []);
    
    // Handle direct input of quantity
    const handleQuantityChange = useCallback((e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        } else if (e.target.value === '') {
            setQuantity('');
        }
    }, []);

    // Check if product is already in cart
    const isProductInCart = useCallback(() => {
        if (!cart || !cart.length) return false;
        return cart.some(item => item.productId === id);
    }, [cart, id]);

    // Added Add to Cart functionality with check for existing items
    const addToCart = () => {
        if (!user) {
            Swal.fire({
                title: "Please Login",
                text: "You need to be logged in to add items to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0FABCA",
                cancelButtonColor: "#d33",
                confirmButtonText: "Go to Login",
                backdrop: `rgba(0,0,0,0.4)`,
                customClass: {
                    container: 'swal-container',
                    popup: 'rounded-lg',
                    title: 'text-lg font-medium',
                    confirmButton: 'rounded-md px-5'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to login page (you might want to implement this)
                    // navigate("/login");
                }
            });
            return;
        }

        // Check if the product is already in the cart
        if (isProductInCart()) {
            Swal.fire({
                icon: 'info',
                title: 'Already in Cart',
                text: 'This product is already in your cart!',
                position: 'top-end',
                toast: true,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                iconColor: '#0FABCA',
                customClass: {
                    popup: 'rounded-lg border-l-4 border-[#0FABCA]'
                }
            });
            return;
        }

        const cartItem = {
            productId: id,
            name: product.title,
            price: product.price,
            image: product.photo[0],
            quantity: quantity,
            email: user.email,
            // Add other properties you might need
            category: product.category
        };

        axiosSecure.post('/carts', cartItem)
            .then(res => {
                if (res.data.insertedId) {
                    refetch();                     // Refresh cart data
                    Swal.fire({
                        icon: 'success',
                        title:'Added to cart!',
                        text: `${product.title} has been added to your cart`,
                        position: 'top-end',
                        toast: true,
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        iconColor: '#28a745',
                        customClass: {
                            popup: 'rounded-lg shadow-md border-l-4 border-green-500'
                        }
                    });
                }
            })
            .catch(error => {
                console.error("Error adding to cart:", error);
                                    Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Could not add item to cart",
                    text: "Please try again later",
                    toast: true,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    iconColor: '#dc3545',
                    customClass: {
                        popup: 'rounded-lg shadow-md border-l-4 border-red-500'
                    }
                });
            });
    };


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
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#0FABCA]"></div>
                <p className="mt-4 text-gray-600 font-medium">Loading product details...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center p-8 bg-red-50 rounded-lg shadow-md max-w-md mx-auto border border-red-100">
                    <div className="text-red-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to load product</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-5 py-2 bg-[#0FABCA] text-white rounded-md hover:bg-[#0D96B3] transition-colors duration-200 shadow-sm hover:shadow"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
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
                                    className="w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[500px] object-contain transition-all duration-300 ease-in-out p-2"
                                />
                            ) : (
                                <div className="w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[500px] bg-gray-200 flex items-center justify-center">
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
                                    className={`flex-shrink-0 bg-gray-50 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden transition-all duration-200 ${
                                        currentImageIndex === index
                                            ? "ring-2 ring-[#0FABCA] ring-offset-1 scale-105"
                                            : "ring-1 ring-gray-200 hover:ring-gray-300 opacity-80 hover:opacity-100"
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

                        <div className="flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4 mb-4">
                            <div className="flex items-baseline">
                                <span className="text-xl sm:text-2xl font-bold text-[#0FABCA]">${product?.price}</span>
                                {product?.oldPrice && (
                                    <span className="text-gray-400 text-sm sm:text-base line-through ml-2">${product.oldPrice}</span>
                                )}
                            </div>

                            <div className="flex items-center gap-1 bg-gray-50 px-2 sm:px-3 py-1 rounded-full">
                                <IoStar className="text-yellow-400 text-sm sm:text-base" />
                                <span className="text-gray-800 text-sm font-medium">{product?.rating || 4.5}</span>
                                <span className="text-gray-500 text-xs ml-1">({product?.sold || 0} sold)</span>
                            </div>
                            
                            {isProductInCart() && (
                                <div className="flex items-center gap-1 bg-green-50 px-2 sm:px-3 py-1 rounded-full">
                                    <span className="text-green-600 text-xs font-medium">In Your Cart</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-5 sm:mb-6 border-t border-gray-200 pt-4 sm:pt-5">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Description</h2>
                        <div className="text-sm sm:text-base text-gray-600 leading-relaxed space-y-2">
                            <p>{product.details}</p>
                            
                            {/* Responsive collapsible section for long descriptions */}
                            {product.details && product.details.length > 300 && (
                                <div className="pt-2">
                                    <button 
                                        className="text-[#0FABCA] text-sm font-medium hover:underline focus:outline-none"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                    >
                                        {isExpanded ? 'Show less' : 'Read more'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Quantity</h2>
                        <div className="flex items-center">
                            <button
                                onClick={decreaseQuantity}
                                disabled={quantity <= 1}
                                className={`w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center text-xl font-medium transition-all duration-150 
                                ${quantity <= 1 
                                  ? 'text-gray-300 cursor-not-allowed' 
                                  : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200 hover:text-[#0FABCA]'}`}
                                aria-label="Decrease quantity"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                                onBlur={() => {
                                    if (quantity === '' || quantity < 1) setQuantity(1);
                                }}
                                className="w-16 sm:w-20 h-10 border-t border-b border-gray-300 text-center font-medium focus:outline-none focus:ring-1 focus:ring-[#0FABCA]"
                            />
                            <button
                                onClick={increaseQuantity}
                                className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center text-xl font-medium text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-all duration-150 hover:text-[#0FABCA]"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {isProductInCart() ? "This item is already in your cart" : "Select desired quantity"}
                        </p>
                    </div>

                    {/* Add to Cart / Checkout Buttons */}
                    <div className="flex flex-col xs:flex-row gap-3 mt-2 sm:mt-auto">
                        <button
                            onClick={addToCart}
                            disabled={isProductInCart()}
                            className={`grow py-3 px-4 sm:px-6 transition-all duration-300 rounded-md font-medium shadow-sm text-center ${
                                isProductInCart() 
                                ? "bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed" 
                                : "bg-[#0FABCA] hover:bg-[#0D96B3] hover:shadow-md text-white transform hover:-translate-y-1"
                            }`}>
                            <span className="flex items-center justify-center">
                                {isProductInCart() ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Already In Cart
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add To Cart
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;