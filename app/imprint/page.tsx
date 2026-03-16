"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

export default function Imprint() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-grow dark:bg-primary bg-[#F5E3BF] md:pt-20 py-12">
        <div className="max-w-[800px] px-4 mx-auto md:mb-20 mb-12">
          <h1 className="aboreto-text dark:text-secondary text-primary 2xl:text-[55px] xl:text-[50px] text-[28px] md:mb-10 mb-6 leading-[1.3] text-center">
            {t("imprint")}
          </h1>
          
          <div className="dark:text-secondary text-primary md:text-[20px] text-[16px] leading-relaxed whitespace-pre-wrap">
            {t("imprintText")}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
