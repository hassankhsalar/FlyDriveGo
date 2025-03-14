import { useState } from 'react';
import BookingModal from './BookingModal';

const OptionCard = ({ option }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="card bg-background shadow-md rounded-lg overflow-hidden font-poppins border border-SmokeWhite">
      {/* Placeholder for Image (Optional) */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-textGray">Image Placeholder</span>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-CharcoleDark mb-2">{option.title}</h3>
        <p className="text-textGray text-sm mb-1">Provider: {option.provider}</p>
        <p className="text-textGray text-sm mb-1">Duration: {option.duration} hours</p>
        <p className="text-textGray text-sm mb-1">Departure: {new Date(option.departureTime).toLocaleString()}</p>
        <p className="text-textGray text-sm mb-1">Class: {option.class.charAt(0).toUpperCase() + option.class.slice(1)}</p>
        <p className="text-textGray text-sm mb-1">Amenities: {option.amenities.join(', ')}</p>
        <p className="text-textGray text-sm mb-2">
          Status: <span className={option.available ? 'text-green-500' : 'text-red-500'}>
            {option.available ? 'Available' : 'Sold Out'}
          </span>
        </p>
        <p className="text-primary font-bold text-lg mb-3">Price: ${option.price}</p>

        {/* Book Now Button */}
        <button
          className={`w-full py-2 rounded-lg font-bold text-white ${
            option.available ? 'bg-CharcoleDark hover:bg-CharcoleDark/80' : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={() => setIsModalOpen(true)}
          disabled={!option.available}
        >
          Book Now
        </button>
      </div>

      {/* Booking Modal */}
      {isModalOpen && <BookingModal option={option} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default OptionCard;