"use client"

import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

export function OurPromise() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)

  return (
    <section className="relative md:pt-20 md:pb-24 py-12 bg-background" style={{background: 'url(/image/our-promise.png) center center no-repeat', backgroundSize: 'cover'}}>
      <div className="bg-layer absolute inset-0 w-full h-full z-1" style={{background: 'linear-gradient(90deg, rgba(102, 40, 44, 0) 4.75%, #66282C 72.26%)'}}></div>
      <div className="max-w-[1300px] mx-auto px-4 relative z-2">
        
        <div className="flex justify-end items-end">
          <div className="md:w-6/12 md:text-left text-center">
            <h2 className="aboreto-text text-[#F5E3BF] 2xl:text-[60px] xl:text-[50px] text-[28px] 2xl:mb-[45px] mb-[10px]">{t("ourPromiseTitle")}</h2>

            <div className="space-y-4">
              <div>
                <h3 className="2xl:text-[35px] xl:text-[30px] text-[24px] text-[#F5E3BF] md:mb-[40px] mb-[20px]">{t("ourPromiseSubtitle")}</h3>
                <p className="text-white 2xl:text-[20px]">{t("ourPromiseDesc")}</p>
              </div>
            </div>
            <div className="mt-[35px]">
              <a href="#" className="btn bg-[#F5E3BF] text-primary">{t("ourPromiseCta")}</a>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}
