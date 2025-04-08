import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Hourglass, User, MapPin, CheckCircle, XCircle, ThumbsUp } from "lucide-react";

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
        <div className="max-w-6xl mx-auto bg-white font-red-rose">
            {/* Hero Section */}
            <div className="relative">
                <img
                    src={tour.banner_img}
                    alt={tour.title}
                    className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 py-6">
                    <h1 className="text-white text-2xl md:text-4xl font-bold">{tour.title}</h1>
                    <p className="text-xl md:text-2xl font-semibold text-[#4EDAE4] mt-2">
                        {tour.price.currency} {tour.price.per_person.toLocaleString()} / per person
                    </p>
                </div>
            </div>

            {/* Sticky Tabs */}
            <div className="sticky top-0 bg-white shadow-md z-10">
                <ul className="flex flex-wrap justify-center space-x-4 md:space-x-6 bg-white border-b border-gray-200 py-3">
                    {["information", "tourPlan", "location", "gallery", "reviews"].map((tab) => (
                        <li
                            key={tab}
                            className={`px-4 md:px-6 py-2 text-base md:text-lg font-semibold cursor-pointer transition-all duration-300 ${
                                activeTab === tab
                                    ? "text-[#4EDAE4] border-b-4 border-[#4EDAE4]"
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
            <div className="mt-8 px-4 md:px-6 py-6">
                {/* Information Tab */}
                {activeTab === "information" && (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#4EDAE4]">
                            {tour.title.split(/:/)[0].trim()}
                        </h2>
                        <p className="text-red-600 font-extralight">Been there recently?</p>
                        <p className="text-lg text-gray-700">{tour.overview}</p>

                        <div className="bg-[#4EDAE4] p-4 flex flex-wrap justify-around gap-4 mt-4 rounded-lg">
                            <div className="flex flex-col items-center">
                                <Hourglass className="text-black w-6 h-6" />
                                <p className="mt-1 text-black font-medium">{tour.duration}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <User className="text-black w-6 h-6" />
                                <p className="mt-1 text-black font-medium">7+ Age</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <MapPin className="text-black w-6 h-6" />
                                <p className="mt-1 text-black font-medium">{tour.destination.country}</p>
                            </div>
                        </div>

                        <div className="max-w-4xl mx-auto p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-300">
                                {/* Destination */}
                                <div className="border-b border-gray-300 py-3 font-semibold">Destination</div>
                                <div className="border-b border-gray-300 py-3">{tour.destination.city}</div>

                                {/* Departure */}
                                <div className="border-b border-gray-300 py-3 font-semibold">Departure</div>
                                <div className="border-b border-gray-300 py-3">Dhaka, Bangladesh</div>

                                {/* Departure Time */}
                                <div className="border-b border-gray-300 py-3 font-semibold">Departure Time</div>
                                <div className="border-b border-gray-300 py-3">
                                    Please arrive by 9:15 AM for a departure at 9:30 AM.
                                </div>

                                {/* Return Time */}
                                <div className="border-b border-gray-300 py-3 font-semibold">Return Time</div>
                                <div className="border-b border-gray-300 py-3">Approximately 8:30 PM.</div>

                                {/* Dress Code */}
                                <div className="border-b border-gray-300 py-3 font-semibold">Dress Code</div>
                                <div className="border-b border-gray-300 py-3">
                                    Casual, comfortable athletic clothing, hat and light jacket.
                                </div>
                            </div>

                            {/* Included */}
                            <div className="border-t border-gray-300 mt-4 pt-4">
                                <h3 className="font-semibold">Included</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="text-green-500" size={20} />
                                        Airplane Transport
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="text-green-500" size={20} />
                                        Breakfast
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="text-green-500" size={20} />
                                        Departure Taxes
                                    </div>
                                </div>
                            </div>

                            {/* Not Included */}
                            <div className="border-t border-gray-300 mt-4 pt-4">
                                <h3 className="font-semibold">Not Included</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                    <div className="flex items-center gap-2">
                                        <XCircle className="text-red-500" size={20} />
                                        5 Star Accommodation
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <XCircle className="text-red-500" size={20} />
                                        Personal Guide
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tour Plan Tab */}
                {activeTab === "tourPlan" && tour.itinerary && (
                    <div>
                        <div className="max-w-4xl mx-auto p-6">
                            <div className="relative border-l border-gray-300">
                                {tour.itinerary.map((plan, index) => (
                                    <div key={index} className="mb-8">
                                        <div
                                            className="absolute w-5 h-5 bg-[#4EDAE4] z-10 border-4 border-white rounded-full left-[0px] transform -translate-x-1/2 -translate-y-1/2"
                                        />
                                        <div className="pl-6">
                                            <div className="flex sm:items-center sm:flex-row flex-col">
                                                <div className="text-[#4EDAE4] font-semibold">
                                                    Day {plan.day}
                                                </div>
                                                <div className="sm:ml-4 text-[#424242] text-lg font-semibold">
                                                    {plan.title}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 mt-1">
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
                    <div className="space-y-6">
                        {/* History Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#4EDAE4] mb-4">
                                History of {tour.destination.city}
                            </h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {tour.country_history || "Historical information not available"}
                            </p>
                        </div>

                        {/* Map Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#4EDAE4] mb-4">
                                Location Map
                            </h2>
                            <iframe
                                src={`https://www.google.com/maps?q=${tour.destination.city},${tour.destination.country}&z=15&output=embed`}
                                className="w-full h-[250px] md:h-[400px] rounded-lg"
                                frameBorder="0"
                                allowFullScreen
                                title="Tour location map"
                            />
                        </div>
                    </div>
                )}

                {/* Gallery Tab */}
                {activeTab === "gallery" && (
                    <div className="p-4 max-w-screen-xl mx-auto grid gap-4 items-center justify-center">
                        {/* First Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <img
                                className="col-span-1 md:col-span-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full aspect-[16/9] object-cover"
                                src={tour.IMG1}
                                alt="Bali Image 1"
                            />
                            <div className="grid grid-rows-2 gap-4">
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
    <div className="p-6 max-w-4xl mx-auto">
      
        {tour.reviews && tour.reviews.length > 0 ? (
            <div className="space-y-8">
                {tour.reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                    >
                        {/* User Info */}
                        <div className="flex items-start gap-4 mb-4">
                            <img
                                src={review.user.avatar}
                                alt={review.user.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-[#4EDAE4]"
                            />
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">
                                    {review.user.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {review.user.location} • {review.user.traveler_type}
                                </p>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-6 h-6 ${
                                        i < review.rating
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
                        <h4 className="font-semibold text-xl text-gray-800 mb-2">
                            {review.title}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            {review.review_text}
                        </p>

                        {/* Photos */}
                        {review.photos && review.photos.length > 0 && (
                            <div className="flex gap-4 mb-4 overflow-x-auto">
                                {review.photos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt={`Review by ${review.user.name}`}
                                        className="w-24 h-24 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                    />
                                ))}
                            </div>
                        )}

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span>
                                {new Date(review.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                            {review.verified_booking && (
                                <span className="flex items-center gap-1 text-green-600">
                                    <CheckCircle className="w-4 h-4" />
                                    Verified Booking
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <ThumbsUp className="w-4 h-4" />
                                {review.helpful_count} helpful
                            </span>
                        </div>

                        {/* Host Response */}
                        {review.response && (
                            <div className="mt-4 pl-4 border-l-4 border-[#4EDAE4]">
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Response: </span>
                                    {review.response.text}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-500">No reviews available.</p>
        )}
    </div>
)}
            </div>

            {/* Booking Section */}
            <div className="text-center my-8">
                <Link to="/tour-booking">
                    <button className="bg-[#4EDAE4] text-white px-6 py-3 rounded-lg text-lg md:text-xl font-bold hover:bg-[#3cb8c6] transition-all">
                        Book Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TourDetails;