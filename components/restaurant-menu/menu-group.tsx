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
  images: string[]
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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerCategory, setDrawerCategory] = useState<MenuCategory | null>(null);

  return (
    <>
      <main>
        {(t.categories as MenuCategory[]).map((category) => (
          <section key={category.id} className="py-7 md:py-10 px-4" id={category.id}>
            <div className="flex justify-center">
              <h2 className="aboreto-text dark:text-secondary text-center md:text-[35px] text-[24px] md:mb-[50px] mb-[25px] bg-white/20 px-4 rounded-md">
                {category.name}
              </h2>
            </div>

            <div className="space-y-10">
              {category.sections.slice(0, 2).map((section, sectionIndex) => (
                <div
                  key={section.id}
                  className={`item-row flex flex-col ${sectionIndex % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } items-center gap-6 lg:gap-12`}
                >
                  <div className="image rounded-md overflow-hidden product-preview--image">
                    <Image
                      src={category.categoryImage || "/placeholder.svg"}
                      width="400"
                      height="431"
                      alt={`${category.name} category`}
                    />
                  </div>

                  <ul className="flex-1 w-full">
                    {section.items.map((item) => (
                      <li
                        key={item.id}
                        className=" md:flex items-center justify-between gap-5 cursor-pointer rounded-xl p-3 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:bg-gray-100  dark:hover:bg-color-primary/40 dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]active:scale-[0.98] active:bg-gray-200  dark:active:bg-color-primary/60"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="item flex items-center gap-3 flex-1">
                          <div className="image rounded-sm product-item--image">
                            <Image
                              src={item.images?.[0] ?? "/placeholder.svg"}
                              width="120"
                              height="82"
                              alt={item.name}
                            />
                          </div>

                          <div className="info text-black dark:text-color-secondary flex-1">
                            <div className="flex gap-2 items-center flex-1 mb-2">
                              <h5 className="aboreto-text text-xl lg:text-3xl flex items-center gap-2 flex-1">
                                {item.name}

                                {item.isSpicy && (
                                  <span className="dark:text-secondary">
                                    <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8427 7.67243C21.0593 7.88903 21.1809 8.18276 21.1809 8.48902C21.1809 8.79529 21.0593 9.08902 20.8427 9.30562L15.8843 14.2641H18.393L24.9846 7.67243C25.0911 7.56212 25.2186 7.47413 25.3595 7.4136C25.5004 7.35306 25.652 7.3212 25.8054 7.31987C25.9587 7.31854 26.1108 7.34776 26.2527 7.40583C26.3947 7.46391 26.5237 7.54967 26.6321 7.65812C26.7405 7.76656 26.8263 7.89552 26.8844 8.03747C26.9425 8.17942 26.9717 8.33151 26.9704 8.48487C26.969 8.63823 26.9372 8.78979 26.8766 8.9307C26.8161 9.07162 26.7281 9.19907 26.6178 9.30562L21.6593 14.2641H26.8846C27.1661 14.2641 27.4378 14.367 27.6488 14.5533C27.8598 14.7396 27.9955 14.9966 28.0304 15.2758C28.3113 17.5047 27.8626 19.7645 26.7516 21.717C25.6405 23.6694 23.9269 25.2094 21.8672 26.1064L22.3015 27.8446C22.344 28.0149 22.3471 28.1925 22.3106 28.3641C22.2742 28.5358 22.1991 28.6968 22.0911 28.8351C21.9831 28.9734 21.8451 29.0852 21.6874 29.1622C21.5297 29.2391 21.3566 29.2791 21.1812 29.2792H14.2511C14.0757 29.2791 13.9025 29.2391 13.7449 29.1622C13.5872 29.0852 13.4491 28.9734 13.3412 28.8351C13.2332 28.6968 13.1581 28.5358 13.1216 28.3641C13.0852 28.1925 13.0883 28.0149 13.1308 27.8446L13.565 26.1064C11.5054 25.2094 9.79176 23.6694 8.68071 21.717C7.56966 19.7645 7.121 17.5047 7.40192 15.2758C7.43683 14.9966 7.57251 14.7396 7.78349 14.5533C7.99447 14.367 8.26622 14.2641 8.54769 14.2641H12.6179L19.2096 7.67243C19.4262 7.4559 19.7199 7.33426 20.0262 7.33426C20.3324 7.33426 20.6262 7.4559 20.8427 7.67243ZM9.63109 16.5741C9.63044 18.2936 10.178 19.9686 11.1944 21.3557C12.2107 22.7427 13.6427 23.7696 15.2825 24.2872C15.5632 24.3756 15.7996 24.5677 15.9434 24.8244C16.0872 25.0812 16.1276 25.3831 16.0564 25.6686L15.7295 26.9691H19.7004L19.3759 25.6686C19.3046 25.3831 19.345 25.0812 19.4889 24.8244C19.6327 24.5677 19.8691 24.3756 20.1497 24.2872C21.7895 23.7696 23.2216 22.7427 24.2379 21.3557C25.2542 19.9686 25.8018 18.2936 25.8012 16.5741H9.63109Z" fill="currentColor" />
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
                          €{item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {category.sections.length > 2 &&
                <div className="flex justify-center">
                  <button className="cursor-pointer aboreto-text px-8 md:py-3 py-2 rounded-full border-2 border-color-primary text-white transition-all duration-300 tracking-wide bg-color-primary dark:bg-color-secondary dark:text-color-primary hover:opacity-70"
                    onClick={() => {
                      setDrawerCategory(category);
                      setIsDrawerOpen(true);
                      document.querySelector('body')?.classList.add('open-drawer');
                    }}
                  >
                    See more
                  </button>
                </div>
              }
            </div>
          </section>
        ))}
      </main>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="modal-content lg:max-w-[1240px] bg-white dark:bg-color-primary px-6 lg:px-[92px] block max-h-[calc(100vh-10px)] overflow-auto modal-menu-width">
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
                  €{selectedItem.price}
                </span>
              </div>

              {/* Image Gallery */}
              <ImageModal selectedItem={selectedItem} />
            </div>
          )}
        </DialogContent>
      </Dialog>


      {/* SEE MORE MODAL */}
      <div
        className={`fixed inset-0 z-100 transition-all duration-300 ${isDrawerOpen ? "visible" : "invisible"
          }`}
      >
        {/* Background Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => {
            setIsDrawerOpen(false);
            document.querySelector('body')?.classList.remove('open-drawer');
          }}
        ></div>

        {/* Drawer Panel */}
        <aside
          className={`absolute right-0 top-0 h-full bg-white dark:bg-color-primary/90 shadow-xl 
            lg:w-[80%] w-full overflow-auto transition-transform duration-300
            ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Drawer Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-300 dark:border-white/20">
            <h2 className="aboreto-text text-3xl text-color-primary dark:text-color-secondary">
              {drawerCategory?.name}
            </h2>

            <button
              onClick={() => {
                setIsDrawerOpen(false);
                document.querySelector('body')?.classList.remove('open-drawer');
              }}
              className="text-2xl dark:text-white close-button cursor-pointer hover:bg-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12h18m0 0l-8.5-8.5M21 12l-8.5 8.5" /></svg>
            </button>
          </div>

          <div className="space-y-10 p-10">
            {(drawerCategory?.sections || []).map((section, sectionIndex) => (
              <div
                key={section.id}
                className={`item-row flex flex-col ${sectionIndex % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-6 lg:gap-12`}
              >
                <div className="image rounded-md overflow-hidden product-preview--image">
                  <Image
                    src={drawerCategory?.categoryImage || "/placeholder.svg"}
                    width={400}
                    height={431}
                    alt={`${drawerCategory?.name} category`}
                  />
                </div>

                <ul className="flex-1 w-full">
                  {section.items.map((item) => (
                    <li
                      key={item.id}
                      className=" md:flex items-center justify-between gap-5 cursor-pointer rounded-xl p-3 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:bg-gray-100  dark:hover:bg-color-primary/40 dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]active:scale-[0.98] active:bg-gray-200  dark:active:bg-color-primary/60"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="item flex items-center gap-3 flex-1">
                        <div className="image rounded-sm product-item--image">
                          <Image
                            src={item.images[0] || "/placeholder.svg"}
                            width={120}
                            height={82}
                            alt={item.name}
                          />
                        </div>

                        <div className="info text-black dark:text-color-secondary flex-1">
                          <div className="flex gap-2 items-center flex-1 mb-2">
                            <h5 className="aboreto-text text-xl lg:text-3xl flex items-center gap-2 flex-1">
                              {item.name}

                              {item.isSpicy && (
                                <span className="dark:text-secondary">
                                  <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8427 7.67243C21.0593 7.88903 21.1809 8.18276 21.1809 8.48902C21.1809 8.79529 21.0593 9.08902 20.8427 9.30562L15.8843 14.2641H18.393L24.9846 7.67243C25.0911 7.56212 25.2186 7.47413 25.3595 7.4136C25.5004 7.35306 25.652 7.3212 25.8054 7.31987C25.9587 7.31854 26.1108 7.34776 26.2527 7.40583C26.3947 7.46391 26.5237 7.54967 26.6321 7.65812C26.7405 7.76656 26.8263 7.89552 26.8844 8.03747C26.9425 8.17942 26.9717 8.33151 26.9704 8.48487C26.969 8.63823 26.9372 8.78979 26.8766 8.9307C26.8161 9.07162 26.7281 9.19907 26.6178 9.30562L21.6593 14.2641H26.8846C27.1661 14.2641 27.4378 14.367 27.6488 14.5533C27.8598 14.7396 27.9955 14.9966 28.0304 15.2758C28.3113 17.5047 27.8626 19.7645 26.7516 21.717C25.6405 23.6694 23.9269 25.2094 21.8672 26.1064L22.3015 27.8446C22.344 28.0149 22.3471 28.1925 22.3106 28.3641C22.2742 28.5358 22.1991 28.6968 22.0911 28.8351C21.9831 28.9734 21.8451 29.0852 21.6874 29.1622C21.5297 29.2391 21.3566 29.2791 21.1812 29.2792H14.2511C14.0757 29.2791 13.9025 29.2391 13.7449 29.1622C13.5872 29.0852 13.4491 28.9734 13.3412 28.8351C13.2332 28.6968 13.1581 28.5358 13.1216 28.3641C13.0852 28.1925 13.0883 28.0149 13.1308 27.8446L13.565 26.1064C11.5054 25.2094 9.79176 23.6694 8.68071 21.717C7.56966 19.7645 7.121 17.5047 7.40192 15.2758C7.43683 14.9966 7.57251 14.7396 7.78349 14.5533C7.99447 14.367 8.26622 14.2641 8.54769 14.2641H12.6179L19.2096 7.67243C19.4262 7.4559 19.7199 7.33426 20.0262 7.33426C20.3324 7.33426 20.6262 7.4559 20.8427 7.67243ZM9.63109 16.5741C9.63044 18.2936 10.178 19.9686 11.1944 21.3557C12.2107 22.7427 13.6427 23.7696 15.2825 24.2872C15.5632 24.3756 15.7996 24.5677 15.9434 24.8244C16.0872 25.0812 16.1276 25.3831 16.0564 25.6686L15.7295 26.9691H19.7004L19.3759 25.6686C19.3046 25.3831 19.345 25.0812 19.4889 24.8244C19.6327 24.5677 19.8691 24.3756 20.1497 24.2872C21.7895 23.7696 23.2216 22.7427 24.2379 21.3557C25.2542 19.9686 25.8018 18.2936 25.8012 16.5741H9.63109Z" fill="currentColor" />
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
          </div>
        </aside>
      </div>


    </>
  )
}
