"use client"

import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

export function Testimonials() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)

  const testimonials = [
    {
      name: t("customerName"),
      text: t("testimonialReview"),
    },
    {
      name: t("customerName1"),
      text: t("testimonialReview1"),
    },
  ]

  return (
    <section className="lg:py-20 py-12">
      <div className="max-w-[1300px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center lg:mb-16 mb-8">
          <h2 className="aboreto-text dark:text-secondary 2xl:text-[60px] xl:text-[50px] text-[28px]">
            {t("testimonialsTitle")}
          </h2>
          <p className="2xl:text-[48px] xl:text-[44px] text-[24px]">
            {t("testimonialsSubTitle")}
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={true}
          loop={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          className="testimonial-swiper mx-auto text-center"
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div>
                <p className="md:w-10/12 mx-auto lg:text-[26px] text-[20px] opacity-75 leading-relaxed italic">
                  "{item.text}"
                </p>
                <div className="flex justify-center my-[50px] dark:text-[#E3C08D]">
                  <svg
                    width="75"
                    height="54"
                    viewBox="0 0 75 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.34416 53.4416H21.3766L32.0649 32.0649V0H0V32.0649H16.0325L5.34416 53.4416ZM48.0974 53.4416H64.1299L74.8182 32.0649V0H42.7532V32.0649H58.7857L48.0974 53.4416Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <p className="aboreto-text 2xl:text-[40px] text-[30px] dark:text-secondary">
                  {item.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom styling for navigation arrows */}
      <style jsx global>{`
        .testimonial-swiper .swiper-button-next,
        .testimonial-swiper .swiper-button-prev {
          color: #fff;
          transition: all 0.3s ease;
        }
        .testimonial-swiper .swiper-button-next:hover,
        .testimonial-swiper .swiper-button-prev:hover {
          color: #fff;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  )
}
