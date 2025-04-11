import { Briefcase, Globe, Users, Zap, ArrowRight } from "lucide-react";
import JobList from "./components/JobList";

const Careers = () => {
  const perks = [
    {
      icon: Briefcase,
      title: "Flexible Work",
      description: "Hybrid/remote options & flexible hours",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Work on projects spanning 150+ countries",
    },
    {
      icon: Users,
      title: "Top Talent",
      description: "Collaborate with industry experts",
    },
    {
      icon: Zap,
      title: "Fast Growth",
      description: "Accelerate your career development",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-SmokeWhite to-background opacity-0 animate-fadeIn duration-800"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div
            className="text-center opacity-0 translate-y-12 animate-fadeSlideUp"
          >
            <h1 className="text-5xl md:text-6xl font-red-rose font-bold text-primary bg-clip-text mb-6">
              Shape the Future of Travel
            </h1>
            <p className="text-xl md:text-2xl font-poppins text-CharcoleDark/90 max-w-3xl mx-auto mb-8">
              Join a team redefining global travel experiences through
              innovation and technology
            </p>
          </div>

          {/* Perks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {perks.map((perk, index) => (
              <div
                key={index}
                className={`p-8 bg-background rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-SmokeWhite hover:border-primary/20 opacity-0 translate-y-12 animate-fadeSlideUp`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <perk.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-red-rose font-semibold text-CharcoleDark mb-3">
                  {perk.title}
                </h3>
                <p className="font-poppins text-CharcoleDark/80">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>

          {/* Jobs Section */}
          <div className="max-w-7xl mx-auto">
            <div
              className="mb-12 opacity-0 animate-fadeIn"
              style={{ animationDelay: "600ms" }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-red-rose font-bold text-CharcoleDark">
                  Open Positions
                </h2>
                <div className="flex items-center gap-2 text-primary font-poppins font-semibold">
                  <span>All departments</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              <JobList />
            </div>
          </div>

          {/* CTA Section */}
          <div
            className="text-center py-16 opacity-0 scale-95 animate-scaleIn"
            style={{ animationDelay: "800ms" }}
          >
            <div className="bg-background rounded-2xl p-8 shadow-xl border border-SmokeWhite">
              <h3 className="text-2xl font-red-rose font-semibold text-CharcoleDark mb-4">
                Can't find your perfect role?
              </h3>
              <p className="font-poppins text-CharcoleDark/80 mb-6 max-w-xl mx-auto">
                We're always looking for exceptional talent. Send us your resume
                and we'll contact you when matching positions become available.
              </p>
              <button className="bg-primary text-white font-poppins font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 mx-auto">
                Submit Application
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 animate-fadeIn"
          style={{ animationDelay: "1000ms" }}
        >
          <div className="absolute top-20 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Careers;
