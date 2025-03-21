import { motion } from "framer-motion";
import { Plane, Heart } from "lucide-react";
import beachImg from "../../../assets/About/beach.jpg";

const OurStory = () => {
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-SmokeWhite to-background py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-primary" />
            <span className="font-poppins font-semibold text-primary uppercase tracking-wide relative">
              <motion.div
                className="absolute -top-16 -left-10 md:-top-[30px] md:-left-32"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <Plane className="w-16 h-16 text-primary" />
              </motion.div>
              Our Journey
            </span>
          </div>
          <motion.h2
            className="text-4xl md:text-5xl font-red-rose font-bold text-CharcoleDark mb-6"
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Redefining Travel Experiences
          </motion.h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            className="relative h-96 rounded-2xl overflow-hidden group"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60 }}
            viewport={{ once: true }}
          >
            <img
              src={beachImg}
              alt="Travel Concept"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-CharcoleDark/60 to-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <div className="absolute bottom-8 left-8 right-8">
              <motion.div
                className="text-background space-y-2"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
              >
                <h3 className="font-red-rose text-2xl font-bold">
                  Explore Beyond Boundaries
                </h3>
                <p className="font-poppins text-lg max-w-md">
                  Connecting travelers to unforgettable experiences worldwide
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Story Content */}
          <motion.div className="space-y-8" variants={staggerVariants}>
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-red-rose font-semibold text-CharcoleDark">
                From Vision to Reality
              </h3>
              <p className="font-poppins text-lg text-CharcoleDark/90 leading-relaxed">
                Born from a passion for seamless travel, FlyDriveGo began as a
                simple idea in 2023: to create a unified platform that empowers
                travelers. Frustrated by fragmented booking systems, our
                founders set out to build a solution that combines flights,
                accommodations, and local experiences in one intuitive
                interface.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h4 className="font-poppins font-semibold text-lg mb-2">
                  Travel with Purpose
                </h4>
                <p className="font-poppins text-CharcoleDark/80">
                  We're committed to sustainable tourism. For every booking
                  made, we partner with local communities to preserve cultural
                  heritage and protect natural wonders.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Milestone Timeline */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          variants={staggerVariants}
        >
          {[2023, 2024, 2025].map((year) => (
            <motion.div
              key={year}
              variants={itemVariants}
              className="group relative p-6 bg-background rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -10 }}
            >
              <div className="absolute -top-4 left-6 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-poppins font-bold">
                  {year}
                </span>
              </div>
              <p className="mt-6 font-poppins text-CharcoleDark/80">
                {year === 2023 && "Concept Development"}
                {year === 2024 && "Platform Launch"}
                {year === 2025 && "Global Expansion"}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="absolute top-1/3 right-32 w-48 h-48 bg-secondary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
};

export default OurStory;
