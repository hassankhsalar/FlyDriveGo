import React from "react";
import BimanBangladesh from "../../assets/airwaysLogo/bimanbangladesh.webp";
import USBangla from "../../assets/airwaysLogo/usbangla.webp";
import novo from "../../assets/airwaysLogo/novo.webp";
import china from "../../assets/airwaysLogo/china.webp";
import saudia from "../../assets/airwaysLogo/saudia.webp";
import emirets from "../../assets/airwaysLogo/emirets.webp";
import flydubai  from "../../assets/airwaysLogo/flydubai.webp";
import salamair from "../../assets/airwaysLogo/salamair.webp";
import singapore from "../../assets/airwaysLogo/singapore.webp";
import arabia from "../../assets/airwaysLogo/arabia.webp";
import indigo  from "../../assets/airwaysLogo/indigo.webp";
import airarabia  from "../../assets/airwaysLogo/airarabia.webp";

const TrustedPartners = () => {
  return (
    <div className="bg-secondary h-96 md:h-80 xl:h-60 w-full">
      <div className="flex flex-col items-center pt-2 pb-3">
        <h1 className="text-xl font-semibold">Our Trusted</h1>
        <p className="font-red-rose text-lg">Transport partners</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 w-8/12 mx-auto text-xs font-bold font-red-rose">
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <img src={BimanBangladesh} alt="" className="w-8" />
          <p>Biman Bangla Airlines</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <img src={USBangla} alt="" className="w-8" />
          <p>US Bangla Airlines</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <img src={novo} alt="" className="w-8" />
          <p>Novoair</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <img src={china} alt="" className="w-8" />
          <p>China Southern Airlines</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <img src={saudia} alt="" className="w-8" />
          <p>Saudia</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <img src={emirets} alt="" className="w-8" />
          <p>Emirates</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <img src={flydubai} alt="" className="w-8" />
          <p>flydubai</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <img src={salamair} alt="" className="w-8" />
          <p>SalamAir</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <img src={singapore} alt="" className="w-8" />
          <p>Singapore Airlines</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <img src={arabia} alt="" className="w-8" />
          <p>Air Arabia Abu Dhabi</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <img src={indigo} alt="" className="w-8" />
          <p>IndiGo</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <img src={airarabia} alt="" className="w-8" />
          <p>Air Arabia</p>
        </div>
      </div>
    </div>
  );
};

export default TrustedPartners;
