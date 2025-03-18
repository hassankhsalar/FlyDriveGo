import { useState, useEffect } from "react";
import RoadSection from "./components/RoadSection";
import AirSection from "./components/AirSection";
import transportOptions from "./json/transportOptions.json"; // Unified JSON import

const TransportationOptions = () => {
  const [transportData, setTransportData] = useState({ road: [], air: [] });

  useEffect(() => {
    const fetchData = async () => {
      // Using imported JSON data directly (simulating fetch)
      const { road, air } = transportOptions; // Destructure from single JSON
      setTransportData({ road, air });
    };
    fetchData();
  }, []);

  return (
    <div className=" bg-background text-text">
      <section className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-CharcoleDark">
          Transportation Options
        </h1>
        <RoadSection roadData={transportData.road} />
        <AirSection airData={transportData.air} />
      </section>
    </div>
  );
};

export default TransportationOptions;
