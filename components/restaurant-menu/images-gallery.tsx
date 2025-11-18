"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";

interface ImageModalProps {
  selectedItem: {
    images?: string[];
    name?: string;
  } | null;
}

export default function App({ selectedItem }: ImageModalProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!selectedItem?.images) return null;

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 mb-10">
  {/* MAIN IMAGE */}
  <div className="w-full md:w-[84%] md:h-[460px] h-[220px]">
    <Swiper
      spaceBetween={10}
      navigation={true}
      thumbs={{
        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
      }}
      modules={[FreeMode, Navigation, Thumbs]}
      className="mySwiper2 h-full"
    >
      {selectedItem.images.map((img, idx) => (
        <SwiperSlide key={idx} className="bg-[#4b1c20] relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={img}
            alt=""
            fill
            className="object-contain"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* THUMBNAILS */}
  <div className="w-full md:w-[16%] md:h-[460px]">
    {!isMobile && (
      <Swiper
        onSwiper={setThumbsSwiper}
        direction="vertical"
        slidesPerView={5}
        spaceBetween={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper h-full"
      >
        {selectedItem.images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-[80px] rounded-lg overflow-hidden">
              <Image src={img} alt="" fill className="object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )}

    {isMobile && (
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-3"
      >
        {selectedItem.images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-[70px] rounded-lg overflow-hidden">
              <Image src={img} alt="" fill className="object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )}
  </div>
</div>

  );
}
