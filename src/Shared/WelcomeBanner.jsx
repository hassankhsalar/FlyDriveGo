import React from "react";

const WelcomeBanner = () => {
  return (
    <div className="bg-[#023E8A]  text-white h-screen lg:min-h-screen ">
      <div className="p-5 py-10 md:p-48 lg:p-62 flex-row justify-center items-center space-y-11">
        <h3 className="text-4xl">Welcome to FlyDriveGo</h3>
        <p className="text-gray-400">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
          fugit quod, eius ratione similique porro nihil saepe sunt suscipit qui
          ipsam, aperiam et assumenda dicta impedit magnam laboriosam odit
          mollitia.
        </p>
        <p>
          Join FlyDriveGo and share your thoughts with the world through our
          platform, where your voice makes an impact!done.
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
