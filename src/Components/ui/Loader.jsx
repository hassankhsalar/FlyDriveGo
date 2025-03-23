import { motion } from "framer-motion";

const Loader = () => {
  const text = "FLYDRIVEGO".split("");

  return (
    <div className="fixed inset-0 z-50 bg-SmokeWhite flex flex-col items-center justify-center">
      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        transition={{
          scale: { duration: 0.4, ease: "backOut" },
          opacity: { duration: 0.3 },
        }}
      >
        <img src="/logo.png" alt="Logo" className="w-32 h-32 object-contain" />
      </motion.div>

      {/* Text and Progress Bar Container */}
      <div className="relative">
        {/* Faster Text Animation */}
        <motion.div
          className="inline-flex text-4xl font-red-rose font-bold text-primary"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.2,  // Reduced from 0.3
                staggerChildren: 0.05, // Reduced from 0.01
              },
            },
          }}
        >
          {text.map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,  // Reduced from 20
                  scale: 0.8, // Increased from 0.8
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 250, // Increased from 100
                    damping: 10,    // Added for faster spring
                    mass: 0.5       // Added for faster movement
                  },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="absolute top-full left-0 right-0 h-1 bg-primary/10 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.5, // Slightly faster
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="h-full bg-primary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.5, // Matches parent duration
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;