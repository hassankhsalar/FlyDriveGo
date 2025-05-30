import React, { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/testimonials.json") // Make sure your JSON file is in the public folder
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("Error fetching testimonials", error));
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="font-red-rose text-5xl font-bold text-primary text-center mb-14">
        Customer Testimonials
      </h1>

      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="w-full md:w-[75%] bg-[#3B9DF8] text-white shadow-2xl rounded-lg p-6 relative mx-auto">
              <FaQuoteRight className="text-[4rem] text-[#e9e9e959] absolute top-[10%] right-[10%]" />
              
              <div className="flex items-center gap-4 mt-4">
                <img
                  src={testimonial.imageURL}
                  alt={testimonial.name}
                  className="w-[50px] h-[50px] object-cover rounded-full"
                />
                <div>
                  <h2 className="text-[1rem] font-[500]">{testimonial.name}</h2>
                  <p className="text-[0.9rem] text-[#e9e9e9]">{testimonial.role}</p>
                </div>
              </div>

              <h2 className="text-[1.5rem] capitalize font-[500] mt-5 leading-[30px]">
                {testimonial.reviewTitle}
              </h2>

              <p className="text-justify text-[0.9rem] my-3 text-[#e9e9e9]">
                {testimonial.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
