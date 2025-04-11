import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Book, FileText, CreditCard, Users, Plane, Bus, Briefcase, Globe, AlertTriangle } from 'lucide-react';

const Terms = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    // Sections with icons
    const sections = [
        {
            id: 'general',
            title: 'General Terms',
            icon: Shield,
            content: `These Terms and Conditions ("Terms") govern your use of the FlyDriveGo website and services, including mobile applications and related services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our Services. FlyDriveGo reserves the right to modify these Terms at any time without prior notice. Your continued use of the Services after changes indicates your acceptance of the modified Terms.`
        },
        {
            id: 'booking',
            title: 'Booking and Payments',
            icon: CreditCard,
            content: `All bookings are subject to availability and confirmation. Prices are subject to change without notice until payment is made in full. Payment can be made using credit/debit cards, bank transfers, or other payment methods specified during checkout. For certain bookings, a deposit may be required to secure your reservation, with the balance due before the service date. All prices are displayed in the selected currency and include applicable taxes unless otherwise stated. Additional fees may apply for specific payment methods or currency conversions. FlyDriveGo uses secure payment gateways, but is not responsible for any issues arising from payment processing by third-party providers.`
        },
        {
            id: 'cancellation',
            title: 'Cancellation and Refund Policy',
            icon: AlertTriangle,
            content: `Cancellation policies vary by service type, provider, and fare class. Full policy details will be provided during the booking process. Generally: (1) For flight bookings, cancellations made more than 72 hours before departure may be eligible for a partial refund or credit, subject to airline policies. (2) For tour packages, cancellations made 30+ days before departure may receive up to 80% refund; 15-29 days: up to 50% refund; 7-14 days: up to 25% refund; less than 7 days: no refund available. (3) For transportation services, cancellations made 48+ hours in advance may be eligible for a partial refund. Special circumstances (medical emergencies, etc.) may be considered on a case-by-case basis with proper documentation. Processing of approved refunds typically takes 7-14 business days.`
        },
        {
            id: 'accounts',
            title: 'User Accounts',
            icon: Users,
            content: `You may need to create an account to access certain Services. You are responsible for maintaining the confidentiality of your account information and for all activities under your account. You must provide accurate, current, and complete information and update it as necessary. FlyDriveGo reserves the right to suspend or terminate accounts that contain false information or violate these Terms. You agree to notify us immediately of any unauthorized use of your account. We may send service-related announcements to the email address associated with your account.`
        },
        {
            id: 'transport',
            title: 'Transportation Services',
            icon: Plane,
            content: `For air travel, FlyDriveGo acts as an intermediary between you and the airlines. All flights are subject to the airline's terms and conditions, which you agree to when booking. Check-in times, baggage allowances, and other policies are set by the airlines. Flight schedules may change; it is your responsibility to verify the timing before travel. For bus and road transportation services, bookings are subject to the specific terms of each provider. Seat selections are not guaranteed and may be changed due to operational requirements. FlyDriveGo is not liable for delays, cancellations, or service disruptions caused by factors outside our control, including but not limited to weather conditions, mechanical issues, traffic, or regulatory actions.`
        },
        {
            id: 'tours',
            title: 'Tour Packages',
            icon: Globe,
            content: `Tour itineraries, activities, and accommodations are subject to change due to weather conditions, local circumstances, or other unforeseeable events. While we strive to provide all services as advertised, alternatives of similar value and quality may be substituted when necessary. Tour inclusions and exclusions are clearly listed in each package description. Any services not explicitly mentioned are considered excluded. Special requirements (dietary, accessibility, etc.) must be communicated during booking and are subject to availability. FlyDriveGo is not responsible for any loss, injury, or inconvenience due to delays, changes, or actions of any government or authority, or for acts or omissions by third-party service providers.`
        },
        {
            id: 'visa',
            title: 'Visa Assistance Services',
            icon: FileText,
            content: `Our visa assistance services help facilitate visa applications but do not guarantee approval, which remains at the sole discretion of the relevant immigration authorities. You are responsible for providing accurate and truthful information. FlyDriveGo is not responsible for visa application rejections due to incomplete or inaccurate information provided by you, changes in visa policies, or decisions made by immigration authorities. Processing times are estimates only and may vary. Additional fees charged by embassies, consulates, or government agencies are separate from our service fees and are non-refundable regardless of application outcome.`
        },
        {
            id: 'liability',
            title: 'Limitation of Liability',
            icon: AlertTriangle,
            content: `To the maximum extent permitted by law, FlyDriveGo, its affiliates, and their respective officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to lost profits, lost data, personal injury, or property damage related to or resulting from your use of the Services. FlyDriveGo's total liability for any claims arising from the Services shall not exceed the amount paid by you for the specific service giving rise to the claim. Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability, so these limitations may not apply to you.`
        },
        {
            id: 'partners',
            title: 'Partner Relationships',
            icon: Briefcase,
            content: `FlyDriveGo partners with various service providers, including airlines, hotels, tour operators, and transportation companies. These partners are independent contractors and not agents or employees of FlyDriveGo. We are not liable for the acts, errors, omissions, representations, warranties, breaches, or negligence of any such suppliers or for any personal injuries, death, property damage, or other damages resulting therefrom. FlyDriveGo makes no warranties or representations regarding the quality of service provided by these partners beyond what is stated in our service descriptions.`
        },
        {
            id: 'ip',
            title: 'Intellectual Property',
            icon: Book,
            content: `All content on the FlyDriveGo platform, including text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is owned by FlyDriveGo or its content suppliers and is protected by international copyright laws. The compilation of all content on the site is the exclusive property of FlyDriveGo. All software used on the site is the property of FlyDriveGo or its software suppliers and is protected by international copyright laws. You may not reproduce, distribute, modify, create derivative works of, publicly display or perform, republish, download, store, or transmit any content from our platform without our express written consent.`
        }
    ];

    // Jump to section functionality
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-SmokeWhite">
            {/* Hero Section */}
            <section className="bg-primary/5 py-20 px-4 md:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-red-rose font-bold text-CharcoleDark mb-6">Terms & Conditions</h1>
                    <p className="text-lg font-poppins text-CharcoleDark/70 max-w-3xl mx-auto">
                        Please read these terms and conditions carefully before using our travel services. By accessing or using FlyDriveGo, you agree to be bound by these terms.
                    </p>
                    <div className="mt-10">
                        <p className="text-sm font-poppins text-CharcoleDark/50">Last Updated: June 1, 2024</p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <motion.section
                className="py-12 px-4 md:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-5xl mx-auto">
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

                    {/* Final Notes */}
                    <motion.div
                        className="bg-primary/5 p-6 md:p-8 rounded-xl"
                        variants={itemVariants}
                    >
                        <h2 className="text-2xl font-red-rose font-bold text-CharcoleDark mb-4">Final Notes</h2>
                        <div className="font-poppins text-CharcoleDark/80 leading-relaxed">
                            <p>These Terms shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions. Any dispute arising under or relating to these Terms shall be resolved in the courts of Bangladesh.</p>
                            <p className="mt-4">If you have any questions about these Terms, please contact us at:</p>
                            <p className="mt-2 font-semibold">support@flydrivego.com</p>
                            <p>123 Airport Road, Dhaka, Bangladesh</p>
                            <p>Phone: +880 1234 567890</p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

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

export default Terms;