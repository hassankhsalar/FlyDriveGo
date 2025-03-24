import React from "react";


const CTA = () => {
  return (
    <div className="mt-16 w-full h-full md:h-[400px] bg-[url('/cta.jpg')] bg-cover bg-center bg-no-repeat flex flex-col md:flex-row justify-center items-center py-8">
      <div className="w-full md:w-1/2">
        <h1 className="font-red-rose text-5xl font-bold text-primary mb-14">
        Ready to Explore? Book Your Next Adventure Today!
        </h1>
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-3">
        <p className="font-poppins font-normal text-lg text-white">From flights to tour packages and travel essentials, everything you need is just a click away. Start planning now and make your journey unforgettable!</p>
        <button className="bg-primary w-44 p-2">
            Explore The World
        </button>
      </div>
    </div>
  );
};

export default CTA;
