import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSearch, FaMapMarkerAlt, FaRegClock, FaStar, FaWifi, FaPlug,
  FaSnowflake, FaArrowLeft, FaFilter, FaCalendarAlt, FaAngleDown, FaCheck,
  FaPlane, FaTicketAlt, FaUtensils, FaBed
} from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { motion } from 'framer-motion';

const ByAir = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [flightOptions, setFlightOptions] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [airlinesList, setAirlinesList] = useState([]);

  const handleBookNow = (flight, selectedDate) => {
    // Navigate to seat plan with flight details
    const dateStr = selectedDate ? selectedDate : "Today";

    navigate(`/transportation/flight-seat-plan/${flight.id || flight._id}`, {
      state: {
        flightData: flight,
        date: dateStr
      }
    });
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Build query parameters based on filters
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (activeFilter !== 'all') params.append('type', activeFilter);

        // Fetch both flight options and testimonials in parallel
        const [flightResponse, testimonialsResponse, airlinesResponse] = await Promise.all([
          axiosPublic.get(`/flights?${params.toString()}`),
          axiosPublic.get('/flight-testimonials'),
          axiosPublic.get('/airlines')
        ]);

        setFlightOptions(flightResponse.data);
        setTestimonials(testimonialsResponse.data);
        setAirlinesList(airlinesResponse.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosPublic, activeFilter, searchTerm]);

  const filteredFlights = flightOptions
    .filter(flight => activeFilter === 'all' || flight.type === activeFilter)
    .filter(flight =>
      searchTerm === '' ||
      flight.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.airline?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const renderRatingStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar key={i} className={`inline ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}`} />
    ));
  };

  // If data is loading, show loading indicator
  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="animate-spin inline-block w-10 h-10 border-4 border-current border-t-transparent text-primary rounded-full mb-4" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-lg text-gray-600">Loading flight options...</p>
      </div>
    );
  }

  // If there's an error, show error message
  if (error) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="text-red-500 text-lg mb-4">
          <span className="inline-block mr-2">⚠️</span>
          {error}
        </div>
        <button
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto py-12 px-4 font-red-rose opacity-0 animate-fadeIn"
    >
      {/* Header Section */}
      <div
        className="relative mb-14 transform translate-y-4 opacity-0 animate-slideInUp"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-primary opacity-10 rounded-xl"></div>
        <div className="relative bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div
                  className="transition-transform duration-300 hover:-translate-x-1"
                >
                  <Link to="/transportation" className="inline-flex items-center text-primary hover:text-primary-dark mb-4 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Transportation Hub
                  </Link>
                </div>
                <h1
                  className="text-3xl md:text-4xl font-bold text-CharcoleDark opacity-0 translate-y-2 animate-fadeSlideUp delay-200"
                >
                  Air Transportation Options
                </h1>
                <p
                  className="text-gray-600 mt-3 max-w-2xl opacity-0 translate-y-2 animate-fadeSlideUp delay-300"
                >
                  Fly with comfort and convenience on our carefully selected domestic and international flights with premium amenities and excellent service.
                </p>
              </div>
              <div
                className="mt-6 md:mt-0 flex-shrink-0 opacity-0 scale-90 animate-scaleIn delay-400"
              >
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="Search routes, airlines, or flight numbers"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div
              className="mt-8 flex flex-wrap gap-3 opacity-0 translate-y-4 animate-fadeSlideUp delay-500"
            >
              {["all", "domestic", "international"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${activeFilter === filter
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            {/* Calendar Date Picker */}
            <div
              className="mt-6 flex flex-wrap gap-3 opacity-0 translate-y-4 animate-fadeSlideUp delay-600"
            >
              {["Today", "Tomorrow", "May 3", "May 4", "May 5", "May 6", "May 7"].map((day, idx) => (
                <button
                  key={day}
                  className={`px-4 py-2 flex flex-col items-center rounded-lg transition-all duration-300 transform hover:scale-105 ${selectedDate === idx
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
                    }`}
                  onClick={() => setSelectedDate(idx)}
                >
                  <span className="text-xs opacity-75">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx]}</span>
                  <span className="font-medium">{day}</span>
                </button>
              ))}
            </div>

            {/* Advanced Filters Toggle */}
            <div
              className="mt-6 flex justify-end opacity-0 translate-y-4 animate-fadeSlideUp delay-700"
            >
              <button
                className="flex items-center text-primary hover:text-primary-dark transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter className="mr-2" />
                Advanced Filters
                <FaAngleDown className={`ml-2 transform transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Advanced Filters */}
            <div
              className={`mt-6 bg-gray-50 rounded-lg p-4 overflow-hidden transition-all duration-300 origin-top ${showFilters
                ? 'opacity-100 max-h-96'
                : 'opacity-0 max-h-0'
                }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                  <div className="flex flex-wrap gap-2">
                    {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
                      <button
                        key={time}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs hover:border-primary hover:text-primary transition-all duration-300 transform hover:scale-105 active:scale-95"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                  <div className="flex flex-wrap gap-2">
                    {['WiFi', 'Premium Meals', 'Lie-flat Beds', 'Power Outlets'].map((feature) => (
                      <button
                        key={feature}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs hover:border-primary hover:text-primary transition-all duration-300 transform hover:scale-105 active:scale-95"
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>$0</span>
                    <span>$1000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Deal */}
      <div
        className="mb-12 bg-gradient-to-r from-indigo-500 to-primary rounded-xl overflow-hidden shadow-lg h-96 transform translate-y-8 opacity-0 animate-fadeSlideUp delay-300 transition-all duration-500 hover:scale-102 hover:shadow-xl"
      >
        <div className="md:flex">
          <div className="md:w-1/2 h-54 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1518783211485-10fd3bfb2ce2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="First Class Cabin"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
          <div className="p-6 md:p-10 md:w-1/2 flex flex-col justify-center">
            <div
              className="inline-block px-3 py-1 bg-white text-primary text-xs font-semibold rounded-full mb-4 transform -translate-x-4 opacity-0 animate-slideInRight delay-600"
            >
              FEATURED FLIGHT
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-3 transform translate-y-4 opacity-0 animate-fadeSlideUp delay-700"
            >
              First Class Experience
            </h2>
            <p
              className="text-blue-100 mb-6 transform translate-y-4 opacity-0 animate-fadeSlideUp delay-800"
            >
              Indulge in luxury on our premier international routes with lie-flat beds, exclusive dining, and personalized service.
            </p>
            <div
              className="flex flex-wrap gap-4 mb-6 transform translate-y-4 opacity-0 animate-fadeSlideUp delay-900"
            >
              <span
                className="inline-flex items-center bg-blue-600 bg-opacity-30 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 hover:bg-opacity-50"
              >
                <FaBed className="mr-2" /> Lie-flat Beds
              </span>
              <span
                className="inline-flex items-center bg-blue-600 bg-opacity-30 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 hover:bg-opacity-50"
              >
                <FaUtensils className="mr-2" /> Premium Dining
              </span>
              <span
                className="inline-flex items-center bg-blue-600 bg-opacity-30 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 hover:bg-opacity-50"
              >
                <FaWifi className="mr-2" /> Free WiFi
              </span>
              <span
                className="inline-flex items-center bg-blue-600 bg-opacity-30 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 hover:bg-opacity-50"
              >
                <FaTicketAlt className="mr-2" /> Priority Boarding
              </span>
            </div>
            <button
              className="mt-auto bg-white text-primary hover:bg-blue-50 transition-all duration-300 font-medium py-3 px-6 rounded-lg inline-flex items-center transform translate-y-4 opacity-0 animate-fadeSlideUp delay-1000 hover:scale-105 active:scale-98"
            >
              Book First Class - 15% Off
            </button>
          </div>
        </div>
      </div>

      {/* Flight Listings */}
      <div className="mb-12">
        <div
          key={activeFilter} // This forces re-render when filter changes
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 opacity-0 animate-fadeIn delay-500"
        >
          {filteredFlights.length > 0 ? (
            filteredFlights.map((flight, index) => (
              <div
                key={flight.id || flight._id || `flight-${index}`}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 group transform translate-y-8 opacity-0 hover:-translate-y-2 hover:shadow-xl animate-fadeSlideUp`}
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={flight.image}
                    alt={flight.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-lg font-bold">{flight.airline}</span>
                      <span className="bg-primary text-white px-2 py-1 rounded-lg text-sm">
                        {flight.type.charAt(0).toUpperCase() + flight.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-CharcoleDark mb-1 transition-colors duration-300 group-hover:text-primary">
                    {flight.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="text-yellow-500 mr-1">
                      {renderRatingStars(flight.rating)}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="ml-1">({flight.rating})</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <FaRegClock className="mr-2 text-gray-400" />
                    <span>{flight.departureTime}</span>
                    <span className="mx-2">•</span>
                    <span>{flight.duration}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                    <span>{flight.route}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {flight.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className="font-bold text-lg text-primary transition-transform duration-300 hover:scale-110"
                    >
                      ${flight.price}
                    </span>
                    <button
                      className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                      onClick={() => handleBookNow(flight,
                        selectedDate !== null ?
                          [
                            { date: "Today", day: "Mon" },
                            { date: "Tomorrow", day: "Tue" },
                            { date: "May 3", day: "Wed" },
                            { date: "May 4", day: "Thu" },
                            { date: "May 5", day: "Fri" },
                            { date: "May 6", day: "Sat" },
                            { date: "May 7", day: "Sun" },
                          ][selectedDate].date : "Today"
                      )}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className="col-span-3 py-16 text-center transition-opacity duration-500 opacity-0 animate-fadeIn"
            >
              <p className="text-gray-600 text-lg">No flights found matching your criteria.</p>
              <button
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchTerm('');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        className="mb-12 bg-gray-50 rounded-xl p-8 transform translate-y-6 opacity-0 animate-fadeSlideUp delay-600"
      >
        <h2
          className="text-2xl font-bold text-center text-CharcoleDark mb-12 transform translate-y-4 opacity-0 animate-fadeSlideUp delay-700"
        >
          What Our Travelers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md transform translate-y-4 opacity-0 animate-fadeSlideUp transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              style={{ animationDelay: `${700 + idx * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                  <div className="text-yellow-500">
                    {Array(5).fill(0).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`inline ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div
        className="bg-white rounded-xl shadow-md p-8 transform translate-y-6 opacity-0 animate-fadeSlideUp delay-800"
      >
        <h2
          className="text-2xl font-bold text-center text-CharcoleDark mb-6 transform translate-y-4 opacity-0 animate-fadeSlideUp delay-900"
        >
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "What is your baggage allowance policy?",
              a: "Economy passengers are allowed one carry-on bag (max 7kg) and one checked bag (max 23kg). Business and First Class passengers are allowed one carry-on bag (max 7kg) and two checked bags (max 32kg each)."
            },
            {
              q: "How early should I arrive at the airport?",
              a: "For domestic flights, we recommend arriving 2 hours before departure. For international flights, please arrive 3 hours before departure to allow time for check-in and security procedures."
            },
            {
              q: "Can I select my seat in advance?",
              a: "Yes, you can select your seat during the booking process or later through our 'Manage Booking' section. Some premium seats may incur an additional fee depending on your fare type."
            },
            {
              q: "What meals are served on flights?",
              a: "Complimentary meals are provided on all international flights and domestic flights over 2 hours. Special dietary requirements can be requested at least 48 hours before departure."
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className={`border-b border-gray-100 pb-4 transform translate-y-4 opacity-0 animate-fadeSlideUp transition-transform duration-300 hover:translate-x-1`}
              style={{ animationDelay: `${1000 + (idx * 100)}ms` }}
            >
              <h4
                className="font-semibold text-CharcoleDark mb-2 transition-colors duration-300 hover:text-blue-500"
              >
                {faq.q}
              </h4>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div
        className="fixed bottom-6 right-6 opacity-0 scale-0 animate-scaleIn delay-1500"
      >
        <button
          className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-90"
        >
          <FaPlane className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ByAir;