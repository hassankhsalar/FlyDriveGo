import { motion } from "framer-motion";
import { ShieldCheck, Globe, Medal, Handshake } from "lucide-react";
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

const PartnershipsTrust = () => {
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

  const stats = [
    { icon: ShieldCheck, value: "1M+", label: "Bookings Protected" },
    { icon: Globe, value: "150+", label: "Countries Covered" },
    { icon: Medal, value: "98%", label: "Positive Reviews" },
    { icon: Handshake, value: "200+", label: "Trusted Partners" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-red-rose font-bold text-primary mb-4">
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

        {/* Trust Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 bg-background rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              whileHover={{ y: -10 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-3xl font-red-rose font-bold text-CharcoleDark">
                  {stat.value}
                </span>
              </div>
              <p className="font-poppins text-lg text-CharcoleDark/80">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="relative p-8 bg-primary/5 rounded-2xl border-l-4 border-primary"
          >
            <blockquote className="text-CharcoleDark/90 italic text-lg">
              "Our partnership with FlyDriveGo has enabled us to reach new
              audiences while maintaining our commitment to exceptional service
              standards."
            </blockquote>
            <div className="mt-6 font-poppins font-semibold">
              — Global Airline Partner
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative p-8 bg-secondary/30 rounded-2xl border-l-4 border-secondary"
          >
            <blockquote className="text-CharcoleDark/90 italic text-lg">
              "The seamless integration and mutual trust have made this
              collaboration a cornerstone of our customer satisfaction
              strategy."
            </blockquote>
            <div className="mt-6 font-poppins font-semibold">
              — Luxury Hotel Chain
            </div>
          </motion.div>
        </motion.div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipsTrust;
