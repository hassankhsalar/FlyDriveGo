import React from 'react';
import { Link } from 'react-router-dom';

const ByAir = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-CharcoleDark mb-4">Air Travel Options</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover our selection of domestic and international flights with premium comfort and competitive prices.
        </p>
        <div className="mt-4">
          <Link to="/transportation" className="text-primary hover:underline">
            ← Back to Transportation Hub
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Flight categories */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-50 p-6">
            <h2 className="text-2xl font-bold text-CharcoleDark mb-2">Domestic Flights</h2>
            <p className="text-gray-600">Connect to major cities nationwide with our domestic flight partners.</p>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {['Morning Departures', 'Afternoon Flights', 'Evening Service', 'Red-Eye Specials'].map((time, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{time}</span>
                  <span className="text-primary font-medium">from $79</span>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition">
              Search Domestic Flights
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-50 p-6">
            <h2 className="text-2xl font-bold text-CharcoleDark mb-2">International Flights</h2>
            <p className="text-gray-600">Explore global destinations with premium international carriers.</p>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {['Europe', 'Asia', 'Americas', 'Middle East', 'Africa'].map((region, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{region}</span>
                  <span className="text-primary font-medium">from $299</span>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition">
              Explore International Flights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByAir;