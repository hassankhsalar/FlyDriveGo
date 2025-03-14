import React from "react";
import SectionHeader from "./SectionHeader";
import ImageCard from "./ImageCard";
import flight1Img from "../../../assets/transportation/flightOne.jpg";
import flight2Img from "../../../assets/transportation/flightTwo.jpg";
import flight3Img from "../../../assets/transportation/flightThree.jpg";
import flight4Img from "../../../assets/transportation/flightFour.jpg";
import flight5Img from "../../../assets/transportation/flightFive.jpg";

const FlightGallery = () => {
  return (
    // Add this after the By Air section
    <section className="container mx-auto mt-16">
      <SectionHeader title="Flight Experiences" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ImageCard
          image={flight1Img} // Add your flight images to assets
          alt="First Class Cabin"
          overlayText="Luxury Altitude"
          subText="Experience premium flying"
          imageHeight="h-48 md:h-64"
          className="group"
        >
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-poppins text-black">
              First Class
            </span>
          </div>
        </ImageCard>

        <ImageCard
          image={flight2Img}
          alt="Business Class"
          overlayText="Productive Skies"
          subText="Work while you fly"
          imageHeight="h-48 md:h-64"
        >
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-poppins text-black">
              Business Class
            </span>
          </div>
        </ImageCard>

        <ImageCard
          image={flight3Img}
          alt="Economy Class"
          overlayText="Smart Travel"
          subText="Budget-friendly comfort"
          imageHeight="h-48 md:h-64"
        >
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-poppins text-black">
              Economy Class
            </span>
          </div>
        </ImageCard>

        <div className="md:col-span-2">
          <ImageCard
            image={flight4Img}
            alt="Airport Lounge"
            overlayText="Premium Lounges"
            subText="Relax before departure"
            imageHeight="h-48 md:h-64"
          />
        </div>

        <ImageCard
          image={flight5Img}
          alt="In-Flight Service"
          overlayText="Gourmet Dining"
          subText="At 35,000 feet"
          imageHeight="h-48 md:h-64"
        />
      </div>
    </section>
  );
};

export default FlightGallery;
