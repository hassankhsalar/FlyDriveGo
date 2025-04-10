import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notification = ({ message, onClose, redirectTo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(onClose, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClick = () => {
    navigate(redirectTo);
    onClose(); 
  };

  return (
    <div 
      className="fixed top-24 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50 cursor-pointer hover:scale-110"
      onClick={handleClick}
    >
      {message}
    </div>
  );
};

export default Notification;