import React from "react";
import HeroLayout from "../../Home/hero/Layout/HeroLayout";
import eshopheroLeftImage from "../../../assets/eshop/eshophero1.png";
import eshopheroRightImage from "../../../assets/eshop/eshophero2.png";

const EshopHeroSection = () => {
  const avatarImage =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  const avatars = Array(4).fill(avatarImage);
  return (
    <div>
      <HeroLayout
        leftImage={eshopheroLeftImage}
        rightImage={eshopheroRightImage}
        title="Pack. Explore. Conquer! "
        subtitle="Travel Gear Here!"
        description="From rugged backpacks to must-have camping gear, we’ve got everything you need for the perfect adventure. Shop now and travel like a pro!"
        communityText="22K+ User Community"
        avatars={avatars}
      ></HeroLayout>
    </div>
  );
};

export default EshopHeroSection;
