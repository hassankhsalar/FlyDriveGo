import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch, FaMapMarkerAlt, FaRegClock, FaStar, FaWifi, FaPlug,
  FaSnowflake, FaArrowLeft, FaFilter, FaCalendarAlt, FaAngleDown, FaCheck
} from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const ByBus = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [busOptions, setBusOptions] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBookNow = (bus, selectedDate) => {
    // Navigate to seat plan with bus details
    const dateStr = selectedDate ? selectedDate : "Today";

    navigate(`/transportation/seat-plan/${bus.id || bus._id}`, {
      state: {
        busData: bus,
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
        if (activeFilter !== 'all') params.append('category', activeFilter);

        // Fetch both bus options and testimonials in parallel
        const [busResponse, testimonialsResponse] = await Promise.all([
          axiosPublic.get(`/buses?${params.toString()}`),
          axiosPublic.get('/transportation-bus-testimonials')
        ]);

        setBusOptions(busResponse.data);
        setTestimonials(testimonialsResponse.data);
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

  const filteredBuses = busOptions
    .filter(bus => activeFilter === 'all' || bus.category === activeFilter)
    .filter(bus =>
      searchTerm === '' ||
      bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const renderRatingStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar key={i} className={`inline ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}`} />
    ));
  };

  // If data is loading, show loading indicator
  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If there's an error, show error message
  if (error) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
          <button
            className="mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
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
                  Road Transportation Options
                </h1>
                <p
                  className="text-gray-600 mt-3 max-w-2xl opacity-0 translate-y-2 animate-fadeSlideUp delay-300"
                >
                  Travel comfortably with our premium bus services connecting major cities across the country with reliable schedules and excellent amenities.
                </p>
              </div>
              <div
                className="mt-6 md:mt-0 flex-shrink-0 opacity-0 scale-90 animate-scaleIn delay-400"
              >
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="Search routes, cities, or services"
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
              {["all", "luxury", "express", "standard"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${activeFilter === filter ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {filter === "all" ? "All Services" :
                    filter === "luxury" ? "Luxury Coaches" :
                      filter === "express" ? "Express Services" : "Standard Routes"}
                </button>
              ))}

              <button
                className="px-5 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 inline-flex items-center transition-all duration-300 transform hover:scale-105 active:scale-95"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter className="mr-2" /> More Filters
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
                    {['WiFi', 'AC', 'Snacks', 'Sleeper'].map((feature) => (
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
                    max="100"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>$0</span>
                    <span>$100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Deal */}
      <div
        className="mb-12 bg-gradient-to-r from-blue-500 to-primary rounded-xl overflow-hidden shadow-lg h-96 transform translate-y-8 opacity-0 animate-fadeSlideUp delay-300 transition-all duration-500 hover:scale-102 hover:shadow-xl"
      >
        <div className="md:flex">
          <div className="md:w-1/2 h-54 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1626448167527-33aec453f913?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="VIP Coach"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
          <div className="p-6 md:p-10 md:w-1/2 flex flex-col justify-center">
            <div
              className="inline-block px-3 py-1 bg-white text-primary text-xs font-semibold rounded-full mb-4 transform -translate-x-4 opacity-0 animate-slideInRight delay-600"
            >
              FEATURED SERVICE
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-3 transform translate-y-4 opacity-0 animate-fadeSlideUp delay-700"
            >
              VIP Weekend Service
            </h2>
            <p
              className="text-blue-100 mb-6 transform translate-y-4 opacity-0 animate-fadeSlideUp delay-800"
            >
              Premium weekend trips to popular destinations with luxury amenities, refreshments, and priority boarding.
            </p>
            <div
              className="flex flex-wrap gap-4 mb-6 transform translate-y-4 opacity-0 animate-fadeSlideUp delay-900"
            >
              <span
                className="inline-flex items-center bg-blue-600 bg-opacity-30 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 hover:bg-opacity-50"
              >
                <FaWifi className="mr-2" /> Free WiFi
              </span>
              <span
                className="inline-flex items-center bg-blue-600 bg-opacity-30 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 hover:bg-opacity-50"
              >
                <FaPlug className="mr-2" /> Power Outlets
              </span>
              <span
                className="inline-flex items-center bg-blue-600 bg-opacity-30 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 hover:bg-opacity-50"
              >
                <FaSnowflake className="mr-2" /> Climate Control
              </span>
            </div>
            <button
              className="mt-auto bg-white text-primary hover:bg-blue-50 transition-all duration-300 font-medium py-3 px-6 rounded-lg inline-flex items-center transform translate-y-4 opacity-0 animate-fadeSlideUp delay-1000 hover:scale-105 active:scale-98"
            >
              Book Now - 25% Off
            </button>
          </div>
        </div>
      </div>

      {/* Bus Listings */}
      <div className="mb-12">
        <div
          key={activeFilter} // This forces re-render when filter changes
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 opacity-0 animate-fadeIn delay-500"
        >
          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus, index) => (
              <div
                key={bus.id || bus._id || `bus-${index}`}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 group transform translate-y-8 opacity-0 hover:-translate-y-2 hover:shadow-xl animate-fadeSlideUp`}
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={bus.image}
                    alt={bus.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{bus.route}</span>
                      <span
                        className="bg-primary text-white px-2 py-1 rounded text-sm transition-transform duration-300 hover:scale-110"
                      >
                        ${bus.price}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3
                      className="font-bold text-xl text-CharcoleDark transition-transform duration-300 hover:translate-x-1"
                    >
                      {bus.name}
                    </h3>
                    <div className="flex items-center">
                      {renderRatingStars(bus.rating)}
                      <span className="ml-1 text-sm text-gray-600">({bus.rating})</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <FaRegClock className="mr-2 text-gray-400" />
                    <span>{bus.time}</span>
                    <span className="mx-2">•</span>
                    <span>{bus.duration}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                    <span>{bus.route}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {bus.features.map((feature, idx) => (
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
                      ${bus.price}
                    </span>
                    <button
                      className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                      onClick={() => handleBookNow(bus,
                        selectedDate !== null ?
                          [
                            { date: "Today", day: "Mon" },
                            { date: "Tomorrow", day: "Tue" },
                            { date: "Apr 11", day: "Wed" },
                            { date: "Apr 12", day: "Thu" },
                            { date: "Apr 13", day: "Fri" },
                            { date: "Apr 14", day: "Sat" },
                            { date: "Apr 15", day: "Sun" },
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
              <p className="text-gray-600 text-lg">No buses found matching your criteria.</p>
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
          className="text-2xl font-bold text-center text-CharcoleDark mb-8 transform translate-y-4 opacity-0 animate-fadeSlideUp delay-700"
        >
          What Our Travelers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 rounded-lg shadow-sm transform translate-y-4 opacity-0 animate-fadeSlideUp transition-all duration-500 hover:-translate-y-2 hover:shadow-md`}
                style={{ animationDelay: `${800 + (idx * 100)}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 transition-transform duration-300 hover:scale-110"
                  />
                  <div>
                    <h4 className="font-semibold text-CharcoleDark">{testimonial.name}</h4>
                    <div className="flex">
                      {Array(testimonial.rating || 5).fill(0).map((_, i) => (
                        <span
                          key={i}
                          className={`opacity-0 scale-0 animate-scaleIn`}
                          style={{ animationDelay: `${900 + (i * 100)}ms` }}
                        >
                          <FaStar className="text-yellow-500 text-sm" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p
                  className="text-gray-600 italic opacity-0 animate-fadeIn delay-1100"
                >
                  "{testimonial.text}"
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">No testimonials available at the moment.</p>
            </div>
          )}
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
              q: "How early should I arrive before departure?",
              a: "We recommend arriving at least 30 minutes before scheduled departure to allow time for check-in and boarding."
            },
            {
              q: "Can I cancel or change my booking?",
              a: "Yes, bookings can be changed or cancelled up to 24 hours before departure for a full refund or credit towards future travel."
            },
            {
              q: "Is there luggage storage available?",
              a: "Yes, all our buses have storage compartments for standard luggage. Each passenger is allowed one large bag and one carry-on."
            },
            {
              q: "Are there restrooms on the buses?",
              a: "All luxury and express coaches have onboard restrooms. Standard buses make regular comfort stops during longer journeys."
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
          <FaSearch className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ByBus;