import React from 'react';
import { FaRegClock, FaMapMarkerAlt, FaWifi, FaSnowflake, FaPlug } from 'react-icons/fa';

const BusHeader = ({ busDetails }) => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-primary text-white p-6">
            <h1 className="text-2xl font-bold">{busDetails?.name}</h1>
            <div className="flex items-center mt-2 text-blue-100">
                <FaRegClock className="mr-2" />
                <span>{busDetails?.time}</span>
                <span className="mx-2">•</span>
                <span>{busDetails?.duration}</span>
                <span className="mx-2">•</span>
                <span>{busDetails?.date}</span>
            </div>
            <div className="flex items-center mt-1 text-blue-100">
                <FaMapMarkerAlt className="mr-2" />
                <span>{busDetails?.route}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
                {busDetails?.features?.map((feature, idx) => (
                    <span
                        key={idx}
                        className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-sm"
                    >
                        {feature === "WiFi" && <FaWifi className="mr-2" />}
                        {feature === "AC" && <FaSnowflake className="mr-2" />}
                        {feature === "Power Outlets" && <FaPlug className="mr-2" />}
                        {feature}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default BusHeader;
