import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBus, FaCalendarAlt, FaMapMarkerAlt, FaRegClock, FaEllipsisV, FaPrint, FaTimes, FaExchangeAlt, FaRegFilePdf, FaTicketAlt, FaChair } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const BookedBuses = () => {
    const [busBookings, setBusBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Mock data for demonstration
    const mockBusBookings = {
        upcoming: [
            {
                id: 'BUS-12345',
                busName: 'Luxury Express',
                busNumber: 'LE-789',
                from: 'New York',
                to: 'Washington DC',
                departureDate: '2023-12-08',
                departureTime: '09:30',
                arrivalDate: '2023-12-08',
                arrivalTime: '14:00',
                passengers: 1,
                seatNumbers: ['12A'],
                status: 'Confirmed',
                price: 45.50,
                features: ['WiFi', 'AC', 'Snacks'],
                image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: 'BUS-67890',
                busName: 'Mountain Cruiser',
                busNumber: 'MC-456',
                from: 'Boston',
                to: 'Philadelphia',
                departureDate: '2023-12-20',
                departureTime: '11:00',
                arrivalDate: '2023-12-20',
                arrivalTime: '15:30',
                passengers: 2,
                seatNumbers: ['5C', '5D'],
                status: 'Confirmed',
                price: 78.90,
                features: ['WiFi', 'AC', 'USB Outlets', 'Recliner Seats'],
                image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
            }
        ],
        completed: [
            {
                id: 'BUS-23456',
                busName: 'City Hopper',
                busNumber: 'CH-123',
                from: 'Chicago',
                to: 'Detroit',
                departureDate: '2023-11-05',
                departureTime: '13:45',
                arrivalDate: '2023-11-05',
                arrivalTime: '16:30',
                passengers: 1,
                seatNumbers: ['9B'],
                status: 'Completed',
                price: 38.25,
                features: ['WiFi', 'AC'],
                image: 'https://images.unsplash.com/photo-1593465678160-f99a130d74ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
            }
        ],
        cancelled: [
            {
                id: 'BUS-87654',
                busName: 'Sunset Tours',
                busNumber: 'ST-567',
                from: 'San Francisco',
                to: 'Los Angeles',
                departureDate: '2023-10-18',
                departureTime: '07:00',
                arrivalDate: '2023-10-18',
                arrivalTime: '13:15',
                passengers: 1,
                seatNumbers: ['15D'],
                status: 'Cancelled',
                refundAmount: 55.00,
                refundStatus: 'Processed',
                price: 55.00,
                features: ['WiFi', 'AC', 'Snacks', 'Entertainment'],
                image: 'https://images.unsplash.com/photo-1605187337030-f74486d53487?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
            }
        ]
    };

    useEffect(() => {
        const fetchBusBookings = async () => {
            try {
                // In a real implementation, you would fetch the actual bookings from your backend
                // const response = await axiosSecure.get(`/bookings/buses/${user.email}`);
                // setBusBookings(response.data);

                // For demo, we'll use mock data
                setTimeout(() => {
                    setBusBookings(mockBusBookings);
                    setLoading(false);
                }, 800); // Simulate loading delay
            } catch (error) {
                console.error('Error fetching bus bookings:', error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchBusBookings();
        }
    }, [user?.email, axiosSecure]);

    const handleActionClick = (index) => {
        if (actionMenuOpen === index) {
            setActionMenuOpen(null);
        } else {
            setActionMenuOpen(index);
        }
    };

    const handleCloseMenu = () => {
        setActionMenuOpen(null);
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const renderActionMenu = (index, booking) => {
        if (actionMenuOpen !== index) return null;

        return (
            <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <div className="py-1">
                    {activeTab === 'upcoming' && (
                        <>
                            <button
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={handleCloseMenu}
                            >
                                <FaExchangeAlt className="mr-2" /> Change Seats
                            </button>
                            <button
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={handleCloseMenu}
                            >
                                <FaTimes className="mr-2" /> Cancel Booking
                            </button>
                        </>
                    )}
                    <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={handleCloseMenu}
                    >
                        <FaPrint className="mr-2" /> Print Ticket
                    </button>
                    <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={handleCloseMenu}
                    >
                        <FaRegFilePdf className="mr-2" /> Download PDF
                    </button>
                </div>
            </div>
        );
    };

    const renderBusCard = (booking, index, type) => {
        return (
            <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm overflow-hidden mb-4 border-l-4 ${type === 'upcoming' ? 'border-blue-500' :
                        type === 'completed' ? 'border-green-500' : 'border-red-500'
                    }`}
            >
                <div className="flex flex-col md:flex-row">
                    {/* Bus Image */}
                    <div className="w-full md:w-1/4 h-48 md:h-auto relative">
                        <img
                            src={booking.image}
                            alt={booking.busName}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <div className="p-4 text-white">
                                <h3 className="font-bold text-lg">{booking.busName}</h3>
                                <p className="text-sm opacity-80">{booking.busNumber}</p>
                            </div>
                        </div>
                    </div>

                    {/* Bus Details */}
                    <div className="p-6 flex-1">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                                    <span className="font-medium">{booking.from}</span>
                                    <span className="mx-2">→</span>
                                    <span className="font-medium">{booking.to}</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <FaCalendarAlt className="text-blue-500 mr-2" />
                                    <span>{formatDate(booking.departureDate)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Journey Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Departure</p>
                                <div className="flex items-center">
                                    <FaRegClock className="text-blue-500 mr-2" />
                                    <span className="font-medium">{booking.departureTime}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Arrival</p>
                                <div className="flex items-center">
                                    <FaRegClock className="text-blue-500 mr-2" />
                                    <span className="font-medium">{booking.arrivalTime}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Seat(s)</p>
                                <div className="flex items-center">
                                    <FaChair className="text-blue-500 mr-2" />
                                    <span className="font-medium">{booking.seatNumbers.join(', ')}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Passengers</p>
                                <div className="flex items-center">
                                    <FaTicketAlt className="text-blue-500 mr-2" />
                                    <span className="font-medium">{booking.passengers}</span>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        {booking.features && booking.features.length > 0 && (
                            <div className="mb-4">
                                <p className="text-gray-500 text-sm mb-1">Amenities</p>
                                <div className="flex flex-wrap gap-2">
                                    {booking.features.map((feature, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                            <div>
                                <span className="text-gray-500 text-xs">Status</span>
                                <p className={`font-medium ${booking.status === 'Confirmed' ? 'text-green-600' :
                                        booking.status === 'Completed' ? 'text-blue-600' : 'text-red-600'
                                    }`}>
                                    {booking.status}
                                </p>
                                {booking.refundStatus && (
                                    <p className="text-sm text-green-600">
                                        Refund: {formatPrice(booking.refundAmount)} ({booking.refundStatus})
                                    </p>
                                )}
                            </div>
                            <div className="text-right">
                                <span className="text-gray-500 text-xs">Total Price</span>
                                <p className="font-semibold text-lg text-blue-600">{formatPrice(booking.price)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="py-8 px-4 md:px-8 lg:px-12 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">My Bus Bookings</h1>
                    <Link
                        to="/transportation/by-road"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center"
                    >
                        <FaBus className="mr-2" />
                        Book New Ticket
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'upcoming'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        Upcoming
                        {busBookings?.upcoming?.length > 0 && (
                            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {busBookings.upcoming.length}
                            </span>
                        )}
                    </button>
                    <button
                        className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'completed'
                                ? 'text-green-600 border-b-2 border-green-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('completed')}
                    >
                        Completed
                        {busBookings?.completed?.length > 0 && (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {busBookings.completed.length}
                            </span>
                        )}
                    </button>
                    <button
                        className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'cancelled'
                                ? 'text-red-600 border-b-2 border-red-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('cancelled')}
                    >
                        Cancelled
                        {busBookings?.cancelled?.length > 0 && (
                            <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {busBookings.cancelled.length}
                            </span>
                        )}
                    </button>
                </div>

                {/* Bus Booking Cards */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <>
                        {activeTab === 'upcoming' && (
                            <>
                                {busBookings.upcoming && busBookings.upcoming.length > 0 ? (
                                    busBookings.upcoming.map((booking, index) => renderBusCard(booking, index, 'upcoming'))
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                        <FaBus className="mx-auto text-gray-300 text-5xl mb-4" />
                                        <h3 className="text-xl font-medium text-gray-700 mb-2">No Upcoming Bus Bookings</h3>
                                        <p className="text-gray-500 mb-6">You don't have any upcoming bus tickets.</p>
                                        <Link
                                            to="/transportation/by-road"
                                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-300 inline-flex items-center"
                                        >
                                            Book a Bus Ticket
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'completed' && (
                            <>
                                {busBookings.completed && busBookings.completed.length > 0 ? (
                                    busBookings.completed.map((booking, index) => renderBusCard(booking, index, 'completed'))
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                        <FaBus className="mx-auto text-gray-300 text-5xl mb-4" />
                                        <h3 className="text-xl font-medium text-gray-700 mb-2">No Completed Bus Bookings</h3>
                                        <p className="text-gray-500">You don't have any completed bus journeys.</p>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'cancelled' && (
                            <>
                                {busBookings.cancelled && busBookings.cancelled.length > 0 ? (
                                    busBookings.cancelled.map((booking, index) => renderBusCard(booking, index, 'cancelled'))
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                        <FaBus className="mx-auto text-gray-300 text-5xl mb-4" />
                                        <h3 className="text-xl font-medium text-gray-700 mb-2">No Cancelled Bus Bookings</h3>
                                        <p className="text-gray-500">You don't have any cancelled bus bookings.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BookedBuses;