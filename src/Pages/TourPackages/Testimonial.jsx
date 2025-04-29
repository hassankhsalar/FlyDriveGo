import React from "react";
import { FaQuoteLeft, FaStar, FaUserCircle } from "react-icons/fa";

// Import Swiper styles and components
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

// Testimonial data
const testimonials = [
    {
        id: 1,
        name: "John Doe",
        position: "Adventure Enthusiast",
        comment: "Amazing experience! The tour was well-organized and the guides were very knowledgeable. I'll definitely be booking another trip soon.",
        rating: 5,
        avatarColor: "#4EDAE4",
    },
    {
        id: 2,
        name: "Jane Smith",
        position: "Family Traveler",
        comment: "I had a great time exploring new places with my family. The itinerary was perfect for all ages. Highly recommended!",
        rating: 4,
        avatarColor: "#FF6B6B",
    },
    {
        id: 3,
        name: "Alice Johnson",
        position: "Solo Explorer",
        comment: "The best travel experience I've ever had. Everything was perfect from accommodation to activities. The local insights were invaluable!",
        rating: 5,
        avatarColor: "#FFD166",
    },
    {
        id: 4,
        name: "Michael Brown",
        position: "Business Traveler",
        comment: "Fantastic service and amazing destinations. The team went above and beyond to accommodate my schedule. Will definitely book again!",
        rating: 5,
        avatarColor: "#06D6A0",
    },
    {
        id: 5,
        name: "Emily Davis",
        position: "Luxury Seeker",
        comment: "Everything was seamless and stress-free. The premium package was worth every penny. Loved every moment of the trip!",
        rating: 4,
        avatarColor: "#118AB2",
    },
];

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col justify-between transform transition-transform duration-300 hover:scale-102 hover:shadow-xl border border-gray-100">
            <div className="mb-6">
                <div className="flex items-center mb-4">
                    <div className="h-14 w-14 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: testimonial.avatarColor }}>
                        <FaUserCircle className="text-white text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">{testimonial.name}</h3>
                        <p className="text-gray-500 text-sm">{testimonial.position}</p>
                    </div>
                </div>
                <div className="relative mt-4">
                    <FaQuoteLeft className="absolute -top-4 -left-2 text-xl opacity-20" style={{ color: testimonial.avatarColor }} />
                    <p className="text-gray-700 italic pl-6 text-base leading-relaxed line-clamp-4">{testimonial.comment}</p>
                </div>
            </div>
            <div className="flex items-center mt-4">
                <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={`${
                                i < testimonial.rating ? "text-yellow-400" : "text-gray-200"
                            } text-sm mr-1`}
                        />
                    ))}
                </div>
                <span className="text-gray-500 text-sm font-medium">{testimonial.rating}.0</span>
            </div>
        </div>
    );
};

const Testimonial = () => {
    return (
        <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: '#4EDAE4' }}>
                        What Our Customers Say
                    </h2>
                    <div className="w-24 h-1 bg-gray-200 mx-auto mb-6">
                        <div className="w-12 h-1" style={{ backgroundColor: '#4EDAE4' }}></div>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                        Discover why travelers choose us for their unforgettable journeys. 
                        Here's what some of our happy customers have shared about their experiences.
                    </p>
                </div>
                
                <div className="testimonial-slider my-10">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                        effect="coverflow"
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ 
                            clickable: true,
                            dynamicBullets: true
                        }}
                        autoplay={{ 
                            delay: 5000,
                            disableOnInteraction: false
                        }}
                        loop={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        className="py-10"
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id} className="py-4 px-1">
                                <TestimonialCard testimonial={testimonial} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                
               
            </div>
        </section>
    );
};

export default Testimonial;