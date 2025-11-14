"use client"

import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

export function WhereUghurMeetsCuisine() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)

  return (
    <section id="restaurant" className="">
      <div className="max-w-[1300px] mx-auto px-4">
        <div className="grid md:grid-cols-2 md:gap-12 items-center">
          <div className="space-y-6">
            <div className="md:py-0 py-8 md:text-start text-center">
              <h2 className="aboreto-text dark:text-secondary 2xl:text-[60px] xl:text-[50px] text-[28px] leading-[1.2]  whitespace-pre-line mb-[17px]">
                {t("cultureMeetsTitle")}
              </h2>

              <p className="leading-relaxed mb-5">{t("cultureMeetsDesc")}</p>

              <p className="leading-relaxed">{t("chefsBlendDesc")}</p>

              {/* <a
                href="#contact"
                className="inline-block px-8 py-3 bg-accent text-accent-foreground font-serif font-semibold hover:opacity-90 transition"
              >
                {t("contact")}
              </a> */}
            </div>
          </div>

          <div className="relative">
            <img
              src="/image/section-2.png"
              alt="Tarim restaurant interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
