import React, { useEffect, useState } from 'react';
import HeroSection from '../Home/hero/components/HeroSection';
import Cards from './components/Cards';
import { Link } from 'react-router-dom';
import Ecommerce from './Ecommerce';

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
    }, [])
    console.log(tourData);
    if (loading) return <p>Loading tour packages...</p>;

    return (
        <div  className='w-11/12 mx-auto bg-SmokeWhite font-red-rose'>
            {/* hero section */}
            <div>
                <HeroSection />
            </div>
            {/* card section */}
           <div>
             <h2 style={{ color: '#4EDAE4' }} className='font-extrabold text-3xl text-center my-10'>
                Upcoming Tour Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5 p-4">
                {tourData.map((tour, index) => (
                    
                    <Link key={index} to={`/tour-details/${tour.title}`}>
                    <Cards  tour={tour} />
                    </Link>
                ))}
            </div>
           </div>
           {/* Ecommerce section */}
           <Ecommerce/>
        </div>
    );
};

export default TourPackages;