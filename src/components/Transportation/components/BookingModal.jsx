const BookingModal = ({ option, onClose }) => (
    <div className="modal modal-open">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg text-CharcoleDark">Book {option.title}</h3>
        <p className="text-text">Price: <span className="text-primary">${option.price}</span></p>
        <p className="text-text">Departure: {new Date(option.departureTime).toLocaleString()}</p>
        <p className="text-text">Provider: {option.provider}</p>
        <div className="modal-action">
          <button className="btn bg-primary text-white hover:bg-primary/80" onClick={onClose}>
            Confirm Booking
          </button>
          <button className="btn bg-CharcoleDark text-white hover:bg-CharcoleDark/80" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
  
  export default BookingModal;