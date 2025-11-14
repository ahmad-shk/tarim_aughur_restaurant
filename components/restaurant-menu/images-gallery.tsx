'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  { src: '/menu-items/menu-product-image.png', alt: 'category 1' },
  { src: '/menu-items/menu-product-image.png', alt: 'category 2' },
  { src: '/menu-items/menu-product-image.png', alt: 'category 3' },
  { src: '/menu-items/menu-product-image.png', alt: 'category 1' },
  { src: '/menu-items/menu-product-image.png', alt: 'category 2' },
  { src: '/menu-items/menu-product-image.png', alt: 'category 3' },
];

const ImageModal = () => {
  const [nav1, setNav1] = useState<any>(undefined);
  const [nav2, setNav2] = useState<any>(undefined);
  const slider1 = useRef<any>(null);
  const slider2 = useRef<any>(null);

  // Main slider settings
  const mainSettings = {
    asNavFor: nav2,
    ref: (slider:any) => setNav1(slider),
    arrows: false,
    fade: true,
  };

  // Thumbnail slider settings
  const thumbSettings = {
    asNavFor: nav1,
    ref: (slider:any) => setNav2(slider),
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    variableWidth: true,
    arrows: false,
  };


  return (
    <div className="w-full max-w-full mx-auto">
      {/* Main Slider */}
      <Slider {...mainSettings} ref={slider1} className='max-w-full'>
        {images.map((img, idx) => (
          <div key={idx} className="relative w-full max-h-[500] rounded-3xl overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              width={1056}
              height={600}
              className=" object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Thumbnail Slider */}
      <div className="mt-4 -mx-2.5">
        <Slider className='thumb-slider' {...thumbSettings} ref={slider2}>
          {images.map((img, idx) => (
            <div key={idx} className="px-2.5">
              <div className="relative h-[100px] cursor-pointer">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageModal;
