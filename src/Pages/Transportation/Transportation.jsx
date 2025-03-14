import React from "react";
import HeroLayout from "../Home/hero/Layout/HeroLayout";
import SectionHeader from "./components/SectionHeader";
import ServiceCard from "./components/ServiceCard";
import ImageCard from "./components/ImageCard";
import FlightCard from "./components/FlightCard";
import heroLeftImage from "../../assets/home/heroSection/hero_left.png";
import heroRightImage from "../../assets/home/heroSection/hero_right.png";
import carOneImg from "../../assets/transportation/carOneImg.jpg";
import carTwoImg from "../../assets/transportation/carTwoImg.jpg";
import carThreeImg from "../../assets/transportation/carThreeImg.jpg";
import busTwoImg from "../../assets/transportation/busTwoImg.jpg";

const Transportation = () => {
  return (
    <>
      <HeroLayout
        leftImage={heroLeftImage}
        rightImage={heroRightImage}
        title="Travel Refined, Perfected"
        subtitle="Where Comfort Meets the Open Road and Sky"
        description="From first-class flights to chauffeured rides, craft your ideal itinerary effortlessly. Our curated transport portfolio turns ‘getting there’ into the first chapter of your luxury escape."
      />

      <div className="bg-SmokeWhite py-12 px-4">
        {/* By Road Section */}
        <section className="container mx-auto mb-16">
          <SectionHeader title="By Road" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <ServiceCard
                title="Bus Rentals"
                subtitle="Group Travel Solutions"
                description="Comfortable and reliable bus services for group travel, city tours, and intercity trips. Choose from luxury coaches or standard buses for groups of 10 to 50 passengers."
                features={['Spacious Seating', 'Professional Drivers', 'Custom Routes', '24/7 Support']}
                buttonText="Explore Buses"
              />

              <ServiceCard
                title="Car Rentals"
                subtitle="Personal Mobility"
                features={['Economy', 'SUV', 'Luxury', 'Convertible']}
                priceLabel="Daily Rates From"
                price="$29"
                buttonText="View Cars"
              />
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 h-full">
              <ImageCard
                image={carOneImg}
                alt="Premium car rental"
                overlayText="Premium Selection"
                subText="Luxury vehicles for special occasions"
                imageHeight="h-64"
                className="col-span-2"
              />
              <ImageCard image={carTwoImg} alt="City drive" />
              <ImageCard image={carThreeImg} alt="Mountain drive" />
              <ImageCard
                image={busTwoImg}
                alt="Bus service"
                badge="Up to 50 seats"
                imageHeight="h-32 md:h-40"
                className="col-span-2"
              />
            </div>
          </div>
        </section>

        {/* By Air Section */}
        <section className="container mx-auto">
          <SectionHeader title="By Air" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FlightCard
              title="Domestic Flights"
              subtitle="Connect Nationwide"
              times={['Morning Flights', 'Afternoon', 'Evening', 'Red-Eye']}
              priceLabel="Starting from"
              price="$49/ticket"
              buttonText="Search Domestic Flights"
            />

            <FlightCard
              title="International Flights"
              subtitle="Explore the World"
              regions={['Europe', 'Asia', 'Americas']}
              description="Special offers available for long-haul flights and premium cabins."
              buttonText="Explore International"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Transportation;