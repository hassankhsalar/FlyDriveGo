import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Ticket,
  Globe,
  Currency,
  BadgeCheck,
} from "lucide-react";

const WhyChooseUs = () => {
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

  const features = [
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      description: "Bank-level encryption and data security protocols",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance from our global travel experts",
    },
    {
      icon: Ticket,
      title: "Exclusive Deals",
      description: "Access member-only discounts and priority bookings",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "5000+ destinations across 100+ countries worldwide",
    },
    {
      icon: Currency,
      title: "Multi-Currency",
      description: "Pay in 50+ currencies with zero conversion fees",
    },
    {
      icon: BadgeCheck,
      title: "Best Price Guarantee",
      description: "We'll match any lower price you find within 24 hours",
    },
  ];

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-SmokeWhite overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-red-rose font-bold text-primary mb-4">
            Why Choose FlyDriveGo?
          </h2>
          <p className="font-poppins text-CharcoleDark/80 max-w-2xl mx-auto text-lg">
            Discover the difference of smart, seamless travel planning powered
            by cutting-edge technology and human expertise
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -10 }}
            >
              {/* Animated Background Element */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 rounded-2xl"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Floating Icon */}
              <motion.div
                className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <feature.icon className="w-8 h-8 text-primary" />
              </motion.div>

              <h3 className="text-2xl font-red-rose font-semibold text-CharcoleDark mb-3">
                {feature.title}
              </h3>
              <p className="font-poppins text-CharcoleDark/80 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Indicator */}
              <div className="absolute bottom-6 left-8 right-8 h-1 bg-primary/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        >
          <div className="blob absolute -left-32 top-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="blob absolute -right-32 top-1/3 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
