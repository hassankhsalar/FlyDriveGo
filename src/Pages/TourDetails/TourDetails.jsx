import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Hourglass, User, MapPin,CheckCircle, XCircle } from "lucide-react";
import { Slider } from '@mui/material';

const TourDetails = () => {
    const { title } = useParams();
    const [tour, setTour] = useState(null);
    const [activeTab, setActiveTab] = useState("information");
    const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

    useEffect(() => {
        fetch("/tourPackages.json")
            .then((res) => res.json())
            .then((data) => {
                const foundTour = data.find((item) => item.title === title);
                setTour(foundTour);
            })
            .catch((error) => console.log("Error fetching data:", error));
    }, [title]);

    if (!tour) return <p className="text-center text-lg font-semibold mt-10">Loading tour details...</p>;

    return (
        <div className="w-full mx-auto bg-SmokeWhite font-red-rose">
            {/* Hero Section */}
            <div className="relative">
                <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 py-6">
                    <h1 className="text-white text-2xl md:text-4xl font-bold">{tour.title}</h1>
                    <p className="text-lg md:text-xl font-semibold text-[#4EDAE4] mt-2">
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
                            className={`px-4 md:px-6 py-2 text-base md:text-lg font-semibold cursor-pointer transition-all duration-300 ${activeTab === tab
                                ? "text-[#4EDAE4] border-b-4 border-[#4EDAE4]"
                                : "text-gray-600 hover:text-[#4EDAE4]"}`}
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
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#4EDAE4] ">{tour.title2}</h2>
                        <p className="text-red-600 font-extralight">Been there recently?</p>
                        <p className="text-lg">{tour.overview}</p>

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
                                <div className="border-b border-gray-300 py-3">Dhaka,BAngladesh</div>

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
                                <div className="grid grid-cols-2 gap-3 mt-2">
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
                                <div className="grid grid-cols-2 gap-3 mt-2">
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

                {/* Other Tabs (Tour Plan, Location, Gallery, Reviews) */}
                {activeTab === "tourPlan" && tour.tourPlan && (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#4EDAE4] mb-4">Tour Plan</h2>
                        {tour.tourPlan.map((day, index) => (
                            <div key={index} className="border p-4 mb-3 rounded-lg shadow-md">
                                <h3 className="text-lg md:text-xl font-semibold">Day {day.day}: {day.title}</h3>
                                <p>{day.description}</p>
                                {day.photo && <img src={day.photo} alt={day.title} className="w-full h-40 object-cover rounded-lg mt-2" />}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "location" && tour.location && (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#4EDAE4] mb-4">Location</h2>
                        <p className="text-lg">{tour.location.description}</p>
                        <iframe
                            src={`https://www.google.com/maps?q=${tour.location.latitude},${tour.location.longitude}&z=15&output=embed`}
                            className="w-full h-[250px] md:h-[300px] mt-4 rounded-lg"
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>
                )}

                {activeTab === "gallery" && tour.gallery && (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#4EDAE4] mb-4">Gallery</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {tour.gallery.map((image, index) => (
                                <img key={index} src={image} alt="Gallery" className="w-full h-32 md:h-40 object-cover rounded-lg" />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Booking Section */}
            <div className="text-center my-8">
                <Link to="/tour-booking">
                <button className="bg-[#4EDAE4] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-lg md:text-xl font-bold hover:bg-[#3cb8c6] transition-all">
                    Book Now
                </button>
                </Link>
            </div>
        </div>
    );
};

export default TourDetails;