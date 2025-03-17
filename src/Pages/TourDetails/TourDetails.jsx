import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TourDetails = () => {
    const { title } = useParams();
    const [tour, setTour] = useState(null);

    useEffect(() => {
        fetch("/tourPackages.json")
            .then(res => res.json())
            .then(data => {
                const foundTour = data.find(item => item.title === title);
                setTour(foundTour);
            })
            .catch(error => console.log("Error fetching data:", error));
    }, [title]);

    if (!tour) return <p>Loading tour details...</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold">{tour.title}</h2>
            <img src={tour.image} alt={tour.title} className="w-full max-w-lg my-4" />
            <p className="text-lg">{tour.description}</p>
            <p className="text-xl font-semibold text-[#4EDAE4]">Price: {tour.price.currency} {tour.price.per_person.toLocaleString()}</p>
            <p className="text-md">Duration: {tour.duration}</p>
        </div>
    );
};

export default TourDetails;
