import React, { useState } from "react";
import TransportAir from "../../Components/transport/TransportAir";
import TransportRoad from "../../Components/transport/TransportRoad";


const Transport = () => {
const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="mt-20 w-11/12 mx-auto">
      <div className="flex flex-col gap-8 pb-20 max-w-[768px] mx-auto text-center">
        <p className="font-poppins text-base font-medium text-center">
          Transport
        </p>
        <h1 className="font-red-rose text-5xl font-bold text-primary">
          Flexible Transport Options for Every Journey!
        </h1>
        <p className="text-base font-poppins font-normal ">
          Choose the best way to travel—whether you prefer the speed of air
          travel or the scenic routes by road. Find affordable, comfortable, and
          hassle-free transport options tailored to your needs.
        </p>
      </div>
      <div className="p-8 mb-4 flex flex-col items-center gap-5 justify-center border-2 border-CharcoleDark">
            {/* Tab Navigation */}
            <ul className="flex items-center">
                <li
                    className={`${
                        activeTab === 1 ? "border border-b-transparent rounded-tr rounded-tl" : "border-b"
                    } px-6 py-2 border-[#d1d1d1] text-text transition duration-300 cursor-pointer`}
                    onClick={() => setActiveTab(1)}
                >
                    By Air
                </li>
                <li
                    className={`${
                        activeTab === 2 ? "border border-b-transparent rounded-tr rounded-tl" : "border-b"
                    } px-6 py-2 border-[#d1d1d1] text-text transition duration-300 cursor-pointer`}
                    onClick={() => setActiveTab(2)}
                >
                    By Road
                </li>
            </ul>

            {/* Tab Content */}
            <div className="w-full p-4 border border-[#d1d1d1] rounded-md">
                {activeTab === 1 && <TransportAir></TransportAir> }
                {activeTab === 2 && <TransportRoad></TransportRoad>}
            </div>
        </div>
    
    </div>
  );
};

export default Transport;
