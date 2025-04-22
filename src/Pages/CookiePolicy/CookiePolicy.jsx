import React from "react";
import { motion } from "framer-motion";
import { FaCookieBite, FaInfoCircle, FaShieldAlt, FaClock, FaCog, FaExclamationTriangle } from "react-icons/fa";

const CookiePolicy = () => {
    const sections = [
        {
            id: "what-are-cookies",
            icon: FaCookieBite,
            title: "What Are Cookies",
            content: `Cookies are small text files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.

Cookies set by the website owner (in this case, FlyDriveGo) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g. advertising, interactive content, and analytics).`
        },
        {
            id: "cookies-we-use",
            icon: FaInfoCircle,
            title: "Cookies We Use",
            content: `We use both session cookies (which expire once you close your web browser) and persistent cookies (which stay on your device until you delete them).

Our website uses the following types of cookies:

1. **Essential cookies**: These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You may disable these by changing your browser settings, but this may affect how the website functions.

2. **Analytics cookies**: We use analytics cookies to help us understand how visitors interact with our website. These cookies collect information about your visit, such as the pages you view and the links you click on. This data is aggregated and anonymized, which means we cannot identify you personally. We use this information to improve our website and your browsing experience.

3. **Functional cookies**: These cookies enable enhanced functionality and personalization, such as videos, live chats, and remembering your preferences. They may be set by us or by third-party providers whose services we have added to our pages.

4. **Advertising/Targeting cookies**: These cookies allow us to deliver advertisements that are relevant to you. They track your browser across other websites and build a profile of your interests, which helps us display personalized content.`
        },
        {
            id: "your-choices",
            icon: FaCog,
            title: "Your Cookie Choices",
            content: `You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas may be restricted.

As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.

You can opt out of interest-based targeting provided by participating ad servers through the Digital Advertising Alliance (http://optout.aboutads.info/) or the Network Advertising Initiative (http://optout.networkadvertising.org).`
        },
        {
            id: "privacy",
            icon: FaShieldAlt,
            title: "Cookies and Privacy",
            content: `Our Privacy Policy explains how we protect your privacy in our use of cookies and other information. Please note that third parties (including, for example, advertising networks and providers of external services like web traffic analysis services) may also use cookies over which we have no control. These cookies are likely to be analytical/performance cookies or targeting cookies.

Any personal information collected through cookies will be processed in accordance with our Privacy Policy. By using our website, you consent to our use of cookies as described in this Cookie Policy.`
        },
        {
            id: "updates",
            icon: FaClock,
            title: "Updates to This Policy",
            content: `We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.

The date at the top of this Cookie Policy indicates when it was last updated.`
        },
        {
            id: "contact",
            icon: FaExclamationTriangle,
            title: "Questions and Concerns",
            content: `If you have any questions or concerns about our use of cookies or other technologies, please contact us using the following details:

Email: privacy@flydrivego.com
Phone: +880 123-456-7890
Address: Dhaka, Bangladesh`
        }
    ];

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

    // Jump to section functionality
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-SmokeWhite">
            {/* Hero Section */}
            <section className="bg-primary/5 py-20 px-4 md:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-red-rose font-bold text-CharcoleDark mb-6">Cookie Policy</h1>
                    <p className="text-lg font-poppins text-CharcoleDark/70 max-w-3xl mx-auto">
                        This Cookie Policy explains how FlyDriveGo uses cookies and similar technologies to recognize
                        and remember you when you visit our website.
                    </p>
                    <div className="mt-10">
                        <p className="text-sm font-poppins text-CharcoleDark/50">Last Updated: June 1, 2024</p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="py-12 px-4 md:px-8">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                            <h2 className="text-lg font-bold mb-4 text-CharcoleDark">On This Page</h2>
                            <ul className="space-y-2 font-poppins">
                                {sections.map(section => (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            className="text-primary hover:text-primary/70 transition-colors flex items-center gap-2 w-full text-left"
                                        >
                                            <section.icon size={16} />
                                            <span>{section.title}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Content */}
                    <motion.div
                        className="lg:col-span-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {sections.map(section => (
                            <motion.div
                                key={section.id}
                                id={section.id}
                                className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm"
                                variants={itemVariants}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <section.icon className="text-primary w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-red-rose font-bold text-CharcoleDark">{section.title}</h2>
                                </div>
                                <div className="font-poppins text-CharcoleDark/80 leading-relaxed space-y-4">
                                    {section.content.split('\n\n').map((paragraph, idx) => (
                                        <p key={idx}>{paragraph}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}

                        {/* Consent Management */}
                        <motion.div
                            className="bg-primary/5 p-6 md:p-8 rounded-xl"
                            variants={itemVariants}
                        >
                            <h3 className="text-xl font-red-rose font-bold text-CharcoleDark mb-4">
                                Managing Your Cookie Preferences
                            </h3>
                            <p className="font-poppins text-CharcoleDark/80 mb-6">
                                You can review and manage your cookie preferences at any time by clicking the button below.
                            </p>
                            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                                Cookie Settings
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Back to top button */}
            <div className="fixed bottom-8 right-8">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CookiePolicy;
