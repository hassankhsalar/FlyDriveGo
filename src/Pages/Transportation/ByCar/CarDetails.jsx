import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaArrowLeft,
    FaCar,
    FaGasPump,
    FaUsers,
    FaCogs,
    FaCalendarAlt,
    FaStar,
    FaCheck,
    FaChevronRight
} from 'react-icons/fa';

const CarDetails = () => {
    const { carId } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalDays, setTotalDays] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCarDetails = async () => {
            setLoading(true);

            // In a real app, this would be an API call
            // For now, we're simulating with static data
            setTimeout(() => {
                const carData = {
                    id: parseInt(carId),
                    name: "Toyota Camry",
                    type: "Sedan",
                    price: 45,
                    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                    gallery: [
                        "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                    ],
                    seats: 5,
                    doors: 4,
                    transmission: "Automatic",
                    fuelType: "Gasoline",
                    fuelEfficiency: "30 MPG",
                    engine: "2.5L 4-Cylinder",
                    year: 2023,
                    rating: 4.7,
                    reviewCount: 47,
                    available: true,
                    features: [
                        "Bluetooth Connectivity",
                        "Backup Camera",
                        "Cruise Control",
                        "USB Ports",
                        "Apple CarPlay & Android Auto",
                        "Keyless Entry",
                        "Lane Departure Warning",
                        "Automatic Emergency Braking",
                        "Dual-Zone Climate Control",
                        "Adaptive Cruise Control"
                    ],
                    specifications: {
                        dimensions: "192\" L x 73\" W x 57\" H",
                        weight: "3,340 lbs",
                        cargo: "15.1 cubic feet",
                        horsepower: "203 hp @ 6,600 rpm",
                        torque: "184 lb-ft @ 5,000 rpm",
                        acceleration: "0-60 mph in 7.5 sec",
                        topSpeed: "135 mph"
                    },
                    rentalPolicy: {
                        minAge: 21,
                        requiredDocuments: ["Valid Driver's License", "Credit Card", "Proof of Insurance"],
                        securityDeposit: 200,
                        fuelPolicy: "Return with same fuel level",
                        mileageLimit: "Unlimited",
                        lateReturnFee: "$20/hour"
                    },
                    description: "The Toyota Camry offers a comfortable and reliable driving experience. With its spacious interior, excellent fuel efficiency, and advanced safety features, the Camry is perfect for both city drives and long journeys. This model comes with enhanced connectivity features and a smooth automatic transmission.",
                };
                setCar(carData);
                setLoading(false);
            }, 800);
        };

        fetchCarDetails();
    }, [carId]);

    useEffect(() => {
        // Calculate total days and price when dates change
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            setTotalDays(diffDays || 1);
            setTotalPrice((diffDays || 1) * (car?.price || 0));
        } else {
            setTotalDays(1);
            setTotalPrice(car?.price || 0);
        }
    }, [startDate, endDate, car]);

    const handleBookNow = () => {
        if (!startDate || !endDate) {
            alert('Please select pickup and return dates');
            return;
        }

        const bookingDetails = {
            carId: car.id,
            carName: car.name,
            startDate,
            endDate,
            totalDays,
            totalPrice,
            imageUrl: car.image
        };

        // Navigate to reservation page with booking details
        navigate(`/transportation/car-reservation/${car.id}`, {
            state: { bookingDetails }
        });
    };

    // Function to format date for today's date and future availability
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    if (loading) {
        return (
            <div className="container mx-auto py-12 px-4">
                <div className="flex justify-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 font-red-rose">
            {/* Back button */}
            <motion.div
                className="mb-8"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Link
                    to="/transportation/by-car"
                    className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    <span className="font-medium">Back to Cars</span>
                </Link>
            </motion.div>

            {/* Car Overview */}
            <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Car Header with Main Image */}
                <div className="relative">
                    <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-[300px] md:h-[400px] object-cover"
                    />
                    {!car.available && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <p className="text-white font-bold text-3xl">UNAVAILABLE</p>
                        </div>
                    )}
                    <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg font-semibold">
                        ${car.price}/day
                    </div>
                </div>

                {/* Car Basic Info */}
                <div className="p-6">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-CharcoleDark">{car.name}</h1>
                            <div className="flex items-center mt-2">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded text-sm font-medium mr-3">
                                    {car.type}
                                </span>
                                <div className="flex items-center text-yellow-400">
                                    <FaStar />
                                    <span className="text-gray-700 ml-1">{car.rating.toFixed(1)}</span>
                                    <span className="text-gray-500 text-sm ml-1">({car.reviewCount} reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Car Quick Specs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 border-t border-gray-200 pt-4">
                        <div className="flex items-center">
                            <FaCar className="text-primary mr-2" />
                            <span className="text-gray-700">{car.year} Model</span>
                        </div>
                        <div className="flex items-center">
                            <FaGasPump className="text-primary mr-2" />
                            <span className="text-gray-700">{car.fuelType}</span>
                        </div>
                        <div className="flex items-center">
                            <FaUsers className="text-primary mr-2" />
                            <span className="text-gray-700">{car.seats} Seats</span>
                        </div>
                        <div className="flex items-center">
                            <FaCogs className="text-primary mr-2" />
                            <span className="text-gray-700">{car.transmission}</span>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8">
                            {['overview', 'features', 'specifications', 'rental policy'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${activeTab === tab
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="py-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-CharcoleDark">Car Description</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed font-poppins">{car.description}</p>

                                {/* Gallery Preview */}
                                <h2 className="text-xl font-semibold mb-4 text-CharcoleDark">Gallery</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {car.gallery.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`${car.name} - View ${index + 1}`}
                                            className="rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-[120px] object-cover w-full"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Features Tab */}
                        {activeTab === 'features' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-CharcoleDark">Car Features</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                                    {car.features.map((feature, index) => (
                                        <div key={index} className="flex items-center">
                                            <FaCheck className="text-primary mr-2" />
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Specifications Tab */}
                        {activeTab === 'specifications' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-CharcoleDark">Specifications</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold mb-3 text-CharcoleDark">Physical</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Dimensions:</span>
                                                <span className="text-gray-800 font-medium">{car.specifications.dimensions}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Weight:</span>
                                                <span className="text-gray-800 font-medium">{car.specifications.weight}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Cargo Capacity:</span>
                                                <span className="text-gray-800 font-medium">{car.specifications.cargo}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold mb-3 text-CharcoleDark">Performance</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Horsepower:</span>
                                                <span className="text-gray-800 font-medium">{car.specifications.horsepower}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Torque:</span>
                                                <span className="text-gray-800 font-medium">{car.specifications.torque}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">0-60 mph:</span>
                                                <span className="text-gray-800 font-medium">{car.specifications.acceleration}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Top Speed:</span>
                                                <span className="text-gray-800 font-medium">{car.specifications.topSpeed}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Rental Policy Tab */}
                        {activeTab === 'rental policy' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-CharcoleDark">Rental Policy</h2>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <h3 className="text-lg font-semibold mb-3 text-CharcoleDark">Basic Requirements</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600 mb-1">Minimum Age:</p>
                                            <p className="font-medium">{car.rentalPolicy.minAge} years</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 mb-1">Security Deposit:</p>
                                            <p className="font-medium">${car.rentalPolicy.securityDeposit.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 mb-1">Fuel Policy:</p>
                                            <p className="font-medium">{car.rentalPolicy.fuelPolicy}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 mb-1">Mileage Limit:</p>
                                            <p className="font-medium">{car.rentalPolicy.mileageLimit}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-3 text-CharcoleDark">Required Documents</h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {car.rentalPolicy.requiredDocuments.map((doc, index) => (
                                            <li key={index} className="text-gray-700">{doc}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                    <div className="flex">
                                        <div className="ml-3">
                                            <p className="text-yellow-700 font-medium">Important Notice</p>
                                            <p className="text-yellow-700 text-sm">Late returns will incur a fee of {car.rentalPolicy.lateReturnFee}. Please return the vehicle on time or contact us to extend your rental.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Booking Section */}
            <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-CharcoleDark">Book This Car</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pick-up Date</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaCalendarAlt className="text-gray-400" />
                                </div>
                                <input
                                    type="date"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    min={getTodayDate()}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaCalendarAlt className="text-gray-400" />
                                </div>
                                <input
                                    type="date"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    min={startDate || getTodayDate()}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center font-medium text-gray-700 mb-2">
                            <span>Base Rate (per day)</span>
                            <span>${car.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center font-medium text-gray-700 mb-2">
                            <span>Number of Days</span>
                            <span>{totalDays}</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                            <span>Total</span>
                            <span className="text-primary">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <motion.button
                            onClick={handleBookNow}
                            disabled={!car.available}
                            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium ${car.available
                                    ? 'bg-primary text-white hover:bg-primary/90'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            whileHover={car.available ? { scale: 1.02 } : {}}
                            whileTap={car.available ? { scale: 0.98 } : {}}
                        >
                            {car.available ? (
                                <>
                                    Book Now
                                    <FaChevronRight className="ml-2" />
                                </>
                            ) : (
                                'Currently Unavailable'
                            )}
                        </motion.button>

                        <p className="text-center text-sm text-gray-500 mt-2">
                            No credit card required to reserve. Pay when you pick up the car.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CarDetails;
