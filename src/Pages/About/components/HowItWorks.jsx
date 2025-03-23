import { motion } from "framer-motion";
import { Search, CalendarCheck, Ticket, Navigation } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover & Explore",
      description: "Search destinations using smart filters and AI recommendations",
      color: "primary"
    },
    {
      icon: CalendarCheck,
      title: "Plan & Schedule",
      description: "Select dates and customize your itinerary with local experiences",
      color: "secondary"
    },
    {
      icon: Ticket,
      title: "Instant Booking",
      description: "Secure reservations with flexible payment options",
      color: "primary"
    },
    {
      icon: Navigation,
      title: "Travel & Enjoy",
      description: "Access digital passes and real-time navigation support",
      color: "secondary"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 }
    }
  };

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-red-rose font-bold text-primary mb-4">
            Simple 4-Step Process
          </h2>
          <p className="font-poppins text-CharcoleDark/80 max-w-2xl mx-auto text-lg">
            Your journey from dream vacation to real adventure made effortless
          </p>
        </motion.div>

        {/* Process Timeline */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {/* Animated Connector Line */}
          <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-1 bg-primary/10">
            <motion.div 
              className="h-full bg-primary origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Step Card */}
              <div className="h-full bg-background p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Animated Icon */}
                <motion.div 
                  className={`w-16 h-16 ${step.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'} rounded-2xl flex items-center justify-center mb-6`}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <step.icon className={`w-8 h-8 ${step.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                </motion.div>

                {/* Step Number */}
                <div className={`absolute top-8 right-8 w-8 h-8 rounded-full flex items-center justify-center ${step.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                  <span className={`font-poppins font-bold ${step.color === 'primary' ? 'text-primary' : 'text-secondary'}`}>
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-red-rose font-semibold text-CharcoleDark mb-3">
                  {step.title}
                </h3>
                <p className="font-poppins text-CharcoleDark/80 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Mobile Connector */}
              {index !== steps.length - 1 && (
                <div className="lg:hidden absolute -bottom-12 left-1/2 w-1 h-12 bg-primary/10 transform -translate-x-1/2">
                  <motion.div 
                    className="h-full bg-primary origin-top"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
              )}
            </motion.div>
          ))}
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

export default HowItWorks;