import React from "react";
import bali from '../../assets/popular-tour-packages/bali.jpg';
import maldives from '../../assets/popular-tour-packages/maldives.jpg';
import singapore from '../../assets/popular-tour-packages/singapore.jpg';
import pune from '../../assets/popular-tour-packages/pune.jpg';
import { Link } from "react-router-dom";


const PopularEvents2 = () => {
  return (
    <div className="py-20 ">
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
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
        <div className="max-w-[400px] shadow-xl border-2 rounded-xl">
             <div>
                <img src={bali} alt="" className="p-2 rounded-xl h-52 object-cover w-full" />
             </div>
             <div className="w-10/12 mx-auto">
                <h1 className="font-poppins text-2xl text-primary font-bold">Bali</h1>
                <p className="font-poppins text-sm text-slate-600 font-light py-3">The most serene place on earth belongs to bali
                Indonesia!</p>
                <p className="font-poppins text-sm text-slate-600 py-3"><strong>Price:</strong> $1250 USD</p>
                <div className="flex justify-center items-center py-4">
                    <button className="py-1 px-6 w-9/12 bg-CharcoleDark text-slate-300 rounded-3xl font-poppins"><Link to='/tour-pack'>View details</Link></button>
                </div>
             </div>
        </div>
        <div className="max-w-[400px] shadow-xl border-2 rounded-xl">
             <div>
                <img src={maldives} alt="" className="p-2 rounded-xl h-52 object-cover w-full" />
             </div>
             <div className="w-10/12 mx-auto">
                <h1 className="font-poppins text-2xl text-primary font-bold">maldives</h1>
                <p className="font-poppins text-sm text-slate-600 font-light py-3">Heaven on Earth!Amazing Honeymoon packages available now!</p>
                <p className="font-poppins text-sm text-slate-600 py-3"><strong>Price:</strong> $1250 USD</p>
                <div className="flex justify-center items-center py-4">
                    <button className="py-1 px-6 w-9/12 bg-CharcoleDark text-slate-300 rounded-3xl font-poppins"><Link to='/tour-pack'>View details</Link></button>
                </div>
             </div>
        </div>
        <div className="max-w-[400px] shadow-xl border-2 rounded-xl">
             <div>
                <img src={singapore} alt="" className="p-2 rounded-xl h-52 object-cover w-full" />
             </div>
             <div className="w-10/12 mx-auto">
                <h1 className="font-poppins text-2xl text-primary font-bold">singapore</h1>
                <p className="font-poppins text-sm text-slate-600 font-light py-3">The country of islands and beautiful cities.Magical singapore!</p>
                <p className="font-poppins text-sm text-slate-600 py-3"><strong>Price:</strong> $1250 USD</p>
                <div className="flex justify-center items-center py-4">
                    <button className="py-1 px-6 w-9/12 bg-CharcoleDark text-slate-300 rounded-3xl font-poppins"><Link to='/tour-pack'>View details</Link></button>
                </div>
             </div>
        </div>
        <div className="max-w-[400px] w-full shadow-xl border-2 rounded-xl">
             <div>
                <img src={pune} alt="" className="p-2 rounded-xl h-52 object-cover w-full" />
             </div>
             <div className="w-10/12 mx-auto">
                <h1 className="font-poppins text-2xl text-primary font-bold">pune</h1>
                <p className="font-poppins text-sm text-slate-600 font-light py-3">The most serene place on earth belongs to bali
                Indonesia!</p>
                <p className="font-poppins text-sm text-slate-600 py-3"><strong>Price:</strong> $1250 USD</p>
                <div className="flex justify-center items-center py-4">
                    <button className="py-1 px-6 w-9/12 bg-CharcoleDark text-slate-300 rounded-3xl font-poppins"><Link to='/tour-pack'>View details</Link></button>
                </div>
             </div>
        </div>
      </div>
      <div className="flex justify-center py-10 xl:py-16">
        <button className="w-56 py-2 bg-primary rounded-3xl text-white">View All Tour Events</button>
      </div>
    </div>
  );
};

export default PopularEvents2;
