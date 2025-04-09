import React, { useEffect, useState } from "react";
import HeroSection from "./hero/components/HeroSection";
import Chatbot from "../../components/Chatbot/Chatbot";
import TrustedPartners from "./TrustedPartners";
import PopularEvents from "./PopularEvents";
import PopularEvents2 from "./PopularEvents2";
import Features from "./Features";
import Ecommerce from "./Ecommerce";
import Transport from "./Transport";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Notification from "../../Components/notification/Notification";

const Home = () => {
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    // Show notification on page load
    setShowNotification(true);

    const delayTimer = setTimeout(() => {
      setShowNotification(true);
    }, 10000);

    return () => clearTimeout(delayTimer);
  }, []);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };


  return (
    <section>
      <div>
      {showNotification && (
        <Notification
          message="🎉 Become a Seller!"
          onClose={handleCloseNotification}
          redirectTo="/tour-pack" // Change this to your desired path
        />
      )}
      </div>
      <div>
        <HeroSection />
      </div>

      <div>
        <TrustedPartners></TrustedPartners>
      </div>

      {/* <div className="w-11/12 mx-auto">
        <PopularEvents></PopularEvents>
      </div> */}

      <div className="w-11/12 mx-auto">
        <PopularEvents2></PopularEvents2>
      </div>

      <div>
        <Features></Features>
      </div>

      <div>
        <Ecommerce></Ecommerce>
      </div>

      <div>
        <Transport></Transport>
      </div>

      <div>
        <Testimonials></Testimonials>
      </div>

      <div>
        <CTA></CTA>
      </div>
       

    </section>
  );
};

export default Home;
