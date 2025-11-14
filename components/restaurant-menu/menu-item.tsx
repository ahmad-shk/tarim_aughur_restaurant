"use client"

import Image from "next/image"

interface MenuItemType {
  id: string
  name: string
  description: string
  price: string
  image: string
  vegetarian?: boolean
}

interface MenuItemProps {
  item: MenuItemType
}

export default function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="flex gap-4 md:gap-6 items-center group">
      <div className="relative flex-shrink-0 w-4/12">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="w-8/12">
        <div className="relative">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-lg md:text-xl font-semibold text-foreground tracking-wide">
              {item.name}
              {item.vegetarian && <span className="ml-2 text-sm">🌱</span>}
            </h3>
            <p className="text-lg md:text-xl font-semibold text-primary flex-shrink-0">{item.price}</p>
          </div>
          <p className="text-sm md:text-base text-muted-foreground line-clamp-2">{item.description}</p>
          <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-primary to-transparent"></div>
        </div>
      </div>
    </div>
  )
}
