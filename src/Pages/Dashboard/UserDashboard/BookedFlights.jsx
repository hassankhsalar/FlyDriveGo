import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlane, FaCalendarAlt, FaMapMarkerAlt, FaRegClock, FaEllipsisV, FaTimes, FaExchangeAlt, FaTicketAlt, FaChair } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const BookedFlights = () => {
    const [flightBookings, setFlightBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Mock data for demonstration
    const mockFlightBookings = {
        upcoming: [
            {
                id: 'FLT-12345',
                flightNumber: 'BA-456',
                airline: 'British Airways',
                from: 'London',
                to: 'New York',
                departureDate: '2023-12-15',
                departureTime: '10:30',
                arrivalDate: '2023-12-15',
                arrivalTime: '13:45',
                passengers: 1,
                seatNumbers: ['15B'],
                cabin: 'Economy',
                status: 'Confirmed',
                price: 650.75,
                boardingGate: 'B12',
                terminal: 'Terminal 5',
                image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWlycGxhbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: 'FLT-67890',
                flightNumber: 'EK-317',
                airline: 'Emirates',
                from: 'Dubai',
                to: 'Singapore',
                departureDate: '2023-12-28',
                departureTime: '23:15',
                arrivalDate: '2023-12-29',
                arrivalTime: '11:05',
                passengers: 2,
                seatNumbers: ['3A', '3B'],
                cabin: 'Business',
                status: 'Confirmed',
                price: 3250.50,
                boardingGate: 'A7',
                terminal: 'Terminal 3',
                layovers: [
                    {
                        airport: 'Mumbai',
                        duration: '1h 30m'
                    }
                ],
                image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFpcnBsYW5lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
            }
        ],
        completed: [
            {
                id: 'FLT-23456',
                flightNumber: 'SQ-321',
                airline: 'Singapore Airlines',
                from: 'Singapore',
                to: 'Tokyo',
                departureDate: '2023-11-10',
                departureTime: '08:45',
                arrivalDate: '2023-11-10',
                arrivalTime: '16:30',
                passengers: 1,
                seatNumbers: ['12F'],
                cabin: 'Premium Economy',
                status: 'Completed',
                price: 1200.00,
                boardingGate: 'C15',
                terminal: 'Terminal 2',
                image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFpcnBsYW5lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
            }
        ],
        cancelled: [
            {
                id: 'FLT-87654',
                flightNumber: 'UA-789',
                airline: 'United Airlines',
                from: 'Chicago',
                to: 'San Francisco',
                departureDate: '2023-10-22',
                departureTime: '14:20',
                arrivalDate: '2023-10-22',
                arrivalTime: '17:05',
                passengers: 1,
                seatNumbers: ['21A'],
                cabin: 'Economy',
                status: 'Cancelled',
                refundAmount: 425.50,
                refundStatus: 'Processed',
                price: 425.50,
                cancellationReason: 'Weather conditions',
                image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycGxhbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
            }
        ]
    };

    useEffect(() => {
        const fetchFlightBookings = async () => {
            try {
                // In a real implementation, you would fetch the actual bookings from your backend
                // const response = await axiosSecure.get(`/bookings/flights/${user.email}`);
                // setFlightBookings(response.data);

                // For demo, we'll use mock data
                setTimeout(() => {
                    setFlightBookings(mockFlightBookings);
                    setLoading(false);
                }, 800); // Simulate loading delay
            } catch (error) {
                console.error('Error fetching flight bookings:', error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchFlightBookings();
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
                </div>
            </div>
        );
    };

    const getCabinClass = (cabin) => {
        switch (cabin.toLowerCase()) {
            case 'business':
                return 'bg-indigo-100 text-indigo-800';
            case 'first':
                return 'bg-blue-100 text-blue-800';
            case 'premium economy':
                return 'bg-teal-100 text-teal-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const renderFlightCard = (booking, index, type) => {
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
                    {/* Flight Image */}
                    <div className="w-full md:w-1/4 h-48 md:h-auto relative">
                        <img
                            src={booking.image}
                            alt={booking.airline}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <div className="p-4 text-white">
                                <h3 className="font-bold text-lg">{booking.airline}</h3>
                                <p className="text-sm opacity-80">{booking.flightNumber}</p>
                            </div>
                        </div>
                    </div>

                    {/* Flight Details */}
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
                                    <span className="ml-2 text-sm text-gray-500">{booking.terminal}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Arrival</p>
                                <div className="flex items-center">
                                    <FaRegClock className="text-blue-500 mr-2" />
                                    <span className="font-medium">{booking.arrivalTime}</span>
                                    {booking.arrivalTerminal && (
                                        <span className="ml-2 text-sm text-gray-500">{booking.arrivalTerminal}</span>
                                    )}
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
                                <p className="text-gray-500 text-sm mb-1">Class</p>
                                <div className="flex items-center">
                                    <FaTicketAlt className="text-blue-500 mr-2" />
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCabinClass(booking.cabin)}`}>
                                        {booking.cabin}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="mb-4">
                            {booking.boardingGate && (
                                <div className="inline-block mr-4">
                                    <p className="text-gray-500 text-sm">Gate</p>
                                    <span className="font-medium">{booking.boardingGate}</span>
                                </div>
                            )}
                            {booking.passengers && (
                                <div className="inline-block mr-4">
                                    <p className="text-gray-500 text-sm">Passengers</p>
                                    <span className="font-medium">{booking.passengers}</span>
                                </div>
                            )}
                        </div>

                        {/* Layovers */}
                        {booking.layovers && booking.layovers.length > 0 && (
                            <div className="mb-4 bg-gray-50 p-3 rounded-md">
                                <p className="text-gray-700 text-sm font-medium mb-2">Layovers:</p>
                                {booking.layovers.map((layover, idx) => (
                                    <div key={idx} className="flex items-center mb-1 last:mb-0">
                                        <span className="mr-2 h-2 w-2 bg-blue-500 rounded-full"></span>
                                        <span>{layover.airport} ({layover.duration})</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Cancellation Reason */}
                        {booking.cancellationReason && (
                            <div className="mb-4 bg-red-50 p-3 rounded-md">
                                <p className="text-red-700 text-sm font-medium">Cancellation Reason:</p>
                                <p className="text-red-600">{booking.cancellationReason}</p>
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
                    <h1 className="text-2xl font-bold text-gray-800">My Flight Bookings</h1>
                    <Link
                        to="/transportation/by-air"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center"
                    >
                        <FaPlane className="mr-2" />
                        Book New Flight
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
                        {flightBookings?.upcoming?.length > 0 && (
                            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {flightBookings.upcoming.length}
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
                        {flightBookings?.completed?.length > 0 && (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {flightBookings.completed.length}
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
                        {flightBookings?.cancelled?.length > 0 && (
                            <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {flightBookings.cancelled.length}
                            </span>
                        )}
                    </button>
                </div>

                {/* Flight Booking Cards */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        {activeTab === 'upcoming' && (
                            <>
                                {flightBookings.upcoming && flightBookings.upcoming.length > 0 ? (
                                    flightBookings.upcoming.map((booking, index) => renderFlightCard(booking, index, 'upcoming'))
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                        <FaPlane className="mx-auto text-gray-300 text-5xl mb-4" />
                                        <h3 className="text-xl font-medium text-gray-700 mb-2">No Upcoming Flight Bookings</h3>
                                        <p className="text-gray-500 mb-6">You don't have any upcoming flight tickets.</p>
                                        <Link
                                            to="/transportation/by-air"
                                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300 inline-flex items-center"
                                        >
                                            Book a Flight
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'completed' && (
                            <>
                                {flightBookings.completed && flightBookings.completed.length > 0 ? (
                                    flightBookings.completed.map((booking, index) => renderFlightCard(booking, index, 'completed'))
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                        <FaPlane className="mx-auto text-gray-300 text-5xl mb-4" />
                                        <h3 className="text-xl font-medium text-gray-700 mb-2">No Completed Flight Bookings</h3>
                                        <p className="text-gray-500">You don't have any completed flight journeys.</p>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'cancelled' && (
                            <>
                                {flightBookings.cancelled && flightBookings.cancelled.length > 0 ? (
                                    flightBookings.cancelled.map((booking, index) => renderFlightCard(booking, index, 'cancelled'))
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                        <FaPlane className="mx-auto text-gray-300 text-5xl mb-4" />
                                        <h3 className="text-xl font-medium text-gray-700 mb-2">No Cancelled Flight Bookings</h3>
                                        <p className="text-gray-500">You don't have any cancelled flight bookings.</p>
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

export default BookedFlights;