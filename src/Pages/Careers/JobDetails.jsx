import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Clock,
  MapPin,
  DollarSign,
  Globe,
  Send,
  ArrowRight,
} from "lucide-react";
import Loader from "../../components/ui/Loader";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/jobs.json")
      .then((res) => res.json())
      .then((data) => {
        const foundJob = data.find((j) => j.id === parseInt(jobId));

        if (foundJob) {
          setJob(foundJob);
        } else {
          // Handle job not found
          console.error("Job not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
        setLoading(false);
      });
  }, [jobId]);

  const handleApplyNow = () => {
    navigate(`/careers/apply/${jobId}`);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-SmokeWhite to-background flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-SmokeWhite to-background flex flex-col items-center justify-center">
        <p className="text-xl font-poppins mb-4">Job not found</p>
        <button
          onClick={() => navigate("/careers")}
          className="bg-primary text-white font-poppins px-6 py-3 rounded-lg"
        >
          Back to Careers
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-SmokeWhite to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Navigation */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -5 }}
          className="mb-8 flex items-center gap-2 text-primary font-poppins font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Careers
        </motion.button>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Job Details */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="lg:col-span-2"
          >
            {/* Header */}
            <motion.div variants={sectionVariants} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-red-rose font-bold text-CharcoleDark">
                  {job.title}
                </h1>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-CharcoleDark/80">
                  <MapPin className="w-5 h-5" />
                  <span className="font-poppins">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-CharcoleDark/80">
                  <Clock className="w-5 h-5" />
                  <span className="font-poppins">{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-CharcoleDark/80">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-poppins">{job.salary}</span>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={sectionVariants} className="mb-12">
              <h2 className="text-2xl font-red-rose font-semibold text-CharcoleDark mb-4">
                Job Description
              </h2>
              <p className="font-poppins text-CharcoleDark/80 leading-relaxed">
                {job.description}
              </p>
            </motion.div>

            {/* Requirements */}
            <motion.div variants={sectionVariants} className="mb-12">
              <h2 className="text-2xl font-red-rose font-semibold text-CharcoleDark mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 font-poppins text-CharcoleDark/80"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    {req}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div variants={sectionVariants}>
              <h2 className="text-2xl font-red-rose font-semibold text-CharcoleDark mb-4">
                Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {job.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="p-4 bg-background rounded-xl border border-SmokeWhite"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Globe className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-poppins text-CharcoleDark/80">
                        {benefit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Apply Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-8 h-fit"
          >
            <div className="p-8 bg-background rounded-2xl shadow-xl border border-SmokeWhite">
              <h3 className="text-2xl font-red-rose font-semibold text-CharcoleDark mb-6">
                Ready to Apply?
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-poppins text-CharcoleDark/80 mb-1">
                      Application Process
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary font-poppins">
                      <span>3 simple steps</span>
                      <span>•</span>
                      <span>10 minutes</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApplyNow}
                  className="w-full bg-primary text-white font-poppins font-semibold px-6 py-4 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3"
                >
                  Start Application
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetails;
