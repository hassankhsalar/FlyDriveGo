import React from "react";
import bali from '../../assets/popular-tour-packages/bali.jpg';
import maldives from '../../assets/popular-tour-packages/maldives.jpg';
import singapore from '../../assets/popular-tour-packages/singapore.jpg';
import pune from '../../assets/popular-tour-packages/pune.jpg';


const PopularEvents = () => {
  return (
    <div className="py-20">
      <div className="flex flex-col gap-8 pb-20">
        <p className="font-poppins text-base font-medium">
          Tour Upcoming Event
        </p>
        <h1 className="font-red-rose text-5xl font-bold text-primary">
          Explore Our Most Popular Tour Events!
        </h1>
        <p className="text-base font-poppins font-normal ">
          Discover exciting upcoming tour events handpicked for the ultimate
          travel experience. From breathtaking destinations to unforgettable
          adventures, book your spot now and make memories that last a lifetime!
        </p>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        <div className="w-full sm:w-[80%] md:w-[60%] shadow-md hover:shadow-none z-0 bg-white rounded-md relative cursor-pointer group before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] before:w-full before:h-full before:rounded-md before:bg-[#c0e6ed] before:transition-all before:duration-300 before:z-[-1] after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] after:rounded-md after:bg-[#d4f2f7] after:z-[-2] after:transition-all after:duration-500">
          {/*  image  */}
          <img
            src={bali}
            alt="animated_card"
            className="w-full h-[200px] rounded-t-md object-cover"
          />

          {/*  contents  */}
          <div className="p-[18px] pt-2.5 bg-white rounded-b-md container">
            <h3 className="text-[1.5rem] font-bold text-[#0FABCA]">Bali</h3>
            <p className="text-[1rem] font-[400] text-gray-600">
              The most serene place on earth belongs to bali <br />Indonesia!
            </p>

            <button className="w-full py-2 px-4 hover:bg-[#c0e6ed] hover:text-black text-[1rem] transition-all duration-300 bg-[#0FABCA] text-white rounded-md mt-5">
              Explore
            </button>
          </div>
        </div>
        <div className="w-full sm:w-[80%] md:w-[60%] shadow-md hover:shadow-none z-0 bg-white rounded-md relative cursor-pointer group before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] before:w-full before:h-full before:rounded-md before:bg-[#c0e6ed] before:transition-all before:duration-300 before:z-[-1] after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] after:rounded-md after:bg-[#d4f2f7] after:z-[-2] after:transition-all after:duration-500">
          {/*  image  */}
          <img
            src={maldives}
            alt="animated_card"
            className="w-full h-[200px] rounded-t-md object-cover"
          />

          {/*  contents  */}
          <div className="p-[18px] pt-2.5 bg-white rounded-b-md">
            <h3 className="text-[1.5rem] font-bold text-[#0FABCA]">Maldives</h3>
            <p className="text-[1rem] font-[400] text-gray-600">
              Heaven on Earth!Amazing Honeymoon packages available now!
            </p>

            <button className="w-full py-2 px-4 hover:bg-[#c0e6ed] hover:text-black text-[1rem] transition-all duration-300 bg-[#0FABCA] text-white rounded-md mt-5">
              Explore
            </button>
          </div>
        </div>
        <div className="w-full sm:w-[80%] md:w-[60%] shadow-md hover:shadow-none z-0 bg-white rounded-md relative cursor-pointer group before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] before:w-full before:h-full before:rounded-md before:bg-[#c0e6ed] before:transition-all before:duration-300 before:z-[-1] after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] after:rounded-md after:bg-[#d4f2f7] after:z-[-2] after:transition-all after:duration-500">
          {/*  image  */}
          <img
            src={singapore}
            alt="animated_card"
            className="w-full h-[200px] rounded-t-md object-cover"
          />

          {/*  contents  */}
          <div className="p-[18px] pt-2.5 bg-white rounded-b-md">
            <h3 className="text-[1.5rem] font-bold text-[#0FABCA]">singapore</h3>
            <p className="text-[1rem] font-[400] text-gray-600">
              The country of islands and beautiful cities.Magical singapore!
            </p>

            <button className="w-full py-2 px-4 hover:bg-[#c0e6ed] hover:text-black text-[1rem] transition-all duration-300 bg-[#0FABCA] text-white rounded-md mt-5">
              Explore
            </button>
          </div>
        </div>
        <div className="w-full sm:w-[80%] md:w-[60%] shadow-md hover:shadow-none z-0 bg-white rounded-md relative cursor-pointer group before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] before:w-full before:h-full before:rounded-md before:bg-[#c0e6ed] before:transition-all before:duration-300 before:z-[-1] after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] after:rounded-md after:bg-[#d4f2f7] after:z-[-2] after:transition-all after:duration-500">
          {/*  image  */}
          <img
            src={pune}
            className="w-full h-[200px] rounded-t-md object-cover"
          />

          {/*  contents  */}
          <div className="p-[18px] pt-2.5 bg-white rounded-b-md">
            <h3 className="text-[1.5rem] font-bold text-[#0FABCA]">Rajgad</h3>
            <p className="text-[1rem] font-[400] text-gray-600">
              Rajgadh fort is one rare gem situated in pune, <br /> India!
            </p>

            <button className="w-full py-2 px-4 hover:bg-[#c0e6ed] hover:text-black text-[1rem] transition-all duration-300 bg-[#0FABCA] text-white rounded-md mt-5">
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularEvents;
