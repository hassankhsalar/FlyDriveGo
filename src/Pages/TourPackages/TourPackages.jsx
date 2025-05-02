import React, { useEffect, useState } from "react";
import HeroSection from "../Home/hero/components/HeroSection";
import Cards from "./components/Cards";
import { Link } from "react-router-dom";
import Ecommerce from "./Ecommerce";

import Testimonial from "./Testimonial";
import TrustedPartners from "../Home/TrustedPartners";

const TourPackages = () => {
    const [tourData, setTourData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/tourPackages.json")
            .then((res) => res.json())
            .then((data) => {
                setTourData(data);
                setLoading(false);
            })
            .catch((error) => console.log("Error fetching data:", error));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold text-gray-600">Loading tour packages...</p>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto bg-SmokeWhite font-red-rose">
            {/* Hero Section */}
            <div>
                <HeroSection />
            </div>
            <div>
                <TrustedPartners/>
            </div>
            {/* Card Section */}
            <div className="my-10">
                <h2 className="font-extrabold text-3xl text-center mb-10" style={{ color: '#4EDAE4' }}>
                    Upcoming Tour Events
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {tourData.map((tour, index) => (
                        <Link key={index} to={`/tour-details/${tour.title}`}>
                            <Cards tour={tour} />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Ecommerce Section */}
            <div className="my-10 p-2">
                <Ecommerce />
            </div>
            {/* testimonial */}
            <Testimonial />
            {/* CTA Section */}
            <div className="mt-16 w-full h-full md:h-[400px] bg-[url('/cta.jpg')] bg-cover bg-center bg-no-repeat flex flex-col md:flex-row justify-center items-center py-8 px-4 md:px-8 lg:px-16">
                {/* Left Section - Heading */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="font-red-rose text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-14">
                        Ready to Explore? <br /> Book Your Next Adventure Today!
                    </h1>
                </div>

                {/* Right Section - Description and Button */}
                <div className="w-full md:w-1/2 flex flex-col gap-4 items-center md:items-start">
                    <p className="font-poppins font-normal text-base md:text-lg text-white text-center md:text-left">
                        From flights to tour packages and travel essentials, everything you need is just a click away. Start planning now and make your journey unforgettable!
                    </p>
                    <button className="bg-[#4EDAE4] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#3cb8c6] transition-all duration-300">
                        Explore The World
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default TourPackages;
