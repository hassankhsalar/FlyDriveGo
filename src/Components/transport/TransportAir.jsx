import React from 'react';
import air1 from '../../assets/transportation/air1.jpg';

const TransportAir = () => {
    return (
        <div className='w-11/12 flex flex-col md:flex-row gap-6'>
            <div className='w-full md:w-1/2 mx-auto'>
                <img src={air1} alt="" className='object-cover rounded-md'/>
            </div>
            <div className='w-full md:w-1/2 flex flex-col justify-evenly mx-auto'>
                <h1 className='font-red-rose text-4xl font-bold text-CharcoleDark'>Fly Faster, Travel Smarter!</h1>
                <p className='py-4 font-poppins font-normal text-base'>Book domestic and international flights with ease. Compare airlines, choose your seat, and get the best deals for a smooth and convenient journey.</p>
                <button className='border-2 px-4 py-2 border-CharcoleDark'>Buy Air Ticket</button>
            </div>
        </div>
    );
};

export default TransportAir;