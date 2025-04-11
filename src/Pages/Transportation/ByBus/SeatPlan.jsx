import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

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

    useEffect(() => {
        const fetchBusDetails = () => {
            setLoading(true);

            const busData = location.state?.busData || {
                id: parseInt(busId) || 1,
                name: "Premium Executive Coach",
                route: "Dhaka to Chittagong",
                time: "06:00 AM",
                duration: "5h 30m",
                price: 69,
                image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
                features: ["Reclining Seats", "WiFi", "AC", "Power Outlets", "Snacks"],
                date: location.state?.date || "Today, April 9, 2025",
                totalSeats: 40,
                bookedSeats: [3, 4, 7, 12, 15, 18, 22, 26, 31, 33, 38],
                premiumSeats: [1, 2, 5, 6, 9, 10],
            };

            console.log("Bus details loaded:", busData);
            setBusDetails(busData);
            setSeatPrice(busData.price);
            setLoading(false);
        };

        fetchBusDetails();

        // Countdown timer
        const countdown = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    if (selectedSeats.length > 0) {
                        alert("Your seat reservation time has expired. Please select seats again.");
                        setSelectedSeats([]);
                    }
                    return 600;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [location.state, busId]);

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

    const handleContinue = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat to continue.");
            return;
        }

        // In a real app, this would likely call an API to hold the seats
        // and redirect to payment or passenger details
        const bookingDetails = {
            busId: busDetails.id,
            busName: busDetails.name,
            route: busDetails.route,
            date: busDetails.date,
            time: busDetails.time,
            selectedSeats,
            totalPrice: calculateTotal(),
        };

        console.log("Booking details:", bookingDetails);

        // Navigate to passenger details or payment page
        navigate('/transportation/passenger-details', { state: { bookingDetails } });
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