import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGoogle,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";

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
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800">Quick Links</h3>
            <ul className="text-gray-600 mt-2 space-y-1">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/tour-pack'>Packages</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/transportation'>Transport</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-800">Support</h3>
            <ul className="text-gray-600 mt-2 space-y-1">
              <li><Link to='/contact'>Contact Us</Link></li>
              <li><Link to='/careers'>Careers</Link></li>
              <li><Link to='/faq'>FAQ</Link></li>
              <li><Link to='/help-center'>Help Center</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-800">Legal</h3>
            <ul className="text-gray-600 mt-2 space-y-1">
              <li><Link to='/terms'>Terms & Conditions</Link></li>
              <li><Link to='/privacy'>Privacy Policy</Link></li>
              <li><Link to='/cookie-policy'>Cookie Policy</Link></li>
              <li><Link to='/booking-policy'>Booking Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-800">Contact</h3>
            <ul className="text-gray-600 mt-2 space-y-2">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-primary" />
                <span>+880 123-456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <span>support@flydrivego.com</span>
              </li>
              <li className="flex space-x-4 text-primary mt-4">
                <FaFacebookF className="hover:text-blue-600 cursor-pointer transition-colors" />
                <FaTwitter className="hover:text-blue-400 cursor-pointer transition-colors" />
                <FaInstagram className="hover:text-pink-600 cursor-pointer transition-colors" />
                <FaLinkedinIn className="hover:text-blue-700 cursor-pointer transition-colors" />
                <FaGoogle className="hover:text-red-500 cursor-pointer transition-colors" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription (Optional) */}
      <div className="container mx-auto mt-10 border-t border-gray-200 pt-8">
        <div className="max-w-md mx-auto md:mx-0">
          <h3 className="font-semibold text-gray-800 mb-3">Subscribe to our Newsletter</h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary w-full"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center text-gray-500 text-sm mt-10 border-t pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>©2025 FlyDriveGo. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link to='/terms' className="hover:text-primary transition-colors">Terms</Link>
            <Link to='/privacy' className="hover:text-primary transition-colors">Privacy</Link>
            <Link to='/cookie-policy' className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
