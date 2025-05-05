import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { FaPlane, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import FlightSeatLayout from './FlightSeatLayout';
import FlightBookingSummary from './FlightBookingSummary';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const FlightSeatPlan = () => {
    const { flightId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [timer, setTimer] = useState(600); // 10 minutes countdown
    const [flightDetails, setFlightDetails] = useState(null);
    const [seatPrice, setSeatPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        // Generate a session ID for seat reservations if not exists
        if (!sessionId) {
            setSessionId(`session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
        }

        const fetchFlightDetails = async () => {
            setLoading(true);
            try {
                const paramFlightId = flightId; // Store the param value first
                const flightIdToUse = location.state?.flightData?.id || paramFlightId;
                const dateStr = location.state?.date || "Today";

                // Get flight details
                const flightResponse = await axiosPublic.get(`/flights/${flightIdToUse}`);
                const flightData = flightResponse.data;

                // Get seat layout
                const seatsResponse = await axiosPublic.get(`/flights/${flightIdToUse}/seats?date=${dateStr}`);
                const seatLayout = seatsResponse.data;

                // Process the data for our component
                const formattedFlightDetails = {
                    id: flightData._id || flightData.id,
                    name: flightData.name,
                    route: flightData.route,
                    departureTime: flightData.departureTime,
                    date: dateStr,
                    duration: flightData.duration || `${Math.floor(flightData.durationMinutes / 60)}h ${flightData.durationMinutes % 60}m`,
                    price: flightData.price,
                    image: flightData.image,
                    airline: flightData.airline,
                    features: flightData.features || [],
                    // Map booked/premium seats
                    bookedSeats: seatLayout.seats
                        .filter(seat => seat.status === 'booked')
                        .map(seat => seat.seatNumber),
                    firstClassSeats: seatLayout.seats
                        .filter(seat => seat.type === 'first')
                        .map(seat => seat.seatNumber),
                    businessClassSeats: seatLayout.seats
                        .filter(seat => seat.type === 'business')
                        .map(seat => seat.seatNumber),
                    premiumEconomySeats: seatLayout.seats
                        .filter(seat => seat.type === 'premium-economy')
                        .map(seat => seat.seatNumber),
                    seatLayout: seatLayout
                };

                setFlightDetails(formattedFlightDetails);
                setSeatPrice(flightData.price);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching flight details:", error);
                setLoading(false);
                toast.error("Failed to load flight details. Please try again.");
            }
        };

        fetchFlightDetails();

        // Timer logic for seat reservation expiry
        const countdown = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    if (selectedSeats.length > 0) {
                        toast.error("Your seat reservation time has expired. Please select seats again.");
                        setSelectedSeats([]);
                    }
                    return 600;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [location.state, flightId, axiosPublic, sessionId]);

    const handleSeatClick = (seatNumber) => {
        if (flightDetails?.bookedSeats?.includes(seatNumber)) {
            // Seat is already booked
            return;
        }

        setSelectedSeats(prev => {
            if (prev.includes(seatNumber)) {
                // Deselect the seat
                return prev.filter(seat => seat !== seatNumber);
            } else {
                // Select the seat (max 5 seats per booking)
                return prev.length < 5 ? [...prev, seatNumber] : prev;
            }
        });
    };

    const getSeatType = (seatNumber) => {
        if (flightDetails?.firstClassSeats?.includes(seatNumber)) {
            return 'first';
        } else if (flightDetails?.businessClassSeats?.includes(seatNumber)) {
            return 'business';
        } else if (flightDetails?.premiumEconomySeats?.includes(seatNumber)) {
            return 'premium-economy';
        }
        return 'economy';
    };

    const handleContinue = async () => {
        if (selectedSeats.length === 0) {
            toast.error("Please select at least one seat to continue.");
            return;
        }

        if (!flightDetails) {
            toast.error("Flight details not available. Please try again or refresh the page.");
            return;
        }

        if (!flightDetails.id) {
            toast.error("Flight ID not available. Please try again or refresh the page.");
            return;
        }

        try {
            // Reserve seats temporarily
            const response = await axiosPublic.post('/flights/reserve-seats', {
                flightId: flightDetails.id,
                date: flightDetails.date,
                seatNumbers: selectedSeats.map(String),
                sessionId: sessionId
            });

            if (response.data.success) {
                const bookingDetails = {
                    flightId: flightDetails.id,
                    flightName: flightDetails.name,
                    route: flightDetails.route,
                    date: flightDetails.date,
                    time: flightDetails.departureTime,
                    selectedSeats,
                    totalPrice: calculateTotal(),
                    sessionId: sessionId,
                    airline: flightDetails.airline
                };

                navigate('/transportation/flight-passenger-details', {
                    state: { bookingDetails }
                });
            }
        } catch (error) {
            console.error("Error reserving seats:", error);
            if (error.response?.data?.unavailableSeats) {
                toast.error(`Some seats are no longer available: ${error.response.data.unavailableSeats.join(', ')}`);
            } else {
                toast.error("Failed to reserve seats. Please try again.");
            }
        }
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    const calculateTotal = () => {
        if (!flightDetails) return 0;

        return selectedSeats.reduce((total, seat) => {
            // Get seat price based on class
            const seatType = getSeatType(seat);
            let seatPrice = flightDetails.price; // Default economy price

            if (seatType === 'first') {
                seatPrice = flightDetails.price * 2.5;
            } else if (seatType === 'business') {
                seatPrice = flightDetails.price * 1.5;
            } else if (seatType === 'premium-economy') {
                seatPrice = flightDetails.price * 1.2;
            }

            return total + seatPrice;
        }, 0);
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 rounded-xl shadow-sm">
                <div className="text-center">
                    <motion.div
                        className="w-20 h-20 mb-8 mx-auto relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Plane animation */}
                        <motion.div
                            className="absolute inset-0 bg-primary/20 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
                        </motion.div>
                    </motion.div>
                    <motion.p
                        className="text-xl font-medium text-primary"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Preparing your perfect seat...
                    </motion.p>
                    <motion.p
                        className="text-sm text-gray-500 mt-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        We're loading the airplane layout and available seats
                    </motion.p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 font-red-rose relative">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden -z-10 opacity-5">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400 rounded-full"></div>
            </div>

            {/* Back button */}
            <motion.div
                className="mb-8"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Link
                    to="/transportation/by-air"
                    className="group inline-flex items-center text-primary hover:text-primary-dark transition-all bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow-md"
                >
                    <motion.div
                        className="mr-2"
                        whileHover={{ x: -3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <FaArrowLeft />
                    </motion.div>
                    <span className="font-medium">Back to Flight Selection</span>
                </Link>
            </motion.div>

            {/* Page title */}
            <motion.h1
                className="text-3xl font-bold text-CharcoleDark mb-6 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                Choose Your Perfect Seat
            </motion.h1>

            {/* Main content */}
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                initial="hidden"
                animate="visible"
            >
                {/* Left column - Flight details and seat layout */}
                <div className="lg:col-span-2">
                    <motion.div
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Flight header */}
                        <div className="bg-gradient-to-r from-blue-500 to-primary p-6 text-white">
                            <div className="flex flex-wrap justify-between items-center gap-4">
                                <div>
                                    <h2 className="text-xl font-bold mb-1">{flightDetails?.name}</h2>
                                    <p className="opacity-90">{flightDetails?.route}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold">{flightDetails?.date}</div>
                                    <div className="flex items-center justify-end gap-2 opacity-90">
                                        <span>{flightDetails?.departureTime}</span>
                                        <span>•</span>
                                        <span>{flightDetails?.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Seat selection instruction */}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-CharcoleDark mb-4">Select Your Seats</h2>
                            <p className="text-gray-600 mb-4">
                                Click on an available seat to select it. You can select up to 5 seats per booking.
                                <br />
                                <span className="text-primary font-medium">Note:</span> Different aircraft sections have different pricing.
                            </p>

                            {/* Flight seat layout component */}
                            <FlightSeatLayout
                                flightDetails={flightDetails}
                                selectedSeats={selectedSeats}
                                handleSeatClick={handleSeatClick}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Right column - Booking summary */}
                <div>
                    <FlightBookingSummary
                        flightDetails={flightDetails}
                        selectedSeats={selectedSeats}
                        getSeatType={getSeatType}
                        calculateTotal={calculateTotal}
                        timer={timer}
                        formatTime={formatTime}
                        handleContinue={handleContinue}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default FlightSeatPlan;