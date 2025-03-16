import React from "react";
import HeroSection from "./hero/components/HeroSection";

import TrustedPartners from "./TrustedPartners";
import PopularEvents from "./PopularEvents";
import PopularEvents2 from "./PopularEvents2";
import Features from "./Features";
import Ecommerce from "./Ecommerce";
import Transport from "./Transport";


const Home = () => {
  return (
    <section>
      <div>
        <HeroSection />
      </div>

      <div>
        <TrustedPartners></TrustedPartners>
      </div>

      <div className="w-11/12 mx-auto">
        <PopularEvents></PopularEvents>
      </div>

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
      
    </section>
  );
};

export default Home;
