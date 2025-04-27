import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    id: 1,
    title: "Explore the Best Outdoor Gear",
    subtitle: "Shop top-rated camping and adventure products.",
    image: "https://images.pexels.com/photos/8212224/pexels-photo-8212224.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Get Ready for Your Next Adventure",
    subtitle: "Tents, backpacks, jackets, and more – all in one place.",
    image: "https://images.pexels.com/photos/7009599/pexels-photo-7009599.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Limited Time Offers Just for You",
    subtitle: "Grab exclusive deals on premium outdoor products.",
    image: "https://images.pexels.com/photos/7009599/pexels-photo-7009599.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const EshopHeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className="h-[50vh] md:h-[50vh] w-full flex items-center justify-center text-white"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="bg-black/50 w-full h-full flex flex-col items-center justify-center px-6 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl mb-6">{slide.subtitle}</p>
                <Link to="" className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EshopHeroSection;
