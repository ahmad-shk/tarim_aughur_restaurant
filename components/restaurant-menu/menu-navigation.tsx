"use client"

import { translations } from "@/lib/translations"

type MenuCategory = "breakfast" | "lunch" | "dinner" | "desserts"

interface MenuNavigationProps {
  activeCategory: MenuCategory
  onCategoryChange: (category: MenuCategory) => void
  language: keyof typeof translations
}

export default function MenuNavigation({ activeCategory, onCategoryChange, language }: MenuNavigationProps) {
  const currentTranslations = translations[language] ?? translations.en;

  const categories = (Object.keys(currentTranslations.menuCategories) as MenuCategory[])
    .map((id) => ({
      id,
      label: currentTranslations.menuCategories[id],
    }));

  const handleCategoryClick = (category: MenuCategory) => {
    onCategoryChange(category)
    const section = document.getElementById(category)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 50,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav className="lg:pb-16 md:sticky top-0">
      <div className="flex flex-wrap justify-center gap-3 py-4 bg-white dark:bg-color-primary">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-6 py-2 rounded-full text-base cursor-pointer font-medium tracking-wide transition-all duration-300 leading-none ${
              activeCategory === category.id
                ? "bg-color-secondary text-primary"
                : "bg-white/20"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
