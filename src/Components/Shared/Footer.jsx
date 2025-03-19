import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGoogle,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-background py-10 px-6 md:px-20 border-t font-red-rose">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="mb-6 md:mb-0">
          <h2 className="text-primary font-bold text-3xl">FlyDriveGo</h2>
          <p className="text-gray-500 mt-2 max-w-md">
            Book flights, tours, and transport in one place. Find the best
            deals, secure tickets fast, and travel hassle-free with FlyDriveGO!
          </p>
        </div>

        <div className="flex flex-wrap gap-8">
          <div>
            <h3 className="font-semibold text-gray-800">Home</h3>
            <ul className="text-gray-600 mt-2 space-y-1">
              <li>Packages</li>
              <li>Visa</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">Shop</h3>
            <ul className="text-gray-600 mt-2 space-y-1">
              <li>Transport</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">Location:</h3>
            <p className="text-gray-600 mt-2">Dhaka, Bangladesh</p>
          </div>

          <div className="flex space-x-4 text-primary text-xl mt-4">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
            <FaGoogle />
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center text-gray-500 text-sm mt-10 border-t pt-6">
        ©2025 FlyDriveGo
      </div>
    </footer>
  );
};

export default Footer;
