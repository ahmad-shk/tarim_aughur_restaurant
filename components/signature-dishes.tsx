"use client"

import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

export function SignatureDishes() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)

  // ✅ Array of dishes for easier management
  const dishes = [
    {
      img: "/image/signature-1.png",
      title: t("signatureDishTitle1"),
      subtitle: t("signatureDishSubTitle1"),
      desc: t("signatureDishDesc1"),
    },
    {
      img: "/image/signature-2.png",
      title: t("signatureDishTitle2"),
      subtitle: t("signatureDishSubTitle2"),
      desc: t("signatureDishDesc2"),
    },
    {
      img: "/image/signature-3.png",
      title: t("signatureDishTitle3"),
      subtitle: t("signatureDishSubTitle3"),
      desc: t("signatureDishDesc3"),
    },
    {
      img: "/image/signature-4.png",
      title: t("signatureDishTitle4"),
      subtitle: t("signatureDishSubTitle4"),
      desc: t("signatureDishDesc4"),
    },
    {
      img: "/image/signature-1.png",
      title: t("signatureDishTitle5"),
      subtitle: t("signatureDishSubTitle5"),
      desc: t("signatureDishDesc5"),
    },
  ]

  return (
    <section className="md:pt-20 pt-10">
      <div className="max-w-[1300px] mx-auto px-4 text-center space-y-1">
        <h2 className="aboreto-text dark:text-secondary 2xl:text-[60px] xl:text-[50px] text-[28px] leading-[1.1] whitespace-pre-line">
          {t("SignatureDishesTitle")}
        </h2>
        <p className="xl:text-[35px] text-24">{t("SignatureDishesSubTitle")}</p>
      </div>

      <div className="grid lg:grid-cols-5 grid-cols-1 md:mt-12 mt-8">
        {dishes.map((dish, index) => (
          <div
            key={index}
            className="signature-box overflow-hidden lg:aspect-9/12 bg-black/20 flex items-center justify-center flex-col text-center py-12 px-4 relative text-white"
          >
            <div className="img w-full h-full absolute left-0 top-0">
              <div className="bg-[#400004]/70 w-full h-full absolute z-1 top-0 left-0"></div>
              <img className="w-full h-full object-cover" src={dish.img} alt={dish.title} />
            </div>
            <div className="relative z-10">
              <h4 className="aboreto-text text-[#F5E3BF] xl:text-[35px] text-[26px]">{dish.title}</h4>
              {dish.subtitle && <h6>{dish.subtitle}</h6>}
              <p className="lg:text-[16px] lg:leading-normal leading-[1.2] mt-[14px]">{dish.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
