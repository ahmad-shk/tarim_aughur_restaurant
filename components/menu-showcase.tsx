"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';

export function MenuShowcase() {
  const [selectedView, setSelectedView] = useState<string | null>(null)
  const { language } = useLanguage()
  const router = useRouter();

  const handleClick = () => {
    router.push('/restaurant-menu'); // navigate to /about page
  };

  const t = (key: string) => getTranslation(language, key as any)

  const menuItems = {
    en: [
      { image: "slice-1.jpeg", name: "Uyghur Nan", price: "€3.00", description: "Traditional Uyghur flatbread" },
      { image: "slice-2.jpeg", name: "Big Plate Chicken", price: "€36.00", description: "Large portion of spicy chicken with potatoes and hand-pulled noodles" },
      { image: "specy01.jpeg", name: "Spicy Chicken", price: "€40.00", description: "Spicy sautéed chicken with vegetables" },
      { image: "slice-4.jpeg", name: "Manta", price: "€7.00", description: "Steamed dumplings filled with seasoned meat and onions" },
    ],
    de: [
      { image: "slice-1.jpeg", name: "Uyghur Nan", price: "€3.00", description: "Traditionelles uigurisches Fladenbrot" },
      { image: "slice-2.jpeg", name: "Großer Hühnerteller", price: "€36.00", description: "Große Portion scharfes Hähnchen mit Kartoffeln und handgezogenen Nudeln" },
      { image: "specy01.jpeg", name: "Scharfes Hähnchen", price: "€40.00", description: "Scharf angebratenes Hähnchen mit Gemüse" },
      { image: "slice-4.jpeg", name: "Manta", price: "€7.00", description: "Gedämpfte Teigtaschen gefüllt mit gewürztem Fleisch und Zwiebeln" },
    ],
    zh: [
      { image: "slice-1.jpeg", name: "维吾尔馕", price: "€3.00", description: "传统的维吾尔族大馕" },
      { image: "slice-2.jpeg", name: "大盘鸡", price: "€36.00", description: "大份鲜辣鸡肉配土豆和手工皮带面" },
      { image: "specy01.jpeg", name: "辣子鸡", price: "€40.00", description: "香辣爆炒鸡块配时令蔬菜" },
      { image: "slice-4.jpeg", name: "馒头/薄皮包子", price: "€7.00", description: "鲜肉洋葱馅蒸包" },
    ],
    ru: [
      { image: "slice-1.jpeg", name: "Уйгурский нан", price: "€3.00", description: "Традиционная уйгурская лепешка" },
      { image: "slice-2.jpeg", name: "Дапанцзи", price: "€36.00", description: "Большая порция острой курицы с картофелем и лапшой" },
      { image: "specy01.jpeg", name: "Острая курица", price: "€40.00", description: "Острая обжаренная курица с овощами" },
      { image: "slice-4.jpeg", name: "Манты", price: "€7.00", description: "Паровые пельмени с приправленным мясом и луком" },
    ]
  };

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
            {menuItems[language].map((item, idx) => (
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
                    <button
                      onClick={() => {
                        handleClick()
                      }}

                      className="bg-[#F5E3BF] rounded-[6px] cursor-pointer text-primary px-8 py-2 xl:font-bold font-medium transition transition-ease hover:opacity-85">{t("viewMenu")}</button>
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
