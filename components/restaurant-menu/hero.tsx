"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function Hero() {
  
  const { language } = useLanguage()
  const t = translations[language] // ✅ correct reference

  return (
    <section
      id="home"
      className="relative flex items-center justify-center md:aspect-16/6 aspect-16/9 !bg-cover relative lg:px-12"
      style={{background: 'url(/image/resturant/banner.png) center center no-repeat'}}
    >
      <div className="bg-[#66282C]/60 absolute inset-0 w-full h-full z-1"></div>
      <div style={{zIndex: '99'}} className="absolute lg:block hidden banner-borders right-0 top-0 h-full">
        <img className="h-full" src={'/image/banner-layer.png'} />
      </div>
      <div style={{zIndex: '99'}} className="absolute lg:block hidden banner-borders left-0 top-0 h-full transform rotate-180">
        <img className="h-full" src={'/image/banner-layer.png'} />
      </div>
      <div className="relative z-2">
        <h1 className="aboreto-text 2xl:text-[60px] xl:text-[50px] text-[34px] text-secondary leading-[1.1] text-balance whitespace-pre-line">
          {t.RestaurantMenuText}
        </h1>
      </div>
    </section>
  )
}
