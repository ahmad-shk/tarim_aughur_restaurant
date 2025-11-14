"use client"

import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

export function Hero() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)

  return (
    <section
      id="home"
      className="relative md:flex items-center justify-center relative lg:px-12 bg-[#F5E3BF]"
    >
      <div style={{zIndex: '99'}} className="absolute lg:block hidden banner-borders right-0 top-0 h-full">
        <img className="h-full" src={'/image/banner-layer.png'} />
      </div>
      <div style={{zIndex: '99'}} className="absolute lg:block hidden banner-borders left-0 top-0 h-full transform rotate-180">
        <img className="h-full" src={'/image/banner-layer.png'} />
      </div>
      <div className="left-col 2xl:w-8/12 md:6/12 md:text-start text-center py-7 px-4">
        <h1 className="aboreto-text 2xl:text-[60px] xl:text-[50px] text-[38px] text-primary leading-[1.1] text-balance whitespace-pre-line">
          {t("welcomeTitle")}
        </h1>

        <p className="3xl:text-[24px] 2xl:text-[20px] leading-[1.5] text-[#000] my-[28px]">
          {t("welcomeDesc")}
        </p>

        <div className="flex md:justify-start justify-center gap-3">
          
          <a
            href="#menu"
            className="btn btn-primary hover:opacity-90 transition"
          >
            {t("exploreMenu")}
          </a>
        </div>
      </div>
      <div className="mbl-placeholder">
        <img src={'/image/banner.webp'} alt="img" className="object-cover" />
      </div>
    </section>
  )
}
