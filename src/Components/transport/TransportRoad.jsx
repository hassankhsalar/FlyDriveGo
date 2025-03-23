import React from 'react';
import bus from '../../assets/transportation/bus.jpg';

const TransportRoad = () => {
    return (
        <div className='w-11/12 flex flex-col md:flex-row gap-6'>
                    <div className='w-full md:w-1/2 mx-auto'>
                        <img src={bus} alt="" className='object-cover rounded-md' />
                    </div>
                    <div className='w-full md:w-1/2 mx-auto flex flex-col justify-evenly'>
                        <h1 className='font-red-rose text-4xl font-bold text-CharcoleDark'>Economy Travel! With Comfort!</h1>
                        <p className='py-4 font-poppins font-normal text-base'>Book Luxury and sleeper coaches with ease. Compare, choose your seat, and get the best deals for a smooth and convenient journey.</p>
                        <button className='border-2 px-4 py-2 border-CharcoleDark'>Buy Coach Ticket</button>
                    </div>
                </div>
    );
};

export default TransportRoad;