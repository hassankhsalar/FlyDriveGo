import React from "react";
import EshopHeroSection from "./EshopHeroSection";
import TrustedPartners from "../../Home/TrustedPartners";
import Eproduct from "./Eproduct";
import PopularEvents2 from "../../Home/PopularEvents2";
import CTA from "../../Home/CTA";

const EshopHome = () => {
  return (
    <section className="mx-0 md:mx-20">
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
