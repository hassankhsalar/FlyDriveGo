import React from "react";

const HeroF = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="w-full bg-[#fff] rounded-md relative font-red-rose">
        {/* header */}
        <header className="flex lg:flex-row flex-col items-center gap-12 lg:gap-0 justify-between px-8 mt-10">
          <div className="w-full lg:w-[45%]">
            <h1 className="text-[40px] sm:text-[60px] font-semibold leading-[45px] sm:leading-[70px]">
              <span className="text-primary">Hold Tight</span> We've GOT IT ALL!
            </h1>
            <p className="mt-2 text-[1rem]">
              One stop service for all yours travel needs
            </p>
          </div>

          <div className="w-full lg:w-[55%]">
            <img
              src="https://i.ibb.co.com/svmBq4hL/15-travel-sites-1.jpg"
              alt="image"
              className=""
            />
          </div>
        </header>

        {/* right blur shadow */}
        <div className="w-[100px] h-[100px] bg-primary blur-[90px] absolute bottom-[80px] right-[80px]"></div>
      </div>
    </div>
  );
};

export default HeroF;
