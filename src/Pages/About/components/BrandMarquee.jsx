import { motion } from "framer-motion";
import BimanBangladesh from "../../../assets/airwaysLogo/bimanbangladesh.webp";
import USBangla from "../../../assets/airwaysLogo/usbangla.webp";
import novo from "../../../assets/airwaysLogo/novo.webp";
import china from "../../../assets/airwaysLogo/china.webp";
import saudia from "../../../assets/airwaysLogo/saudia.webp";
import emirets from "../../../assets/airwaysLogo/emirets.webp";
import flydubai from "../../../assets/airwaysLogo/flydubai.webp";
import salamair from "../../../assets/airwaysLogo/salamair.webp";
import singapore from "../../../assets/airwaysLogo/singapore.webp";
import arabia from "../../../assets/airwaysLogo/arabia.webp";
import indigo from "../../../assets/airwaysLogo/indigo.webp";
import airarabia from "../../../assets/airwaysLogo/airarabia.webp";

const BrandMarquee = ({ className }) => {
    const partners = [
        { name: "Airline Partner 1", logo: BimanBangladesh },
        { name: "Airline Partner 2", logo: USBangla },
        { name: "Airline Partner 3", logo: novo },
        { name: "Airline Partner 4", logo: china },
        { name: "Airline Partner 5", logo: saudia },
        { name: "Airline Partner 6", logo: emirets },
        { name: "Airline Partner 7", logo: flydubai },
        { name: "Airline Partner 8", logo: salamair },
        { name: "Airline Partner 9", logo: singapore },
        { name: "Airline Partner 10", logo: arabia },
        { name: "Airline Partner 11", logo: indigo },
        { name: "Airline Partner 12", logo: airarabia },
    ];

    return (
        <div className={`container mx-auto px-4 md:px-8 lg:px-16 py-20 ${className || 'bg-background'}`}>
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-4xl font-red-rose font-bold text-primary mb-4">
                    Trusted Global Network
                </h2>
                <p className="font-poppins text-CharcoleDark/80 max-w-2xl mx-auto text-lg">
                    Collaborating with world-class providers to deliver exceptional
                    travel experiences
                </p>
            </motion.div>

            {/* Partner Logos Grid */}
            <motion.div className="overflow-hidden py-8">
                <motion.div
                    className="flex"
                    animate={{ x: ["-100%", "0%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {[...partners, ...partners].map((partner, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 px-8 w-[200px]"
                            whileHover={{ scale: 1.1 }}
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-all"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default BrandMarquee