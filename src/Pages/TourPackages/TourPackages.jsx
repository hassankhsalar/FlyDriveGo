import React, { useEffect, useState } from "react";
import HeroSection from "../Home/hero/components/HeroSection";
import Cards from "./components/Cards";
import { Link } from "react-router-dom";
import Ecommerce from "./Ecommerce";

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
        </div>
    );
};

export default TourPackages;
