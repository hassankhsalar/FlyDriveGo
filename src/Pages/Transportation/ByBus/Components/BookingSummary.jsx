import React from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaMoneyBillWave } from 'react-icons/fa';

const BookingSummary = ({
    selectedSeats,
    busDetails,
    calculateTotal,
    formatTime,
    timer,
    handleContinue,
    isPremiumSeat
}) => {
    return (
        <motion.div
            className="bg-white rounded-xl shadow-md p-6 h-min sticky top-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <h2 className="text-xl font-semibold text-CharcoleDark mb-4">Booking Summary</h2>

            {/* Selected seat summary */}
            <div className="border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Selected Seats</span>
                    <span className="font-medium">
                        {selectedSeats.length > 0 ? selectedSeats.sort((a, b) => a - b).join(', ') : 'None'}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Seats</span>
                    <span className="font-medium">{selectedSeats.length}</span>
                </div>
            </div>

            {/* Price breakdown */}
            <div className="border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Standard Seats</span>
                    <span>
                        {selectedSeats.filter(seat => !isPremiumSeat(seat)).length} × ${busDetails?.price?.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Premium Seats</span>
                    <span>
                        {selectedSeats.filter(seat => isPremiumSeat(seat)).length} × ${(busDetails?.price * 1.3)?.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-lg">Total Price</span>
                <span className="font-bold text-primary text-xl">${calculateTotal().toFixed(2)}</span>
            </div>

            {/* Note about seat holding */}
            <div className="bg-blue-50 p-3 rounded-lg mb-6 flex items-start">
                <FaInfoCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                    Your seats will be reserved for <span className="font-medium">{formatTime(timer)}</span>.
                    Please complete your booking before this timer expires.
                </p>
            </div>

            {/* Continue button */}
            <motion.button
                className={`w-full py-3 rounded-lg font-medium flex justify-center items-center
                  ${selectedSeats.length > 0
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                onClick={handleContinue}
                whileHover={selectedSeats.length > 0 ? { scale: 1.02 } : {}}
                whileTap={selectedSeats.length > 0 ? { scale: 0.98 } : {}}
                disabled={selectedSeats.length === 0}
            >
                <FaMoneyBillWave className="mr-2" />
                Continue to Payment
            </motion.button>
        </motion.div>
    );
};

export default BookingSummary;
