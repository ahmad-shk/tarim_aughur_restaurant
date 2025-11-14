"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/lib/language-context"
import type { Language } from "@/lib/translations"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [langDropdown, setLangDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

 const languages: { code: Language; label: string }[] = [
    { code: "de", label: "Deutsch" },
    { code: "en", label: "English" },
    { code: "zh", label: "中文" },
    { code: "ru", label: "Русский" },
  ]

  const toggleDropdown = () => setLangDropdown((prev) => !prev)

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white cursor-pointer hover:shadow-md transition-all duration-200 text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.206 3.182A9.25 9.25 0 0 0 2.78 11.25h4.48c.033-1.096.135-2.176.305-3.2c.207-1.254.515-2.41.91-3.4a9.3 9.3 0 0 1 .731-1.468M12 1.25a10.75 10.75 0 1 0 0 21.5a10.75 10.75 0 0 0 0-21.5m0 1.5c-.261 0-.599.126-.991.532c-.396.41-.791 1.051-1.141 1.925c-.347.869-.63 1.917-.824 3.089c-.155.94-.25 1.937-.282 2.954h6.476a22.5 22.5 0 0 0-.282-2.954c-.194-1.172-.477-2.22-.824-3.089c-.35-.874-.745-1.515-1.14-1.925c-.393-.406-.73-.532-.992-.532m4.74 8.5a24 24 0 0 0-.305-3.2c-.207-1.254-.515-2.41-.91-3.4a9.3 9.3 0 0 0-.732-1.468a9.24 9.24 0 0 1 3.748 2.277a9.25 9.25 0 0 1 2.678 5.791zm-1.502 1.5H8.762c.031 1.017.127 2.014.282 2.954c.194 1.172.477 2.22.824 3.089c.35.874.745 1.515 1.14 1.925c.393.406.73.532.992.532c.261 0 .599-.126.991-.532c.396-.41.791-1.051 1.141-1.925c.347-.869.63-1.917.824-3.089c.155-.94.25-1.937.282-2.954m-.444 8.068c.27-.434.515-.929.73-1.468c.396-.99.704-2.146.911-3.4a24 24 0 0 0 .304-3.2h4.48a9.25 9.25 0 0 1-6.426 8.068m-5.588 0a9.3 9.3 0 0 1-.73-1.468c-.396-.99-.704-2.146-.911-3.4a24 24 0 0 1-.304-3.2H2.78a9.25 9.25 0 0 0 6.425 8.068"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {langDropdown && (
        <div className="absolute right-0 mt-1 w-44 bg-white rounded-[9px] shadow-lg border border-gray-100 overflow-hidden z-20 animate-fadeIn">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setLangDropdown(false)
              }}
              className={`w-full text-left px-5 py-2.5 text-sm transition-colors duration-200 cursor-pointer ${
                language === lang.code
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
