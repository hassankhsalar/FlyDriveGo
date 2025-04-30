import React, { useEffect, useState } from "react";
import HeroLayout from "../Layout/HeroLayout";
import heroLeftImage from "../../../../assets/home/heroSection/hero_left.png";
import heroRightImage from "../../../../assets/home/heroSection/hero_right.png";

const HeroSection = () => {

  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=4')
      .then(res => res.json())
      .then(data => {
        const avatarUrls = data.results.map(user => user.picture.large);
        setAvatars(avatarUrls);
      })
      .catch(err => console.error('Error fetching avatars:', err));
  }, []);
  // const avatarImage =
  //   "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  // const avatars = Array(4).fill(avatarImage);

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
