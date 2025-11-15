'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ImageModalProps {
  selectedItem: {
    images?: string[]; // optional array of image URLs
    name?: string;
  } | null;
}

const ImageModal = ({ selectedItem }: ImageModalProps) => {
  console.log('Selected Item in ImageModal:', selectedItem);
  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);
  const slider1 = useRef<any>(null);
  const slider2 = useRef<any>(null);

  if (!selectedItem || !selectedItem.images || selectedItem.images.length === 0) {
    return <p>No images available</p>;
  }

  const mainSettings = {
    asNavFor: nav2,
    ref: (slider: any) => setNav1(slider),
    arrows: false,
    fade: true,
  };

  const thumbSettings = {
    asNavFor: nav1,
    ref: (slider: any) => setNav2(slider),
    slidesToShow: Math.min(selectedItem.images.length, 5),
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    variableWidth: true,
    arrows: false,
  };

  return (
    <div className="w-full max-w-full mx-auto">
      {/* Main Slider */}
      <Slider {...mainSettings} ref={slider1} className="max-w-full">
        {selectedItem.images.map((img, idx) => (
          <div key={idx} className="relative w-full aspect-16/8 rounded-3xl overflow-hidden">
            <Image
              src={img}
              alt={`${selectedItem.name} image ${idx + 1}`}
              width={800}
              height={600}
              className="w-full object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Thumbnail Slider */}
      <div className="mt-4 -mx-2.5">
        <Slider className="thumb-slider" {...thumbSettings} ref={slider2}>
          {selectedItem.images.map((img, idx) => (
            <div key={idx} className="px-2.5">
              <div className="relative h-[100px] cursor-pointer">
                <Image
                  src={img}
                  alt={`${selectedItem.name} thumbnail ${idx + 1}`}
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
