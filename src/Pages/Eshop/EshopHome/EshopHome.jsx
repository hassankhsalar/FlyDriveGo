import React from "react";
import EshopHeroSection from "./EshopHeroSection";
import TrustedPartners from "../../Home/TrustedPartners";

const EshopHome = () => {
  return (
    <section>
      <div>
        <EshopHeroSection></EshopHeroSection>
      </div>
      <div>
        <TrustedPartners></TrustedPartners>
      </div>
    </section>
  );
};

export default EshopHome;
