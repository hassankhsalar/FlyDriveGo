import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShieldAlt, FaUserShield, FaCookieBite, FaKey, FaGlobe, FaRegClock, FaUserLock, FaChild } from 'react-icons/fa';

const Privacy = () => {
    const [activeSection, setActiveSection] = useState('introduction');
    const [scrollY, setScrollY] = useState(0);

    // Handle scroll for parallax effects and active section tracking
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);

            // Update active section based on scroll position
            const sections = document.querySelectorAll('.privacy-section');
            let currentSectionId = activeSection;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSectionId = section.id;
                }
            });

            if (currentSectionId !== activeSection) {
                setActiveSection(currentSectionId);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);

    // Scroll to section when clicking on nav link
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen font-poppins relative overflow-hidden">
            {/* Background decorative elements that move slightly on scroll for parallax effect */}
            <div
                className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 transform transition-transform duration-1000 ease-out"
                style={{ transform: `translate(${scrollY * 0.03}px, ${-scrollY * 0.02}px)` }}
            ></div>
            <div
                className="absolute bottom-40 left-20 w-80 h-80 bg-secondary opacity-5 rounded-full transform transition-transform duration-1000 ease-out"
                style={{ transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.01}px)` }}
            ></div>

            {/* Content container */}
            <div className="container mx-auto px-4 py-12 relative z-10">
                {/* Back button */}
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center text-primary hover:text-primary-dark transition-all group"
                    >
                        <span className="inline-block transform group-hover:-translate-x-1 transition-transform duration-300 ease-in-out mr-2">
                            <FaArrowLeft />
                        </span>
                        <span className="font-medium">Back to Home</span>
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-16 transition-all duration-500 ease-out transform translate-y-0 opacity-100"
                    style={{ transform: `translateY(${Math.min(scrollY * 0.1, 20)}px)`, opacity: 1 - Math.min(scrollY * 0.001, 0.3) }}>
                    <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                        <FaShieldAlt className="text-4xl text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-red-rose font-bold text-CharcoleDark mb-4">Privacy Policy</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        At FlyDriveGo, we value your privacy and are committed to protecting your personal information.
                        This Privacy Policy explains how we collect, use, and safeguard your data.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Last Updated: April 10, 2025</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Side navigation for larger screens */}
                    <div className="md:w-1/4 mb-8 md:mb-0">
                        <div className="sticky top-24 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-CharcoleDark mb-4">Contents</h2>
                            <nav>
                                <ul className="space-y-1">
                                    {[
                                        { id: 'introduction', label: 'Introduction', icon: <FaUserShield className="text-primary" /> },
                                        { id: 'information-collection', label: 'Information We Collect', icon: <FaUserLock className="text-primary" /> },
                                        { id: 'information-use', label: 'How We Use Information', icon: <FaKey className="text-primary" /> },
                                        { id: 'information-sharing', label: 'Information Sharing', icon: <FaGlobe className="text-primary" /> },
                                        { id: 'cookies', label: 'Cookies & Tracking', icon: <FaCookieBite className="text-primary" /> },
                                        { id: 'user-rights', label: 'Your Rights', icon: <FaUserLock className="text-primary" /> },
                                        { id: 'data-retention', label: 'Data Retention', icon: <FaRegClock className="text-primary" /> },
                                        { id: 'children', label: 'Children\'s Privacy', icon: <FaChild className="text-primary" /> },
                                    ].map((item) => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => scrollToSection(item.id)}
                                                className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === item.id
                                                        ? 'bg-primary/10 text-primary font-medium'
                                                        : 'hover:bg-gray-100 text-gray-600'
                                                    }`}
                                            >
                                                <span className="inline-block w-5 h-5">{item.icon}</span>
                                                {item.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-xl shadow-md p-8 divide-y divide-gray-100">
                            {/* Introduction */}
                            <section id="introduction" className="privacy-section py-8 transition-all duration-500 ease-in-out transform hover:translate-x-1 hover:shadow-sm">
                                <h2 className="text-2xl font-semibold text-CharcoleDark mb-4 flex items-center gap-3">
                                    <FaUserShield className="text-primary" />
                                    Introduction
                                </h2>
                                <div className="prose max-w-none text-gray-600">
                                    <p>
                                        Welcome to FlyDriveGo's Privacy Policy. We respect your privacy and are committed to protecting
                                        your personal data. This Privacy Policy will inform you as to how we look after your personal data
                                        when you visit our website and tell you about your privacy rights and how the law protects you.
                                    </p>
                                    <p className="mt-4">
                                        This Privacy Policy aims to give you information on how FlyDriveGo collects and processes your personal data
                                        through your use of this website, including any data you may provide through this website when you
                                        sign up for our service, purchase a product or service, or take part in a promotion.
                                    </p>
                                    <p className="mt-4">
                                        It is important that you read this Privacy Policy together with any other privacy policy or fair
                                        processing notice we may provide on specific occasions when we are collecting or processing personal
                                        data about you so that you are fully aware of how and why we are using your data.
                                    </p>
                                </div>
                            </section>

                            {/* Information We Collect */}
                            <section id="information-collection" className="privacy-section py-8 transition-all duration-500 ease-in-out transform hover:translate-x-1 hover:shadow-sm">
                                <h2 className="text-2xl font-semibold text-CharcoleDark mb-4 flex items-center gap-3">
                                    <FaUserLock className="text-primary" />
                                    Information We Collect
                                </h2>
                                <div className="prose max-w-none text-gray-600">
                                    <p>
                                        We collect several types of information from and about users of our website, including:
                                    </p>
                                    <ul className="list-disc pl-6 mt-2 space-y-2">
                                        <li>
                                            <span className="font-medium">Personal identifiers</span>:
                                            Such as name, email address, phone number, postal address, account username and password.
                                        </li>
                                        <li>
                                            <span className="font-medium">Booking information</span>:
                                            Details related to your travel bookings, including flight information, hotel reservations,
                                            car rentals, and other travel services.
                                        </li>
                                        <li>
                                            <span className="font-medium">Payment information</span>:
                                            Credit card details, billing address, and other financial information needed to process transactions.
                                        </li>
                                        <li>
                                            <span className="font-medium">Demographic information</span>:
                                            Such as your age, gender, nationality, and preferences.
                                        </li>
                                        <li>
                                            <span className="font-medium">Technical information</span>:
                                            Internet protocol (IP) address, login data, browser type and version, time zone setting, browser
                                            plug-in types and versions, operating system and platform, and other technology on the devices
                                            you use to access this website.
                                        </li>
                                        <li>
                                            <span className="font-medium">Usage data</span>:
                                            Information about how you use our website, products, and services.
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* How We Use Information */}
                            <section id="information-use" className="privacy-section py-8 transition-all duration-500 ease-in-out transform hover:translate-x-1 hover:shadow-sm">
                                <h2 className="text-2xl font-semibold text-CharcoleDark mb-4 flex items-center gap-3">
                                    <FaKey className="text-primary" />
                                    How We Use Information
                                </h2>
                                <div className="prose max-w-none text-gray-600">
                                    <p>
                                        We use your personal information in the following ways:
                                    </p>
                                    <ul className="list-disc pl-6 mt-2 space-y-2">
                                        <li>To create and manage your account</li>
                                        <li>To process and fulfill your bookings</li>
                                        <li>To provide customer support</li>
                                        <li>To send administrative information, such as updates to our terms and policies</li>
                                        <li>To send marketing communications (with your consent)</li>
                                        <li>To improve our website, products, and services</li>
                                        <li>To personalize your experience</li>
                                        <li>To conduct data analysis and research</li>
                                        <li>To comply with legal obligations</li>
                                    </ul>
                                    <p className="mt-4">
                                        We will only use your personal data for the purposes for which we collected it, unless we reasonably
                                        consider that we need to use it for another reason and that reason is compatible with the original
                                        purpose.
                                    </p>
                                </div>
                            </section>

                            {/* Information Sharing */}
                            <section id="information-sharing" className="privacy-section py-8 transition-all duration-500 ease-in-out transform hover:translate-x-1 hover:shadow-sm">
                                <h2 className="text-2xl font-semibold text-CharcoleDark mb-4 flex items-center gap-3">
                                    <FaGlobe className="text-primary" />
                                    Information Sharing
                                </h2>
                                <div className="prose max-w-none text-gray-600">
                                    <p>
                                        We may share your personal information with:
                                    </p>
                                    <ul className="list-disc pl-6 mt-2 space-y-2">
                                        <li>
                                            <span className="font-medium">Service providers</span>:
                                            Third-party vendors who perform services on our behalf, such as payment processing, data analysis,
                                            email delivery, hosting services, and customer service.
                                        </li>
                                        <li>
                                            <span className="font-medium">Travel suppliers</span>:
                                            Airlines, hotels, car rental companies, and other travel service providers to fulfill your bookings.
                                        </li>
                                        <li>
                                            <span className="font-medium">Business partners</span>:
                                            Companies we partner with to offer joint promotions or products.
                                        </li>
                                        <li>
                                            <span className="font-medium">Legal authorities</span>:
                                            When required by law, court order, or governmental regulation.
                                        </li>
                                    </ul>
                                    <p className="mt-4">
                                        We require all third parties to respect the security of your personal data and to treat it in
                                        accordance with the law. We do not allow our third-party service providers to use your personal
                                        data for their own purposes and only permit them to process your personal data for specified
                                        purposes and in accordance with our instructions.
                                    </p>
                                </div>
                            </section>

                            {/* Cookies & Tracking */}
                            <section id="cookies" className="privacy-section py-8 transition-all duration-500 ease-in-out transform hover:translate-x-1 hover:shadow-sm">
                                <h2 className="text-2xl font-semibold text-CharcoleDark mb-4 flex items-center gap-3">
                                    <FaCookieBite className="text-primary" />
                                    Cookies & Tracking
                                </h2>
                                <div className="prose max-w-none text-gray-600">
                                    <p>
                                        We use cookies and similar tracking technologies to track activity on our website and hold certain
                                        information. Cookies are files with small amounts of data that may include an anonymous unique identifier.
                                    </p>
                                    <p className="mt-3">
                                        We use the following types of cookies:
                                    </p>
                                    <ul className="list-disc pl-6 mt-2 space-y-2">
                                        <li>
                                            <span className="font-medium">Essential cookies</span>:
                                            Necessary for the website to function and cannot be switched off in our systems.
                                        </li>
                                        <li>
                                            <span className="font-medium">Performance cookies</span>:
                                            Allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                                        </li>
                                        <li>
                                            <span className="font-medium">Functionality cookies</span>:
                                            Enable the website to provide enhanced functionality and personalization.
                                        </li>
                                        <li>
                                            <span className="font-medium">Targeting cookies</span>:
                                            May be set through our site by our advertising partners to build a profile of your interests.
                                        </li>
                                    </ul>
                                    <p className="mt-4">
                                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                                        However, if you do not accept cookies, you may not be able to use some portions of our website.
                                    </p>
                                </div>
                            </section>

                            {/* Your Rights */}
                            <section id="user-rights" className="privacy-section py-8 transition-all duration-500 ease-in-out transform hover:translate-x-1 hover:shadow-sm">
                                <h2 className="text-2xl font-semibold text-CharcoleDark mb-4 flex items-center gap-3">
                                    <FaUserLock className="text-primary" />
                                    Your Rights
                                </h2>
                                <div className="prose max-w-none text-gray-600">
                                    <p>
                                        Depending on your location, you may have certain rights regarding your personal information, including:
                                    </p>
                                    <ul className="list-disc pl-6 mt-2 space-y-2">
                                        <li>The right to access your personal information</li>
                                        <li>The right to correct inaccurate or incomplete information</li>
                                        <li>The right to delete your personal information</li>
                                        <li>The right to restrict the processing of your personal information</li>
                                        <li>The right to data portability</li>
                                        <li>The right to object to processing of your personal information</li>
                                        <li>The right to withdraw consent at any time</li>
                                    </ul>
                                    <p className="mt-4">
                                        To exercise these rights, please contact us using the details provided in the "Contact Us" section.
                                        We may need to request specific information from you to help us confirm your identity and ensure your
                                        right to access your personal data (or to exercise any of your other rights).
                                    </p>
                                </div>
                            </section>

                            {/* Data Retention */}
                            <section id="data-retention" className="privacy-section py-8 transition-all duration-500 ease-in-out transform hover:translate-x-1 hover:shadow-sm">
                                <h2 className="text-2xl font-semibold text-CharcoleDark mb-4 flex items-center gap-3">
                                    <FaRegClock className="text-primary" />
                                    Data Retention
                                </h2>
                                <div className="prose max-w-none text-gray-600">
                                    <p>
                                        We will only retain your personal data for as long as necessary to fulfill the purposes we collected
                                        it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                                    </p>
                                    <p className="mt-4">
                                        To determine the appropriate retention period for personal data, we consider the amount, nature, and
                                        sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of
                                        your personal data, the purposes for which we process your personal data, and whether we can achieve
                                        those purposes through other means, and the applicable legal requirements.
                                    </p>
                                    <p className="mt-4">
                                        In some circumstances, we may anonymize your personal data (so that it can no longer be associated with
                                        you) for research or statistical purposes, in which case we may use this information indefinitely without
                                        further notice to you.
                                    </p>
                                </div>
                            </section>

                            {/* Children's Privacy */}
                            <section id="children" className="privacy-section py-8 transition-all duration-500 ease-in-out transform hover:translate-x-1 hover:shadow-sm">
                                <h2 className="text-2xl font-semibold text-CharcoleDark mb-4 flex items-center gap-3">
                                    <FaChild className="text-primary" />
                                    Children's Privacy
                                </h2>
                                <div className="prose max-w-none text-gray-600">
                                    <p>
                                        Our website is not intended for children under the age of 16, and we do not knowingly collect personal
                                        data from children under 16. If you are under 16, please do not provide any personal information on this
                                        website.
                                    </p>
                                    <p className="mt-4">
                                        If we learn that we have collected personal data from a child under the age of 16 without verification
                                        of parental consent, we will take steps to delete that information as quickly as possible.
                                    </p>
                                    <p className="mt-4">
                                        If you believe we might have any information from or about a child under 16, please contact us using
                                        the details provided below.
                                    </p>
                                </div>
                            </section>

                            {/* Contact Us */}
                            <section className="privacy-section py-8 transition-all duration-500 ease-in-out transform hover:translate-x-1 hover:shadow-sm">
                                <h2 className="text-2xl font-semibold text-CharcoleDark mb-4">Contact Us</h2>
                                <div className="prose max-w-none text-gray-600">
                                    <p>
                                        If you have any questions about this Privacy Policy, please contact us:
                                    </p>
                                    <ul className="list-disc pl-6 mt-2 space-y-2">
                                        <li>By email: privacy@flydrivego.com</li>
                                        <li>By phone: +1 (555) 123-4567</li>
                                        <li>By mail: FlyDriveGo Privacy Office, 123 Travel Street, San Francisco, CA 94105, USA</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Updates to Privacy Policy */}
                            <section className="privacy-section py-8 transition-all duration-500 ease-in-out transform hover:translate-x-1 hover:shadow-sm">
                                <h2 className="text-2xl font-semibold text-CharcoleDark mb-4">Updates to Privacy Policy</h2>
                                <div className="prose max-w-none text-gray-600">
                                    <p>
                                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting
                                        the new Privacy Policy on this page and updating the "Last Updated" date.
                                    </p>
                                    <p className="mt-4">
                                        You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                                        Policy are effective when they are posted on this page.
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* Need more help */}
                        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
                            <h3 className="font-red-rose text-2xl font-semibold text-CharcoleDark mb-4">Need More Information?</h3>
                            <p className="text-gray-600 mb-6">
                                If you have specific questions about your privacy or how we handle your data, our team is here to help.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/contact"
                                    className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
                                >
                                    Contact Our Privacy Team
                                </Link>
                                <Link
                                    to="/faq"
                                    className="inline-block bg-white text-primary border border-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
                                >
                                    View Privacy FAQs
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
