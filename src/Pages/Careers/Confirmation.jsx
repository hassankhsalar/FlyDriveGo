import { motion } from "framer-motion";
import {
  CheckCircle,
  Mail,
  Clock,
  Briefcase,
  Home,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

const Confirmation = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const confirmationItems = [
    {
      icon: Clock,
      title: "Next Steps Timeline",
      content: "Expect to hear back within 5-7 business days",
    },
    {
      icon: Mail,
      title: "Check Your Email",
      content: "We've sent a confirmation to your inbox",
    },
    {
      icon: Briefcase,
      title: "Explore Other Roles",
      content: "View similar positions in our careers section",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-SmokeWhite to-background"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content Card */}
        <motion.div
          className="bg-background rounded-2xl shadow-xl p-8 md:p-12 text-center border border-SmokeWhite"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
        >
          {/* Animated Checkmark */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <CheckCircle
              className="w-20 h-20 text-primary"
              fill="currentColor"
            />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-red-rose font-bold text-CharcoleDark mb-4">
            Application Received!
          </h1>
          <p className="font-poppins text-CharcoleDark/80 text-lg mb-12 max-w-2xl mx-auto">
            Thank you for applying to FlyDriveGo. We've successfully received
            your application and will be reviewing it carefully. Here's what you
            can expect next:
          </p>

          {/* Information Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {confirmationItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="p-6 bg-SmokeWhite rounded-xl"
              >
                <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-red-rose font-semibold text-CharcoleDark mb-2">
                  {item.title}
                </h3>
                <p className="font-poppins text-CharcoleDark/80">
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-poppins font-semibold hover:bg-primary/90 transition-all"
            >
              <Home className="w-5 h-5" />
              Return Home
            </button>

            <div className="relative group">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-lg font-poppins font-semibold hover:bg-primary/10 transition-all"
              >
                <Share2 className="w-5 h-5" />
                Share Position
              </button>

              {/* Social Share Dropdown */}
              <div className="font-red-rose absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex gap-2 bg-white p-2 rounded-lg shadow-lg border border-SmokeWhite">
                <FacebookShareButton url={currentUrl}>
                  <button className="p-2 hover:bg-SmokeWhite rounded">
                    <span className="text-[#1877F2]">Facebook</span>
                  </button>
                </FacebookShareButton>

                <TwitterShareButton url={currentUrl}>
                  <button className="p-2 hover:bg-SmokeWhite rounded">
                    <span className="text-[#1DA1F2]">Twitter</span>
                  </button>
                </TwitterShareButton>

                <LinkedinShareButton url={currentUrl}>
                  <button className="p-2 hover:bg-SmokeWhite rounded">
                    <span className="text-[#0A66C2]">LinkedIn</span>
                  </button>
                </LinkedinShareButton>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Follow Up Section */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-poppins text-CharcoleDark/80 mb-4">
            Have questions? Reach out to our recruitment team:
          </p>
          <a
            href="mailto:careers@flydrivego.com"
            className="text-primary font-semibold hover:underline font-red-rose"
          >
            careers@flydrivego.com
          </a>
        </motion.div>

        {/* Background Elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
        >
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Confirmation;
