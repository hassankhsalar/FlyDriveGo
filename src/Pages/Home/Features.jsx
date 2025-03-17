import React from 'react';
import feature from '../../assets/features.jpg'

const Features = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center gap-3 items-center w-11/12 mx-auto rounded-r-2xl'>
            <div className='w-full md:w-1/2 '>
                <div className='border-l-4'>
                    <h1 className='font-red-rose text-3xl font-bold text-primary'>Handpicked Tour Packages for Every Explorer!</h1>
                    <p className='font-poppins text-lg font-normal'>
                    Explore expertly curated tour packages that include flights, transport, and activities. Whether it’s a weekend getaway or an international adventure, we’ve got the perfect trip for you!
                    </p>
                </div>
                <div className='py-8'>
                    <h1 className='font-red-rose text-3xl font-bold text-primary'>Easy & Flexible Transport Options!</h1>
                    <p className='font-poppins text-lg font-normal'>
                    Book hassle-free transport options, whether by bus for scenic road trips or flights for quick getaways. Find the best routes, compare prices, and travel your way!
                    </p>
                </div>
                <div className=''>
                    <h1 className='font-red-rose text-3xl font-bold text-primary'>Gear Up for Your Next Adventure!</h1>
                    <p className='font-poppins text-lg font-normal'>
                    Shop essential travel gear, from backpacks to camping kits. Get high-quality equipment to make your journeys safer, smoother, and more enjoyable!
                    </p>
                </div>

            </div>
            <div className='w-full md:w-1/2 max-h-[500px] rounded-r-2xl'>
                <img src={feature} alt="" className='w-full max-h-[500px] object-cover md:rounded-r-2xl'/>
            </div>
        </div>
    );
};

export default Features;