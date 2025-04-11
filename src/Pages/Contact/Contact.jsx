import React, { useState } from 'react';
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin
} from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Hide success message after 5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        }, 1500);
    };

    return (
        <div className="bg-SmokeWhite font-red-rose">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-primary to-blue-500 pt-24 pb-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 opacity-0 translate-y-4 animate-fadeSlideUp">
                        Get In Touch With Us
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto opacity-0 translate-y-4 animate-fadeSlideUp delay-200">
                        Have questions about our services or need assistance with your travel plans?
                        Our team is ready to help you every step of the way.
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-SmokeWhite transform -translate-y-1 rounded-tl-[50%] rounded-tr-[50%] opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-SmokeWhite transform translate-y-1"></div>
            </div>

            {/* Contact Info Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: FaPhone,
                            title: "Call Us",
                            content: "+880 123 456 7890",
                            detail: "Customer support available 24/7"
                        },
                        {
                            icon: FaEnvelope,
                            title: "Email Us",
                            content: "info@flydrivego.com",
                            detail: "We'll respond within 24 hours"
                        },
                        {
                            icon: FaMapMarkerAlt,
                            title: "Visit Us",
                            content: "123 Travel Lane, Dhaka",
                            detail: "Bangladesh, 1000"
                        },
                        {
                            icon: FaClock,
                            title: "Working Hours",
                            content: "Mon - Fri: 9AM - 6PM",
                            detail: "Weekends: 10AM - 4PM"
                        }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl opacity-0 animate-fadeIn"
                            style={{ animationDelay: `${index * 100 + 400}ms` }}
                        >
                            <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4 mx-auto">
                                <item.icon className="text-primary text-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-CharcoleDark text-center mb-2">{item.title}</h3>
                            <p className="text-primary font-semibold text-center mb-1">{item.content}</p>
                            <p className="text-gray-600 text-sm text-center">{item.detail}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form and Map Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8 opacity-0 animate-fadeSlideUp delay-800">
                        <h2 className="text-3xl font-bold text-CharcoleDark mb-6">Send Us a Message</h2>

                        {showSuccess && (
                            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg transition-all duration-500 animate-fadeIn">
                                Thank you! Your message has been sent successfully. We'll get back to you soon.
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-CharcoleDark/70 font-poppins mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-CharcoleDark/70 font-poppins mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="subject" className="block text-CharcoleDark/70 font-poppins mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block text-CharcoleDark/70 font-poppins mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Map */}
                    <div className="opacity-0 animate-fadeSlideUp delay-1000">
                        <h2 className="text-3xl font-bold text-CharcoleDark mb-6">Find Us</h2>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-96">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.8223908687!2d90.27923710646989!3d23.78088745708869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1686501375397!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="FlyDriveGo Location"
                                className="transition-transform duration-700 hover:scale-105"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white mt-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-CharcoleDark mb-4 opacity-0 animate-fadeSlideUp delay-1200">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto opacity-0 animate-fadeSlideUp delay-1300">
                        Find answers to the most common questions about our services
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {[
                        {
                            question: "How do I make a booking?",
                            answer: "You can make a booking through our website by selecting your desired service, filling out the required information, and completing the payment process. You'll receive a confirmation email once your booking is confirmed."
                        },
                        {
                            question: "What is your cancellation policy?",
                            answer: "Our standard cancellation policy allows for a full refund if cancelled 48 hours before the scheduled service. Different packages may have specific cancellation terms, which will be clearly stated during the booking process."
                        },
                        {
                            question: "Do you offer group discounts?",
                            answer: "Yes, we offer special rates for group bookings. The discount amount varies depending on the group size and selected services. Contact our customer service for more information."
                        },
                        {
                            question: "How can I modify my booking?",
                            answer: "You can modify your booking by logging into your account and navigating to 'My Bookings'. From there, you can change dates, upgrade services, or add extras, subject to availability."
                        }
                    ].map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-6 border border-gray-200 transition-all duration-300 hover:shadow-md opacity-0 animate-fadeSlideUp"
                            style={{ animationDelay: `${index * 100 + 1400}ms` }}
                        >
                            <h3 className="font-bold text-xl text-CharcoleDark mb-3">{faq.question}</h3>
                            <p className="text-gray-600 font-poppins">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-gradient-to-r from-primary to-blue-500 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8 opacity-0 animate-fadeSlideUp delay-1800">
                        Connect With Us
                    </h2>

                    <div className="flex justify-center space-x-6">
                        {[
                            { icon: FaFacebook, label: "Facebook" },
                            { icon: FaTwitter, label: "Twitter" },
                            { icon: FaInstagram, label: "Instagram" },
                            { icon: FaLinkedin, label: "LinkedIn" }
                        ].map((social, index) => (
                            <a
                                key={index}
                                href="#"
                                className="bg-white text-primary h-14 w-14 rounded-full flex items-center justify-center text-2xl transform transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white opacity-0 animate-fadeIn"
                                style={{ animationDelay: `${index * 100 + 2000}ms` }}
                                aria-label={social.label}
                            >
                                <social.icon />
                            </a>
                        ))}
                    </div>

                    <p className="text-white/80 mt-8 font-poppins max-w-2xl mx-auto opacity-0 animate-fadeSlideUp delay-2200">
                        Stay updated with our latest offers, travel tips, and destination guides by following us on social media.
                    </p>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center opacity-0 animate-fadeSlideUp delay-2400">
                    <h2 className="text-3xl font-bold text-CharcoleDark mb-4">
                        Subscribe to Our Newsletter
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join our community and be the first to receive exclusive deals, travel inspiration, and updates on new destinations.
                    </p>

                    <form className="max-w-md mx-auto flex">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-4 py-3 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-r-lg transition-colors duration-300"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;