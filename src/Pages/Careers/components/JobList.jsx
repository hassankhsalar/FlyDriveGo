import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

  if (loading) {
    return <div className="text-center py-10">Loading job listings...</div>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {jobs.map((job) => (
        <motion.div
          key={job.id}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="group p-8 bg-background rounded-2xl border-2 border-SmokeWhite hover:border-primary/20 transition-all shadow-lg hover:shadow-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-red-rose font-bold text-CharcoleDark">
                    {job.title}
                  </h3>
                  <p className="font-poppins text-primary">{job.department}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-CharcoleDark/80">
                  <MapPin className="w-5 h-5" />
                  <span className="font-poppins">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-CharcoleDark/80">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span className="font-poppins">{job.type}</span>
                </div>
              </div>

              <p className="font-poppins text-CharcoleDark/80 mb-6">
                {job.description}
              </p>
            </div>

            <Link
              to={`/careers/job/${job.id}`}
              className="flex items-center gap-2 text-primary font-poppins font-semibold hover:gap-3 transition-all"
            >
              View Role
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default JobList;
