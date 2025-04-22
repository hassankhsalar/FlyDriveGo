import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

// Import Components
import BusHeader from './Components/BusHeader';
import SeatLayout from './Components/SeatLayout';
import SeatLegend from './Components/SeatLegend';
import BookingSummary from './Components/BookingSummary';

const SeatPlan = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { busId } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatPrice, setSeatPrice] = useState(0);
    const [timer, setTimer] = useState(600); // 10 minutes in seconds
    const [busDetails, setBusDetails] = useState({
        id: 0,
        name: "",
        route: "",
        price: 0,
        bookedSeats: [],
        premiumSeats: []
    });
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        // Generate a session ID for seat reservations if not exists
        if (!sessionId) {
            setSessionId(`session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
        }

        const fetchBusDetails = async () => {
            setLoading(true);
            try {
                const paramBusId = busId; // Store the param value first
                const busIdToUse = location.state?.busData?.id || paramBusId;
                const dateStr = location.state?.date || "Today";

                // Get bus details
                const busResponse = await axiosPublic.get(`/buses/${busIdToUse}`);
                const busData = busResponse.data;

                // Get seat layout
                const seatsResponse = await axiosPublic.get(`/buses/${busIdToUse}/seats?date=${dateStr}`);
                const seatLayout = seatsResponse.data;

                // Process the data for our component
                const formattedBusDetails = {
                    id: busData._id || busData.id,
                    name: busData.name,
                    route: busData.route,
                    time: busData.departureTime,
                    date: dateStr,
                    duration: busData.duration || `${Math.floor(busData.durationMinutes / 60)}h ${busData.durationMinutes % 60}m`,
                    price: busData.price,
                    image: busData.image,
                    features: busData.features || [],
                    // Map booked/premium seats
                    bookedSeats: seatLayout.seats
                        .filter(seat => seat.status === 'booked')
                        .map(seat => seat.seatNumber),
                    premiumSeats: seatLayout.seats
                        .filter(seat => seat.type === 'premium')
                        .map(seat => seat.seatNumber)
                };

                setBusDetails(formattedBusDetails);
                setSeatPrice(busData.price);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bus details:", error);
                setLoading(false);
                toast.error("Failed to load bus details. Please try again.");
            }
        };

        fetchBusDetails();

        // Timer logic for seat reservation expiry remains the same
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
    }, [location.state, busId, axiosPublic, sessionId]);

    const handleSeatClick = (seatNumber) => {
        if (busDetails?.bookedSeats?.includes(seatNumber)) {
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

    const isPremiumSeat = (seatNumber) => {
        return busDetails?.premiumSeats?.includes(seatNumber);
    };

    const handleContinue = async () => {
        if (selectedSeats.length === 0) {
            toast.error("Please select at least one seat to continue.");
            return;
        }

        try {
            // Reserve seats temporarily
            const response = await axiosPublic.post('/buses/reserve-seats', {
                busId: busDetails.id,
                date: busDetails.date,
                seatNumbers: selectedSeats.map(String),
                sessionId: sessionId
            });

            if (response.data.success) {
                const bookingDetails = {
                    busId: busDetails.id,
                    busName: busDetails.name,
                    route: busDetails.route,
                    date: busDetails.date,
                    time: busDetails.time,
                    selectedSeats,
                    totalPrice: calculateTotal(),
                    sessionId: sessionId
                };

                navigate('/transportation/passenger-details', {
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
        if (!busDetails) return 0;

        return selectedSeats.reduce((total, seat) => {
            // Premium seats cost 30% more
            const seatCost = isPremiumSeat(seat)
                ? busDetails.price * 1.3
                : busDetails.price;
            return total + seatCost;
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
                        {/* Bus animation */}
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
                        We're loading the bus layout and available seats
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
                    to="/transportation/by-road"
                    className="group inline-flex items-center text-primary hover:text-primary-dark transition-all bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow-md"
                >
                    <motion.div
                        className="mr-2"
                        whileHover={{ x: -3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <FaArrowLeft />
                    </motion.div>
                    <span className="font-medium">Back to Bus Selection</span>
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
                {/* Left column - Bus details and seat layout */}
                <div className="lg:col-span-2">
                    <motion.div
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Bus header */}
                        <BusHeader busDetails={busDetails} />

                        {/* Seat selection instruction */}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-CharcoleDark mb-4">Select Your Seats</h2>
                            <p className="text-gray-600 mb-4">
                                Click on an available seat to select it. You can select up to 5 seats.
                                Your seat selection will be held for <span className="font-medium text-primary">{formatTime(timer)}</span>.
                            </p>

                            {/* Seat status legend */}
                            <SeatLegend />

                            {/* Seat layout */}
                            <SeatLayout
                                busDetails={busDetails}
                                selectedSeats={selectedSeats}
                                handleSeatClick={handleSeatClick}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Right column - Booking summary */}
                <BookingSummary
                    selectedSeats={selectedSeats}
                    busDetails={busDetails}
                    calculateTotal={calculateTotal}
                    formatTime={formatTime}
                    timer={timer}
                    handleContinue={handleContinue}
                    isPremiumSeat={isPremiumSeat}
                />
            </motion.div>
        </div>
    );
};

export default SeatPlan;