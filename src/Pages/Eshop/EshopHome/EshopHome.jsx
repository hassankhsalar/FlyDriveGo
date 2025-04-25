import React, { useEffect, useState } from "react";
import EshopHeroSection from "./EshopHeroSection";
import TrustedPartners from "../../Home/TrustedPartners";
import Eproduct from "./Eproduct";
import PopularEvents2 from "../../Home/PopularEvents2";
import CTA from "../../Home/CTA";
import Notification from "../../../Components/notification/Notification";

const EshopHome = () => {
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
    <section className="mx-0 md:mx-20">
      <div>
      {showNotification && (
        <Notification
          message="🎉 Become a Seller!"
          onClose={handleCloseNotification}
          redirectTo="/becomeseller" // Change this to your desired path
        />
      )}
      </div>
      <div>
        <EshopHeroSection></EshopHeroSection>
      </div>
      <div>
        <Eproduct></Eproduct>
      </div>
      <div>
        <CTA></CTA>
      </div>
    </section>
  );
};

export default EshopHome;
