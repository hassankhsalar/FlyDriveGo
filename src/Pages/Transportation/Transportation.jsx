import React from "react";
import heroLeftImage from "../../assets/home/heroSection/hero_left.png";
import heroRightImage from "../../assets/home/heroSection/hero_right.png";
import carOneImg from "../../assets/transportation/carOneImg.jpg";
import carTwoImg from "../../assets/transportation/carTwoImg.jpg";
import carThreeImg from "../../assets/transportation/carThreeImg.jpg";
import busTwoImg from "../../assets/transportation/busTwoImg.jpg";
import HeroLayout from "../Home/hero/Layout/HeroLayout";

const Transportation = () => {
  return (
    <>
      <HeroLayout
        leftImage={heroLeftImage}
        rightImage={heroRightImage}
        title="Seamless Travel, Effortless Booking"
        subtitle="Your Journey Starts Here!"
        description="Book flights, tours, and transport in one place. Find the best deals, secure tickets fast, and travel hassle-free with FlyDriveGo!"
      ></HeroLayout>
      <div className="bg-SmokeWhite py-12 px-4">
        {/* By Road Section */}
        <section className="container mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-red-rose text-primary font-bold text-center mb-6">
            By Road
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Features (Left Side) */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <h3 className="text-lg md:text-xl font-red-rose text-CharcoleDark font-semibold">
                    Bus Rentals
                  </h3>
                </div>
                <p className="text-sm md:text-base text-CharcoleDark/60 font-poppins mb-2">
                  Comfortable and reliable bus services for group travel, city
                  tours, and intercity trips. Choose from luxury coaches or
                  standard buses for groups of 10 to 50 passengers.
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-CharcoleDark/60 font-poppins mb-2">
                  <li>Spacious seating and onboard amenities</li>
                  <li>Professional drivers with local expertise</li>
                  <li>Customizable options for any group size</li>
                </ul>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-poppins hover:bg-blue-600">
                  Book Now
                </button>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <h3 className="text-lg md:text-xl font-red-rose text-CharcoleDark font-semibold">
                    Car Rentals
                  </h3>
                </div>
                <p className="text-sm md:text-base text-CharcoleDark/60 font-poppins mb-2">
                  Flexible car rental options for solo travelers or small
                  groups, available at affordable rates. Select from economy,
                  SUV, or luxury cars with daily or weekly rates.
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-CharcoleDark/60 font-poppins mb-2">
                  <li>Wide range of vehicles to match your style</li>
                  <li>Competitive pricing with no hidden fees</li>
                  <li>Optional insurance for worry-free driving</li>
                </ul>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-poppins hover:bg-blue-600">
                  View Options
                </button>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <h3 className="text-lg md:text-xl font-red-rose text-CharcoleDark font-semibold">
                    Intercity Transport
                  </h3>
                </div>
                <p className="text-sm md:text-base text-CharcoleDark/60 font-poppins mb-2">
                  Seamless intercity transport solutions with multiple vehicle
                  options to suit your needs. Travel between major cities with
                  private or shared ride options.
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-CharcoleDark/60 font-poppins mb-2">
                  <li>Direct routes with frequent departures</li>
                  <li>Comfortable vehicles with modern features</li>
                  <li>Easy booking and flexible cancellations</li>
                </ul>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-poppins hover:bg-blue-600">
                  Learn More
                </button>
              </div>
            </div>

            {/* Image Layout (Right Side) */}
            <div className="space-y-4">
              {/* Main Image (Top) */}
              <div className="h-48 md:h-64 overflow-hidden rounded-lg">
                <img
                  src={carOneImg}
                  alt="Car on Scenic Route"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Two Smaller Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 md:h-32 overflow-hidden rounded-lg">
                  <img
                    src={carTwoImg}
                    alt="Car at Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-24 md:h-32 overflow-hidden rounded-lg">
                  <img
                    src={carThreeImg}
                    alt="Car on Snowy Road"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Bottom Image (Bus) */}
              <div className="h-32 md:h-40 overflow-hidden rounded-lg">
                <img
                  src={busTwoImg}
                  alt="Bus in City"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* By Air Section */}
        <section className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-red-rose text-primary font-bold text-center mb-6">
            By Air
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-red-rose text-CharcoleDark font-semibold">
                Domestic Flights
              </h3>
              <p className="text-sm md:text-base text-CharcoleDark/60 font-poppins">
                Fast and affordable flights connecting major cities within the
                country with top airlines.
              </p>
              <ul className="list-disc list-inside text-sm md:text-base text-CharcoleDark/60 font-poppins mb-2">
                <li>Convenient flight schedules</li>
                <li>Competitive pricing</li>
                <li>Comfortable seating and in-flight services</li>
              </ul>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-poppins hover:bg-blue-600">
                Book Domestic Flights
              </button>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-red-rose text-CharcoleDark font-semibold">
                International Flights
              </h3>
              <p className="text-sm md:text-base text-CharcoleDark/60 font-poppins">
                Explore the world with our extensive range of international
                flight options and exclusive deals.
              </p>
              <ul className="list-disc list-inside text-sm md:text-base text-CharcoleDark/60 font-poppins mb-2">
                <li>Wide range of destinations</li>
                <li>Exclusive deals and discounts</li>
                <li>Premium in-flight amenities</li>
              </ul>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-poppins hover:bg-blue-600">
                Book International Flights
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Transportation;
