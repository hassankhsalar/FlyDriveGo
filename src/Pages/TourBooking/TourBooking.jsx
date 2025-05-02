import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle, XCircle, MapPin, Hourglass, User } from "lucide-react";

const TourBooking = () => {
  const { state } = useLocation(); // Get tour data passed from TourDetails
  const tour = state?.tour || null; // Fallback to null if no tour data
  console.log(tour);
  // State for booking form
  const [travelers, setTravelers] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Handle form input changes
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate total cost
  const totalCost = tour ? tour.price.per_person * travelers : 0;

  // Loading state if no tour data
  if (!tour) {
    return (
      <p className="text-center text-lg font-semibold mt-10">
        No tour data available.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6 font-red-rose bg-white">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4EDAE4] text-center mb-6 sm:mb-8">
        Book Your {tour.title} Tour
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column: Booking Form */}
        <div className="md:col-span-2 bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-5">
            Booking Details
          </h2>

          <form className="space-y-4 sm:space-y-5">
            {/* Contact Information */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactInfo.name}
                    onChange={handleContactChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4EDAE4] focus:ring-[#4EDAE4] text-xs sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleContactChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4EDAE4] focus:ring-[#4EDAE4] text-xs sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleContactChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4EDAE4] focus:ring-[#4EDAE4] text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">
                Booking Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4EDAE4] focus:ring-[#4EDAE4] text-xs sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4EDAE4] focus:ring-[#4EDAE4] text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                Special Requests
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4EDAE4] focus:ring-[#4EDAE4] text-xs sm:text-sm"
                rows="4"
                placeholder="E.g., dietary requirements, accessibility needs"
              />
            </div>
          </form>
        </div>

        {/* Right Column: Booking Summary */}
        <div className="md:col-span-1 bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-5">
            Booking Summary
          </h2>

          {/* Tour Image */}
          <img
            src={tour.banner_img}
            alt={tour.title}
            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg mb-4"
          />

          {/* Tour Details */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base font-semibold text-gray-800">
              {tour.title}
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-[#4EDAE4]" />
              <span>
                {tour.destination.city}, {tour.destination.country}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Hourglass className="w-4 h-4 text-[#4EDAE4]" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <User className="w-4 h-4 text-[#4EDAE4]" />
              <span>{travelers} Traveler(s)</span>
            </div>
            <p className="text-sm sm:text-base">
              <span className="font-semibold">Price per Person:</span>{" "}
              {tour.price.currency} {tour.price.per_person.toLocaleString()}
            </p>
            <p className="text-sm sm:text-base">
              <span className="font-semibold">Total Cost:</span>{" "}
              {tour.price.currency} {totalCost.toLocaleString()}
            </p>
          </div>

          {/* Included/Excluded */}
          <div className="mt-4 sm:mt-5">
            <h3 className="text-sm sm:text-base font-semibold mb-2">
              Included
            </h3>
            <ul className="space-y-1 text-xs sm:text-sm">
              {tour.inclusions?.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 w-3 h-3 sm:w-4 sm:h-4" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 sm:mt-5">
            <h3 className="text-sm sm:text-base font-semibold mb-2">
              Not Included
            </h3>
            <ul className="space-y-1 text-xs sm:text-sm">
              {tour.exclusions?.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <XCircle className="text-red-500 w-3 h-3 sm:w-4 sm:h-4" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Continue to Payment Button */}
          <div className="mt-6 sm:mt-8">
            <Link
              to="/payment"
              state={{ tour, travelers, totalCost, contactInfo, travelDate }}
            >
              <button className="w-full bg-[#4EDAE4] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm sm:text-base font-bold hover:bg-[#3cb8c6] transition-all">
                Continue to Payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourBooking;
