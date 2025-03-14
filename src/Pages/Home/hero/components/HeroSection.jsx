import React from "react";
import heroLeftImage from "../../../../assets/home/heroSection/hero_left.png";
import heroRightImage from "../../../../assets/home/heroSection/hero_right.png";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center overflow-hidden bg-SmokeWhite px-4">
      <div className="container mx-auto flex flex-col items-center justify-center my-14 md:my-20 lg:my-24 xl:my-28">
        <div className="grid grid-cols-1 md:grid-cols-4 w-full items-center md:items-start xl:items-center relative">
          <div className="flex justify-center align-top">
            <img
              src={heroLeftImage}
              className="w-36 md:w-40 lg:w-56 xl:w-64"
              alt="Left Background"
            />
          </div>
          {/* Main Hero Content */}
          <div className="text-center col-span-2">
            <h1 className="text-2xl md:text-4xl xl:text-5xl font-red-rose mb-4 text-primary font-bold">
              Seamless Travel, Effortless Booking <br />
              <span className="text-[#333333]">
                - Your Journey Starts Here!
              </span>
            </h1>
            <p className="text-sm md:text-lg text-CharcoleDark font-poppins mb-4 md:mb-8 max-w-xl mx-auto">
              Book flights, tours, and transport in one place. Find the best
              deals, secure tickets fast, and travel hassle-free with
              FlyDriveGo!
            </p>
            <p className="text-CharcoleDark font-bold text-2xl md:text-3xl font-red-rose">
              22K+ User Community
            </p>
            <div className="flex justify-center mt-2">
              <div className="avatar-group -space-x-6">
                {Array(4)
                  .fill(
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  )
                  .map((src, index) => (
                    <div className="avatar" key={index}>
                      <div className="w-8 h-8 md:w-12 md:h-12">
                        <img src={src} alt="User Avatar" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <img
              src={heroRightImage}
              className="w-28 md:w-40 lg:w-56 xl:w-64"
              alt="Right Background"
            />
          </div>
        </div>

        {/* User Community Section */}
        <section className="max-w-[810px] mx-auto"></section>
      </div>
    </section>
  );
};

export default HeroSection;
