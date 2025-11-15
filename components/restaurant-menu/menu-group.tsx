"use client"

import { useState } from "react"
import Image from "next/image"
import ImageModal from "./images-gallery"
import { Dialog, DialogClose, DialogContent } from "../ui/dialog"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  isSpicy: boolean
}

interface MenuSection {
  id: string
  items: MenuItem[]
}

interface MenuCategory {
  id: string
  name: string
  categoryImage: string
  sections: MenuSection[]
}

export default function MenuGroup() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const { language } = useLanguage()
  const t = translations[language]

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  return (
    <>
      <main>
        {(t.categories as MenuCategory[]).map((category) => (
          <section key={category.id} className="py-7 md:py-10 px-4" id={category.id}>
            <h2 className="aboreto-text dark:text-secondary text-center text-[35px] md:mb-[50px] mb-[25px]">
              {category.name}
            </h2>

            <div className="space-y-10">
              {category.sections.map((section, sectionIndex) => (
                <div
                  key={section.id}
                  className={`item-row flex flex-col ${sectionIndex % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } items-center gap-6 lg:gap-12`}
                >
                  <div className="image rounded-md overflow-hidden cursor-pointer">
                    <Image
                      src={category.categoryImage || "/placeholder.svg"}
                      width="400"
                      height="431"
                      alt={`${category.name} category`}
                    />
                  </div>

                  <ul className="space-y-8 flex-1 w-full">
                    {section.items.map((item) => (
                      <li
                        key={item.id}
                        className=" md:flex items-center justify-between gap-5 cursor-pointer rounded-xl p-3 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:bg-gray-100  dark:hover:bg-color-primary/40 dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]active:scale-[0.98] active:bg-gray-200  dark:active:bg-color-primary/60"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="item flex items-center gap-3 flex-1">
                          <div className="image rounded-sm min-w-[120px] w-[120px]">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              width="120"
                              height="82"
                              alt={item.name}
                            />
                          </div>

                          <div className="info text-black dark:text-color-secondary flex-1">
                            <div className="flex gap-2 items-center flex-1">
                              <h5 className="aboreto-text text-xl lg:text-3xl flex items-center gap-2 flex-1">
                                {item.name}

                                {item.isSpicy && (
                                  <span className="dark:text-secondary">
                                    <svg width="36" height="37" viewBox="0 0 36 37" fill="none">
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M20.8427 7.67243C21.0593 7.88903..."
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </span>
                                )}

                                <div
                                  className="dark:text-white md:block hidden flex-1"
                                  style={{ borderTop: "1px dashed" }}
                                ></div>
                              </h5>
                            </div>

                            <p className="text-xs dark:text-white">{item.description}</p>
                          </div>
                        </div>

                        <span className="aboreto-text text-xl md:text-3xl text-black dark:text-color-secondary block text-end">
                          ${item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="flex justify-center">
                <button className="aboreto-text px-8 md:py-3 py-2 rounded-full border-2 border-color-primary text-white transition-all duration-300 tracking-wide bg-color-primary dark:bg-color-secondary dark:text-color-primary hover:opacity-70">
                  See more
                </button>
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="modal-content lg:max-w-[1240px] bg-white dark:bg-color-primary px-6 lg:px-[92px] block max-h-[calc(100vh-10px)] overflow-auto">
          <DialogClose className="close-button" onClick={() => setIsModalOpen(false)} />

          {selectedItem && (
            <div className="w-full max-w-full mx-auto">
              <div className="flex items-center justify-between mb-11">
                <div>
                  <h3 className="aboreto-text text-2xl lg:text-4xl text-color-primary dark:text-color-secondary flex items-center gap-2.5">
                    {selectedItem.name}

                    {selectedItem.isSpicy && (
                      <svg width="47" height="49" viewBox="0 0 47 49" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M27.553 10.1427..."
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </h3>

                  <p className="text-sm lg:text-base font-normal text-black dark:text-white">
                    {selectedItem.description}
                  </p>
                </div>

                <span className="aboreto-text text-xl md:text-3xl lg:text-[55px] text-color-primary dark:text-color-secondary">
                  ${selectedItem.price}
                </span>
              </div>

              {/* Image Gallery */}
              <ImageModal />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
