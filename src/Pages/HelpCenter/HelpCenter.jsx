import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Search, Phone, Mail, MessageSquare,
    User, AlertCircle, CreditCard, Book,
    MapPin, FileText, Calendar, CheckCircle
} from "react-feather";

const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Support Categories
    const categories = [
        {
            icon: User,
            title: "Account Help",
            description: "Manage your account settings, password, and profile information.",
            link: "/help-center/account"
        },
        {
            icon: CreditCard,
            title: "Payment Issues",
            description: "Resolve payment problems, refunds, and billing inquiries.",
            link: "/help-center/payments"
        },
        {
            icon: Book,
            title: "Booking Assistance",
            description: "Get help with making, modifying, or cancelling reservations.",
            link: "/help-center/bookings"
        },
        {
            icon: MapPin,
            title: "Travel Support",
            description: "Information about destinations, travel documents, and requirements.",
            link: "/help-center/travel"
        },
        {
            icon: FileText,
            title: "Policies & Terms",
            description: "Review our terms of service, privacy, and booking policies.",
            link: "/help-center/policies"
        },
        {
            icon: AlertCircle,
            title: "Report a Problem",
            description: "Let us know about technical issues or service complaints.",
            link: "/help-center/report"
        }
    ];

    // Popular Help Topics
    const popularTopics = [
        {
            title: "How to Cancel a Booking",
            link: "/help-center/cancel-booking"
        },
        {
            title: "Refund Process and Timeline",
            link: "/help-center/refunds"
        },
        {
            title: "Updating Payment Information",
            link: "/help-center/update-payment"
        },
        {
            title: "Booking Modifications",
            link: "/help-center/modify-booking"
        },
        {
            title: "Contacting Customer Support",
            link: "/help-center/contact-us"
        },
        {
            title: "Flight Delay Compensation",
            link: "/help-center/flight-delay"
        }
    ];

    // Support Channels
    const supportChannels = [
        {
            icon: Phone,
            title: "Phone Support",
            description: "Speak directly with our customer service representatives",
            detail: "+880 123-456-7890",
            availability: "Mon - Fri: 9AM - 6PM, Weekends: 10AM - 4PM"
        },
        {
            icon: Mail,
            title: "Email Support",
            description: "Send us your queries and we'll respond promptly",
            detail: "support@flydrivego.com",
            availability: "Response within 24 hours"
        },
        {
            icon: MessageSquare,
            title: "Live Chat",
            description: "Connect instantly with our support team",
            detail: "Available on website and mobile app",
            availability: "Mon - Fri: 9AM - 6PM, Weekends: 10AM - 4PM"
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen bg-SmokeWhite font-red-rose">
            {/* Hero Section */}
            <section className="bg-primary/5 py-16 px-4 md:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-CharcoleDark mb-6">How Can We Help You?</h1>
                    <p className="text-lg font-poppins text-CharcoleDark/70 max-w-3xl mx-auto mb-8">
                        Find answers, manage your bookings, and get the support you need for a seamless travel experience.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search for help topics..."
                            className="w-full py-4 px-5 pl-14 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary font-poppins text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                            Search
                        </button>
                    </div>
                </div>
            </section>

            {/* Support Categories */}
            <motion.section
                className="py-16 px-4 md:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-CharcoleDark mb-10 text-center">Browse by Category</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <category.icon className="text-primary" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-CharcoleDark">{category.title}</h3>
                                </div>
                                <p className="text-CharcoleDark/70 font-poppins mb-6">{category.description}</p>
                                <Link to={category.link} className="text-primary font-semibold hover:underline flex items-center">
                                    Learn more
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Popular Topics and Contact Section */}
            <section className="py-12 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Popular Topics */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="rounded-xl border border-gray-100 shadow-sm p-6 md:p-8"
                        >
                            <h2 className="text-2xl font-bold text-CharcoleDark mb-6 flex items-center">
                                <CheckCircle className="text-primary mr-3" size={24} />
                                Popular Help Topics
                            </h2>

                            <ul className="space-y-4 font-poppins">
                                {popularTopics.map((topic, index) => (
                                    <motion.li key={index} variants={itemVariants}>
                                        <Link to={topic.link} className="flex items-center text-CharcoleDark hover:text-primary transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {topic.title}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <Link to="/faq" className="bg-primary/10 text-primary px-6 py-3 rounded-lg inline-flex items-center hover:bg-primary/20 transition-colors">
                                    View all FAQs
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Contact Options */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="rounded-xl border border-gray-100 shadow-sm p-6 md:p-8"
                        >
                            <h2 className="text-2xl font-bold text-CharcoleDark mb-6 flex items-center">
                                <Calendar className="text-primary mr-3" size={24} />
                                Contact Customer Support
                            </h2>

                            <div className="space-y-6">
                                {supportChannels.map((channel, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-start p-4 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                                    >
                                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                                            <channel.icon className="text-primary" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-CharcoleDark text-lg">{channel.title}</h3>
                                            <p className="text-CharcoleDark/70 font-poppins text-sm mb-2">{channel.description}</p>
                                            <p className="font-semibold text-primary">{channel.detail}</p>
                                            <p className="text-xs text-CharcoleDark/50 mt-1">{channel.availability}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <Link to="/contact" className="bg-primary text-white px-6 py-3 rounded-lg inline-flex items-center hover:bg-primary/90 transition-colors">
                                    Contact Us
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Self-Service Tools */}
            <section className="py-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-CharcoleDark mb-4">Self-Service Tools</h2>
                    <p className="text-lg font-poppins text-CharcoleDark/70 max-w-3xl mx-auto mb-12">
                        Manage your bookings quickly and easily with our self-service options
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                            <div className="mb-4 h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-CharcoleDark mb-3">View Booking Status</h3>
                            <p className="text-CharcoleDark/70 font-poppins mb-4">Check the status of your flights, car rentals, and tour packages</p>
                            <Link to="/dashboard" className="text-primary font-semibold hover:underline">Go to Dashboard</Link>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                            <div className="mb-4 h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-CharcoleDark mb-3">Update Reservations</h3>
                            <p className="text-CharcoleDark/70 font-poppins mb-4">Modify dates, add services, or update passenger information</p>
                            <Link to="/dashboard" className="text-primary font-semibold hover:underline">Manage Bookings</Link>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                            <div className="mb-4 h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-CharcoleDark mb-3">Download Documents</h3>
                            <p className="text-CharcoleDark/70 font-poppins mb-4">Access receipts, invoices, and travel vouchers</p>
                            <Link to="/dashboard" className="text-primary font-semibold hover:underline">View Documents</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HelpCenter;
