"use client"

import { useState } from "react"
import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"
import { ThemeToggle } from "./ui/theme-toggle"

import { usePathname } from "next/navigation"

export function Navigation() {

  const pathname = usePathname()

  const linkClass = (path: string) =>
  `text-primary font-semibold transition ${
    pathname === path ? "underline" : "hover:underline"
  }`

  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)

  return (
    <>
      <nav className="absolute top-0 w-full backdrop-blur lg:z-50 z-10 bg-[#F5E3BF] py-[10px] lg:px-12 z-61 flex items-center w-full" style={{minHeight: '92px'}}>
        <div className="max-w-[1300px] mx-auto px-4 w-full">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="logo text-2xl font-serif font-bold text-accent lg:min-w-[200px]">
                <img src={'/logo/logo.svg'} alt="logo"/>
            </Link>

            {/* Desktop Menu */}
            <div className={`hidden md:flex gap-5 items-center tracking-wider`}>
              <Link href="/" className={linkClass("/")}>
                {t("home")}
              </Link>
              <Link href="/restaurant-menu" className={linkClass("/restaurant-menu")}>
                {t("menu")}
              </Link>
              {/* <Link href="#gallery" className="text-primary font-semibold hover:underline transition">
                {t("gallery")}
              </Link> */}
            </div>
            <div className="flex items-center gap-2 justify-end md:min-w-[200px]">
              <Link
                href="/contact-us"
                className="btn btn-primary hover:opacity-90 transition"
              >
                {t("contact")}
              </Link>

              <LanguageSwitcher />

              {/* Mobile Menu Button */}
              <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </nav>
      {/* Mobile Dropdown */}

      <ThemeToggle />

      {/* Dropdown Menu */}
      <div
        className={`bg-primary text-white absolute right-0 mt-2 w-40 py-3 bg-white rounded-0 shadow-lg overflow-hidden transition transition-ease duration-300 top-[70px] w-full z-60 top-0
        ${isOpen ? "translate-y-[0%] max-h-96" : "-translate-y-[200%] pointer-events-none"}`}
      >
        <Link
          href="/"
          className="block px-4 py-3  hover:underline transition"
          onClick={() => setIsOpen(false)}
        >
          {t("home")}
        </Link>
        <Link
          href="/restaurant-menu"
          className="block px-4 py-3  hover:underline transition"
          onClick={() => setIsOpen(false)}
        >
          {t("menu")}
        </Link>
        <Link
          href="#gallery"
          className="block px-4 py-3  hover:underline transition"
          onClick={() => setIsOpen(false)}
        >
          {t("gallery")}
        </Link>
      </div>
      {isOpen && <div className="bg-black/60 w-full h-full inset-0 fixed z-50"></div>}
    </>
  )
}
