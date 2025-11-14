"use client"

import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"
import Slider, { CustomArrowProps } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// ✅ Custom Previous Arrow
function PrevArrow(props: CustomArrowProps) {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="slick-arrow absolute left-5 lg:left-[calc((100%-920px)/2)] top-1/2 -translate-y-1/2 z-20 cursor-pointer"
    >
      <svg width="52" height="83" viewBox="0 0 52 83" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M-0.000106812 44.2731L51.645 82.2496V75.7563L4.22945 41.1248L51.645 6.4934V0L-0.000106812 37.9765V44.2731Z"
          fill="#F5E3BF"
        />
      </svg>
    </button>
  )
}

// ✅ Custom Next Arrow
function NextArrow(props: CustomArrowProps) {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="slick-arrow absolute right-5  lg:right-[calc((100%-920px)/2)] top-1/2 -translate-y-1/2 z-20 cursor-pointer"
    >
      <svg width="52" height="83" viewBox="0 0 52 83" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M51.6451 44.2731L0 82.2496V75.7563L47.4156 41.1248L0 6.4934V0L51.6451 37.9765V44.2731Z"
          fill="#F5E3BF"
        />
      </svg>
      
    </button>
  )
}

export function Ambience() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)

  const images = [
    "/image/ambience-2.png",
    "/image/ambience-1.png",
    "/image/ambience-3.png",
  ]

  const settings = {
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 1,
    speed: 500,
    autoplay: false,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  return (
    <section className="md:pb-[100px] pb-[50px]">
      <div className="max-w-[1300px] mx-auto px-4">
        <div className="text-center md:mb-16 mb-10">
          <h2 className="aboreto-text dark:text-secondary 2xl:text-[60px] xl:text-[50px] text-[28px] leading-[1.2]">
            {t("ambienceTitle")}
          </h2>
          <p className="2xl:text-[40px] text-[24px]">{t("ambienceSubtitle")}</p>
        </div>
      </div>

      <div className="relative ambiance-slider">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="min-w-[350px] max-w-[350px] sm:min-w-[380px]  sm:max-w-[380px] lg:min-w-[797px] lg:max-w-[797px]">
              <div className="overflow-hidden">
                <img
                  src={src}
                  alt={`Ambience ${index + 1}`}
                  className="w-full aspect-16/9 object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        /* Fade inactive slides */
        .ambiance-slider .slick-slide:not(.slick-current) {
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }
        .ambiance-slider .slick-arrow svg {width: 100%; height: 100%}
        .ambiance-slider .slick-arrow { z-index: 10; width: 50px; height: 50px; transition: all 0.3s ease; } 
        .ambiance-slider .slick-arrow:hover { color: #fff; transform: scale(1.2); }
      `}</style>
    </section>
  )
}
