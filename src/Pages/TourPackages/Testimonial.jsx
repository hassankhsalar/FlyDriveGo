import React from "react";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Testimonial data
const testimonials = [
    {
        id: 1,
        name: "John Doe",
        comment: "Amazing experience! The tour was well-organized and the guides were very knowledgeable.",
        rating: 5,
    },
    {
        id: 2,
        name: "Jane Smith",
        comment: "I had a great time exploring new places. Highly recommended!",
        rating: 4,
    },
    {
        id: 3,
        name: "Alice Johnson",
        comment: "The best travel experience I've ever had. Everything was perfect!",
        rating: 5,
    },
    {
        id: 4,
        name: "Michael Brown",
        comment: "Fantastic service and amazing destinations. Will definitely book again!",
        rating: 5,
    },
    {
        id: 5,
        name: "Emily Davis",
        comment: "Everything was seamless and stress-free. Loved every moment of the trip!",
        rating: 4,
    },
];

const Testimonial = () => {
    return (
        <div className=" w-11/12 mx-auto my-20 px-4">
            <h2 className="font-extrabold text-3xl text-center mb-10" style={{ color: '#4EDAE4' }}>
                What Our Customers Say
            </h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                        <div className="h-full flex justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-sm flex flex-col justify-between">
                                <div>
                                    <FaQuoteLeft className="text-2xl text-gray-400 mx-auto" />
                                    <p className="text-gray-600 my-4">{testimonial.comment}</p>
                                    <FaQuoteRight className="text-2xl text-gray-400 mx-auto" />
                                </div>
                                <div className="mt-6">
                                    <div className="flex justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`text-xl ${
                                                    i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-semibold mt-4">{testimonial.name}</h3>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Testimonial;