import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import promo1 from '../../assets/fdg/promo1.png';
import promo2 from '../../assets/fdg/promo2.png';
import promo3 from '../../assets/fdg/promo3.png';
import promo4 from '../../assets/fdg/promo4.png';
import promo5 from '../../assets/fdg/promo5.png';
import promo6 from '../../assets/fdg/promo6.png';
import promo7 from '../../assets/fdg/promo7.png';

const Promo = () => {
  return (
    <div className="my-20 w-11/12 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={promo1} alt="" /></SwiperSlide>
        <SwiperSlide><img src={promo2} alt="" /></SwiperSlide>
        <SwiperSlide><img src={promo3} alt="" /></SwiperSlide>
        <SwiperSlide><img src={promo4} alt="" /></SwiperSlide>
        <SwiperSlide><img src={promo5} alt="" /></SwiperSlide>
        <SwiperSlide><img src={promo6} alt="" /></SwiperSlide>
        <SwiperSlide><img src={promo7} alt="" /></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Promo;
