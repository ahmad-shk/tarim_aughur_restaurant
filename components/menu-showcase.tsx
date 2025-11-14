"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

export function MenuShowcase() {
  const [selectedView, setSelectedView] = useState<string | null>(null)
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)

  const menuItems = [
    { image: "slice-1.png", name: "Patatas Bravas", price: "$5.00", description: "Crispy potatoes with signature sauce" },
    { image: "slice-2.png", name: "Paella de Mariscos", price: "$18.00", description: "Seafood paella with saffron rice" },
    { image: "slice-3.png", name: "Chuletón de Buey", price: "$30.00", description: "Premium beef steak" },
    { image: "slice-4.png", name: "Cocido Madrileño", price: "$16.00", description: "Traditional Madrid stew" },
  ]

  return (
    <section id="menu" className="xl:py-20 py-12 relative">
      <img src={'/image/slice-bg.png'} className="absolute left-0 top-0 z-1 xl:block hidden" />
      <div className="max-w-[1300px] mx-auto px-4 relative z-10">
        <div className="text-center xl:mb-12 mb-8 space-y-1">
          <h2 className="aboreto-text dark:text-secondary 2xl:text-[60px] xl:text-[50px] text-[28px] leading-[1.1]">{t("sliceOfHeaven")}</h2>
          <p className="2xl:text-[40px] text-[24px]">{t("essenceOfFlavors")}</p>
        </div>
        <div className="dark:bg-white/10 bg-[#66282C]/10 md:p-7 p-4 rounded-[14px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[7px]">
            {menuItems.map((item, idx) => (
              <div key={idx} className="dark:bg-black/37 bg-[#66282C] rounded-lg hover:shadow-lg transition overflow-hidden">
                <div className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <img
                    src={`/image/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover md:aspect-9/9 aspect-4/2"
                  />
                </div>
                <div className="pt-[24px] pb-[16px] px-1 text-center">
                  <h3 className="aboreto-text text-[#F5E3BF] xl:text-[23px] mb-2">{item.name}</h3>
                  <p className="text-[#F5E3BF] mb-5 font-bold">{item.price}</p>
                  <div className="flex justify-center items-center">
                    <button className="bg-[#F5E3BF] rounded-[6px] cursor-pointer text-primary px-8 py-2 xl:font-bold font-medium transition transition-ease hover:opacity-85">{t("viewMenu")}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
