import React from "react";
import HeroLayout from "../Layout/HeroLayout";
import heroLeftImage from "../../../../assets/home/heroSection/hero_left.png";
import heroRightImage from "../../../../assets/home/heroSection/hero_right.png";

const HeroSection = () => {
  const avatarImage =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  const avatars = Array(4).fill(avatarImage);

  return (
    <HeroLayout
      leftImage={heroLeftImage}
      rightImage={heroRightImage}
      title="Seamless Travel, Effortless Booking"
      subtitle="Your Journey Starts Here!"
      description="Book flights, tours, and transport in one place. Find the best deals, secure tickets fast, and travel hassle-free with FlyDriveGo!"
      communityText="22K+ User Community"
      avatars={avatars}
    />
  );
};

export default HeroSection;
