import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Hourglass, User, MapPin, CheckCircle, XCircle, ThumbsUp, Utensils } from "lucide-react";

const TourDetails = () => {
    const { title } = useParams();
    const [tour, setTour] = useState(null);
    const [activeTab, setActiveTab] = useState("information");

    useEffect(() => {
        fetch("/tourPackages.json")
            .then((res) => res.json())
            .then((data) => {
                const foundTour = data.find((item) => item.title === title);
                setTour(foundTour || null);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
                setTour(null);
            });
    }, [title]);

    // Loading state
    if (tour === null && tour !== undefined) {
        return <p className="text-center text-lg font-semibold mt-10">Loading tour details...</p>;
    }

    // No tour found or fetch failed
    if (!tour) {
        return <p className="text-center text-lg font-semibold mt-10">Tour not found.</p>;
    }

    return (
        <div className="max-w-6xl mx-auto bg-white font-red-rose px-2 sm:px-4">
            {/* Hero Section */}
            <div className="relative">
                <img
                    src={tour.banner_img}
                    alt={tour.title}
                    className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 py-6">
                    <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{tour.title}</h1>
                    <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#4EDAE4] mt-2">
                        {tour.price.currency} {tour.price.per_person.toLocaleString()} / per person
                    </p>
                </div>
            </div>

            {/* Sticky Tabs */}
            <div className="sticky top-0 bg-white shadow-md z-10">
                <ul className="flex flex-wrap justify-center gap-1 sm:gap-2 md:space-x-4 lg:space-x-6 bg-white border-b border-gray-200 py-2 sm:py-3">
                    {["information", "tourPlan", "location", "gallery", "food", "reviews"].map((tab) => (
                        <li
                            key={tab}
                            className={`px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-2 text-xs sm:text-sm md:text-base lg:text-lg font-semibold cursor-pointer transition-all duration-300 ${activeTab === tab
                                ? "text-[#4EDAE4] border-b-2 sm:border-b-4 border-[#4EDAE4]"
                                : "text-gray-600 hover:text-[#4EDAE4]"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1")}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tab Content */}
            <div className="mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4 md:px-6 py-4 sm:py-6">
                {/* Information Tab */}
                {activeTab === "information" && (
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#4EDAE4]">
                            {tour.title.split(/:/)[0].trim()}
                        </h2>
                        <p className="text-red-600 text-xs sm:text-sm font-extralight">Been there recently?</p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-700 mt-2">{tour.overview}</p>

                        <div className="bg-[#4EDAE4] p-2 sm:p-3 md:p-4 flex flex-wrap justify-around gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 rounded-lg">
                            <div className="flex flex-col items-center">
                                <Hourglass className="text-black w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                <p className="mt-1 text-black text-xs sm:text-sm md:text-base font-medium">{tour.duration}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <User className="text-black w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                <p className="mt-1 text-black text-xs sm:text-sm md:text-base font-medium">7+ Age</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <MapPin className="text-black w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                <p className="mt-1 text-black text-xs sm:text-sm md:text-base font-medium">{tour.destination.country}</p>
                            </div>
                        </div>

                        <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 border-t border-gray-300">
                                {/* Destination */}
                                <div className="border-b border-gray-300 py-2 sm:py-3 text-sm sm:text-base font-semibold">Destination</div>
                                <div className="border-b border-gray-300 py-2 sm:py-3 text-sm sm:text-base">{tour.destination.city}</div>

                                {/* Departure */}
                                <div className="border-b border-gray-300 py-2 sm:py-3 text-sm sm:text-base font-semibold">Departure</div>
                                <div className="border-b border-gray-300 py-2 sm:py-3 text-sm sm:text-base">Dhaka, Bangladesh</div>

                                {/* Departure Time */}
                                <div className="border-b border-gray-300 py-2 sm:py-3 text-sm sm:text-base font-semibold">Departure Time</div>
                                <div className="border-b border-gray-300 py-2 sm:py-3 text-sm sm:text-base">
                                    Please arrive by 9:15 AM for a departure at 9:30 AM.
                                </div>

                                {/* Return Time */}
                                <div className="border-b border-gray-300 py-2 sm:py-3 text-sm sm:text-base font-semibold">Return Time</div>
                                <div className="border-b border-gray-300 py-2 sm:py-3 text-sm sm:text-base">Approximately 8:30 PM.</div>
                            </div>

                            {/* Included */}
                            <div className="border-t border-gray-300 mt-3 sm:mt-4 pt-3 sm:pt-4">
                                <h3 className="text-sm sm:text-base font-semibold">Included</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mt-1 sm:mt-2">
                                    {tour.inclusions?.map((item, index) => (
                                        <div key={index} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                                            <CheckCircle className="text-green-500 w-3 h-3 sm:w-4 sm:h-4" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Not Included */}
                            <div className="border-t border-gray-300 mt-3 sm:mt-4 pt-3 sm:pt-4">
                                <h3 className="text-sm sm:text-base font-semibold">Not Included</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mt-1 sm:mt-2">
                                    {tour.exclusions?.map((item, index) => (
                                        <div key={index} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                                            <XCircle className="text-red-500 w-3 h-3 sm:w-4 sm:h-4" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Accommodation Section */}
                            {tour.accommodation && (
                                <div className="mt-6 sm:mt-8">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#4EDAE4] mb-3 sm:mb-4 md:mb-6 border-b pb-1 sm:pb-2">Accommodation</h3>

                                    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
                                        {/* Hotel Name and Rating */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 sm:mb-3 md:mb-4">
                                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                                                {tour.accommodation.hotel_name}
                                            </h4>
                                            <div className="flex items-center mt-1 sm:mt-0">
                                                <span className="text-gray-700 text-xs sm:text-sm font-medium mr-1 sm:mr-2">Rating:</span>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${i < Math.floor(tour.accommodation.rating)
                                                                ? "text-yellow-400"
                                                                : "text-gray-300"}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="ml-1 text-gray-600 text-xs sm:text-sm">({tour.accommodation.rating})</span>
                                            </div>
                                        </div>

                                        {/* Room Type */}
                                        <div className="mb-2 sm:mb-3 md:mb-4">
                                            <span className="font-medium text-gray-700 text-xs sm:text-sm">Room Type: </span>
                                            <span className="text-gray-600 text-xs sm:text-sm">{tour.accommodation.room_type}</span>
                                        </div>

                                        {/* Description */}
                                        {tour.accommodation.description && (
                                            <div className="mb-4 sm:mb-5 md:mb-6">
                                                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                                                    {tour.accommodation.description}
                                                </p>
                                            </div>
                                        )}

                                        {/* Hotel Photos */}
                                        {tour.accommodation.photos && tour.accommodation.photos.length > 0 && (
                                            <div>
                                                <h5 className="font-medium text-gray-700 text-xs sm:text-sm mb-2 sm:mb-3">Hotel Photos:</h5>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                                                    {tour.accommodation.photos.map((photo, index) => (
                                                        <div key={index} className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                                            <img
                                                                src={photo}
                                                                alt={`Accommodation ${index + 1}`}
                                                                className="w-full h-32 sm:h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-300"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Tour Plan Tab */}
                {activeTab === "tourPlan" && tour.itinerary && (
                    <div>
                        <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6">
                            <div className="relative border-l border-gray-300">
                                {tour.itinerary.map((plan, index) => (
                                    <div key={index} className="mb-4 sm:mb-6 md:mb-8">
                                        <div
                                            className="absolute w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#4EDAE4] z-10 border-2 sm:border-3 md:border-4 border-white rounded-full left-[0px] transform -translate-x-1/2 -translate-y-1/2"
                                        />
                                        <div className="pl-4 sm:pl-5 md:pl-6">
                                            <div className="flex sm:items-center sm:flex-row flex-col">
                                                <div className="text-[#4EDAE4] text-sm sm:text-base md:text-lg font-semibold">
                                                    Day {plan.day}
                                                </div>
                                                <div className="sm:ml-2 md:ml-4 text-[#424242] text-sm sm:text-base md:text-lg font-semibold">
                                                    {plan.title}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
                                                {plan.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "location" && (
                    <div className="space-y-4 sm:space-y-6">
                        {/* History Section */}
                        <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4EDAE4] mb-2 sm:mb-3 md:mb-4">
                                History of {tour.destination.city}
                            </h2>
                            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line">
                                {tour.country_history || "Historical information not available"}
                            </p>
                        </div>

                        {/* Map Section */}
                        <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4EDAE4] mb-2 sm:mb-3 md:mb-4">
                                Location Map
                            </h2>
                            <iframe
                                src={`https://www.google.com/maps?q=${tour.destination.city},${tour.destination.country}&z=15&output=embed`}
                                className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] rounded-lg"
                                frameBorder="0"
                                allowFullScreen
                                title="Tour location map"
                            />
                        </div>
                    </div>
                )}

                {/* Gallery Tab */}
                {activeTab === "gallery" && (
                    <div className="p-2 sm:p-3 md:p-4 max-w-screen-xl mx-auto grid gap-2 sm:gap-3 md:gap-4 items-center justify-center">
                        {/* First Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                            <img
                                className="col-span-1 md:col-span-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full aspect-[16/9] object-cover"
                                src={tour.IMG1}
                                alt="Bali Image 1"
                            />
                            <div className="grid grid-rows-2 gap-2 sm:gap-3 md:gap-4">
                                <img
                                    className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 aspect-[16/9] object-cover"
                                    src={tour.IMG2}
                                    alt="Bali Image 2"
                                />
                                <img
                                    className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 aspect-[16/9] object-cover"
                                    src={tour.IMG3}
                                    alt="Bali Image 3"
                                />
                            </div>
                        </div>

                        {/* Second Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                            <img
                                className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 aspect-[16/9] object-cover"
                                src={tour.IMG4}
                                alt="Bali Image 4"
                            />
                            <img
                                className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 aspect-[16/9] object-cover"
                                src={tour.IMG5}
                                alt="Bali Image 5"
                            />
                            <img
                                className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 aspect-[16/9] object-cover"
                                src={tour.IMG6}
                                alt="Bali Image 6"
                            />
                        </div>
                    </div>
                )}
                {/* Food Tab */}
                {activeTab === "food" && tour.food && (
                    <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4EDAE4] mb-4 sm:mb-6">
                            Culinary Experience
                        </h2>

                        {/* Food Description */}
                        <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <Utensils className="text-[#4EDAE4] w-5 h-5 sm:w-6 sm:h-6" />
                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">About the Food</h3>
                            </div>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                {tour.food.description}
                            </p>
                        </div>

                        {/* Meal Schedule */}
                        <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                                Meal Schedule & Options
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                {/* Breakfast */}
                                <div className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-bold text-[#4EDAE4] text-base sm:text-lg mb-2 sm:mb-3">Breakfast</h4>
                                    <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-3">
                                        <span className="font-medium">Time:</span> {tour.food.meal_schedule.breakfast.time}
                                    </p>
                                    <div>
                                        <p className="font-medium text-sm sm:text-base mb-1 sm:mb-2">Options:</p>
                                        <ul className="space-y-1 sm:space-y-2">
                                            {tour.food.meal_schedule.breakfast.options.map((option, index) => (
                                                <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <span className="w-2 h-2 rounded-full bg-[#4EDAE4]"></span>
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Lunch */}
                                <div className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-bold text-[#4EDAE4] text-base sm:text-lg mb-2 sm:mb-3">Lunch</h4>
                                    <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-3">
                                        <span className="font-medium">Time:</span> {tour.food.meal_schedule.lunch.time}
                                    </p>
                                    <div>
                                        <p className="font-medium text-sm sm:text-base mb-1 sm:mb-2">Options:</p>
                                        <ul className="space-y-1 sm:space-y-2">
                                            {tour.food.meal_schedule.lunch.options.map((option, index) => (
                                                <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <span className="w-2 h-2 rounded-full bg-[#4EDAE4]"></span>
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Dinner */}
                                <div className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-bold text-[#4EDAE4] text-base sm:text-lg mb-2 sm:mb-3">Dinner</h4>
                                    <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-3">
                                        <span className="font-medium">Time:</span> {tour.food.meal_schedule.dinner.time}
                                    </p>
                                    <div>
                                        <p className="font-medium text-sm sm:text-base mb-1 sm:mb-2">Options:</p>
                                        <ul className="space-y-1 sm:space-y-2">
                                            {tour.food.meal_schedule.dinner.options.map((option, index) => (
                                                <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <span className="w-2 h-2 rounded-full bg-[#4EDAE4]"></span>
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Dietary Notes */}
                            <div className="mt-6 sm:mt-8 bg-blue-50 p-3 sm:p-4 md:p-5 rounded-lg border border-blue-100">
                                <h4 className="font-semibold text-blue-800 text-sm sm:text-base mb-2 sm:mb-3">
                                    Dietary Notes
                                </h4>
                                <p className="text-blue-700 text-xs sm:text-sm">
                                    Please inform us in advance about any specific dietary requirements or allergies.
                                    We'll do our best to accommodate your needs while ensuring you experience authentic local cuisine.
                                </p>
                            </div>
                        </div>
                    </div>
                )}


                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                    <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
                        {tour.reviews && tour.reviews.length > 0 ? (
                            <div className="space-y-4 sm:space-y-6 md:space-y-8">
                                {tour.reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                                    >
                                        {/* User Info */}
                                        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                                            <img
                                                src={review.user.avatar}
                                                alt={review.user.name}
                                                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[#4EDAE4]"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800">
                                                    {review.user.name}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    {review.user.location} • {review.user.traveler_type}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${i < review.rating
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                        }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>

                                        {/* Review Title & Text */}
                                        <h4 className="font-semibold text-base sm:text-lg md:text-xl text-gray-800 mb-1 sm:mb-2">
                                            {review.title}
                                        </h4>
                                        <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4 leading-relaxed">
                                            {review.review_text}
                                        </p>

                                        {/* Photos */}
                                        {review.photos && review.photos.length > 0 && (
                                            <div className="flex gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4 overflow-x-auto">
                                                {review.photos.map((photo, index) => (
                                                    <img
                                                        key={index}
                                                        src={photo}
                                                        alt={`Review by ${review.user.name}`}
                                                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {/* Metadata */}
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-500">
                                            <span>
                                                {new Date(review.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                            {review.verified_booking && (
                                                <span className="flex items-center gap-1 text-green-600">
                                                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    Verified Booking
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                                                {review.helpful_count} helpful
                                            </span>
                                        </div>

                                        {/* Host Response */}
                                        {review.response && (
                                            <div className="mt-2 sm:mt-3 md:mt-4 pl-2 sm:pl-3 md:pl-4 border-l-2 sm:border-l-3 md:border-l-4 border-[#4EDAE4]">
                                                <p className="text-xs sm:text-sm text-gray-600">
                                                    <span className="font-semibold">Response: </span>
                                                    {review.response.text}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 text-sm sm:text-base">No reviews available.</p>
                        )}
                    </div>
                )}


            </div>

            {/* Booking Section */}
            <div className="text-center my-4 sm:my-6 md:my-8">
                <Link to="/tour-booking">
                    <button className="bg-[#4EDAE4] text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl font-bold hover:bg-[#3cb8c6] transition-all">
                        Book Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TourDetails;