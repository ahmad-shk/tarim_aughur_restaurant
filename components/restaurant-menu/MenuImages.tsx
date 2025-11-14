"use client"

import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

export function MenuImages() {
    const { language } = useLanguage()
    const t = (key: string) => getTranslation(language, key as any)

    return (
        <section className="py-6">
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={0}
                slidesPerView="auto"
                cssMode={true}
                navigation={false}
                // loop={true}
                // autoplay={{
                //     delay: 4000,
                //     disableOnInteraction: false,
                // }}
                className="w-full"
            >
                {[
                    '/image/signature-1.png',
                    '/image/signature-2.png',
                    '/image/signature-3.png',
                    '/image/signature-4.png',
                    '/image/signature-1.png',
                    '/image/signature-2.png',
                    '/image/signature-3.png',
                    '/image/signature-4.png',
                ].map((src, i) => (
                    <SwiperSlide 
                        key={i} 
                        className="!max-w-[360px] image-hover-scale"
                    >
                        <img src={src} className="w-full" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
