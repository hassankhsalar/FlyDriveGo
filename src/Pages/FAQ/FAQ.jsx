import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Search } from "react-feather";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // FAQ categories with questions and answers
    const faqCategories = [
        {
            category: "General",
            questions: [
                {
                    question: "What is FlyDriveGo?",
                    answer: "FlyDriveGo is an all-in-one travel platform where you can book flights, car rentals, bus tickets, and tour packages. We aim to provide hassle-free travel planning with competitive prices and excellent customer support."
                },
                {
                    question: "How do I create an account?",
                    answer: "You can create an account by clicking the 'Register' button in the top right corner of the homepage. Fill in your personal details, create a password, and verify your email address to complete the registration process."
                },
                {
                    question: "Is my personal information secure?",
                    answer: "Yes, we take data security very seriously. All personal information is encrypted and stored securely following industry standards. We never share your information with third parties without your consent. For more details, please refer to our Privacy Policy."
                }
            ]
        },
        {
            category: "Bookings & Reservations",
            questions: [
                {
                    question: "How do I book a flight?",
                    answer: "To book a flight, navigate to the 'Transportation' section and select 'By Air'. Enter your departure and arrival locations, dates, and number of passengers. Browse the available options, select your preferred flight, and follow the checkout process to complete your booking."
                },
                {
                    question: "Can I book a car rental without a flight?",
                    answer: "Absolutely! You can book car rentals independently. Simply go to the 'Transportation' section, select 'By Car', and follow the prompts to find available vehicles at your desired location and dates."
                },
                {
                    question: "How far in advance should I book a tour package?",
                    answer: "We recommend booking tour packages at least 2-3 months in advance, especially for popular destinations during peak travel seasons. This ensures availability and often results in better pricing."
                },
                {
                    question: "What happens if I need to cancel my booking?",
                    answer: "Cancellation policies vary depending on the service provider and type of booking. Generally, cancellations made 48+ hours before departure may be eligible for a full or partial refund. Please refer to our Booking Policy for specific details or contact our customer service team."
                }
            ]
        },
        {
            category: "Payments & Pricing",
            questions: [
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and in some regions, mobile payment options like Apple Pay and Google Pay."
                },
                {
                    question: "Are there any hidden fees I should know about?",
                    answer: "We pride ourselves on transparency. All mandatory fees are clearly displayed during the booking process. Optional add-ons or service fees will always be shown before payment is processed."
                },
                {
                    question: "Can I pay in installments?",
                    answer: "Yes, for certain bookings over a minimum amount, we offer installment payment plans through our financing partners. This option will be displayed during checkout if available for your booking."
                }
            ]
        },
        {
            category: "Support",
            questions: [
                {
                    question: "How can I contact customer service?",
                    answer: "You can reach our customer service team through multiple channels: email at support@flydrivego.com, phone at +880 123-456-7890, or through the live chat feature on our website. Our team is available 24/7 to assist you."
                },
                {
                    question: "What should I do if my flight is delayed or cancelled?",
                    answer: "If your flight is delayed or cancelled, please contact our emergency support line immediately at +880 123-456-7890. Our team will help you find alternative arrangements and guide you through the process."
                },
                {
                    question: "Do you offer assistance for travelers with disabilities?",
                    answer: "Yes, we provide special assistance for travelers with disabilities. Please specify your requirements during the booking process or contact our customer service team at least 48 hours before your travel date to ensure appropriate arrangements."
                }
            ]
        }
    ];

    // Filter FAQs based on search term
    const filteredFAQs = faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(
            q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

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
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-SmokeWhite font-red-rose">
            {/* Hero Section */}
            <section className="bg-primary/5 py-20 px-4 md:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-CharcoleDark mb-6">Frequently Asked Questions</h1>
                    <p className="text-lg font-poppins text-CharcoleDark/70 max-w-3xl mx-auto">
                        Find answers to commonly asked questions about our services, bookings, and travel policies.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-8 max-w-xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search questions..."
                            className="w-full py-3 px-5 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <motion.section
                className="py-12 px-4 md:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-5xl mx-auto">
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((category, categoryIndex) => (
                            <motion.div
                                key={categoryIndex}
                                className="mb-10"
                                variants={itemVariants}
                            >
                                <h2 className="text-2xl font-bold text-CharcoleDark mb-4">{category.category}</h2>
                                <div className="space-y-4">
                                    {category.questions.map((faq, faqIndex) => {
                                        const index = `${categoryIndex}-${faqIndex}`;
                                        return (
                                            <motion.div
                                                key={index}
                                                className="bg-white rounded-xl shadow-sm overflow-hidden"
                                                variants={itemVariants}
                                            >
                                                <button
                                                    className="w-full flex justify-between items-center p-5 text-left font-semibold text-CharcoleDark hover:bg-gray-50 transition-colors"
                                                    onClick={() => handleToggle(index)}
                                                >
                                                    <span>{faq.question}</span>
                                                    {activeIndex === index ?
                                                        <ChevronUp className="text-primary flex-shrink-0" /> :
                                                        <ChevronDown className="text-primary flex-shrink-0" />
                                                    }
                                                </button>
                                                {activeIndex === index && (
                                                    <div className="p-5 border-t border-gray-100 font-poppins text-CharcoleDark/80">
                                                        <p>{faq.answer}</p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-600">No results found for "{searchTerm}"</p>
                            <button
                                className="mt-4 text-primary font-semibold hover:underline"
                                onClick={() => setSearchTerm("")}
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>

                {/* Contact Section */}
                <div className="max-w-3xl mx-auto mt-12 bg-primary/5 p-6 md:p-8 rounded-xl border border-primary/20">
                    <h3 className="text-2xl font-bold text-center mb-4">Still Have Questions?</h3>
                    <p className="text-center mb-6">Our customer support team is here to help you with any questions not covered in our FAQ.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="/contact" className="bg-primary text-white py-3 px-6 rounded-lg text-center hover:bg-primary/90 transition-colors">
                            Contact Support
                        </a>
                        <a href="tel:+8801234567890" className="border border-primary text-primary py-3 px-6 rounded-lg text-center hover:bg-primary/5 transition-colors">
                            Call Us: +880 123-456-7890
                        </a>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default FAQ;
