"use client"

import { Navigation } from "@/components/navigation";
import { Reservation } from "@/components/reservation";
import { Hero } from "@/components/restaurant-menu/hero";
import MenuGroup from "@/components/restaurant-menu/menu-group";
import MenuNavigation from "@/components/restaurant-menu/menu-navigation";
import { Testimonials } from "@/components/testimonials";
import { MenuImages } from "@/components/restaurant-menu/MenuImages";
import { useState } from "react";

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

import { Footer } from "@/components/footer"

type MenuCategory = "main_dishes" | "noodles_rice_bowls" | "starters_snacks_salads" | "bbq_grills" | "vegetarish" | "beverages"

export default function ResturantMenu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("main_dishes")
  
  const { language } = useLanguage()
  const t = translations[language] // ✅ correct reference

  const currentTranslations = translations[language] ?? translations.en;
  
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <div className="dark:bg-primary md:py-20 py-12">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="aboreto-text dark:text-secondary 2xl:text-[60px] xl:text-[50px] text-[28px] 2xl:mb-[30px] mb-[5px] text-center">{t.RestaurantMenuText}</h2>
          <MenuNavigation  activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory}
            language={language}   />
          <MenuGroup />
        </div>
      </div>
      <MenuImages />
      <Testimonials />
      <Footer />
    </main>
  )
}
