"use client";

import { useState } from "react";

interface MenuItem {
  title: string;
  description: string;
  price: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    title: "CROQUETAS DE JAMÓN",
    description: "Creamy ham croquetas. A perfect savory breakfast treat.",
    price: "$11",
    image: "/menu/item1.jpg",
  },
  {
    title: "HUEVOS ROTOS",
    description: "Crispy fried potatoes with runny eggs and serrano ham.",
    price: "$13",
    image: "/menu/item2.jpg",
  },
  {
    title: "ESPINACAS CON GARBANZOS",
    description: "Sautéed spinach with chickpeas. Healthy and flavorful.",
    price: "$10",
    image: "/menu/item3.jpg",
  },
  {
    title: "JAMÓN IBÉRICO",
    description: "Premium Iberian ham sliced fresh.",
    price: "$15",
    image: "/menu/item4.jpg",
  },
];

export default function MenuDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 bg-white/20 backdrop-blur border border-white/30 px-4 py-2 rounded-lg text-white shadow-lg"
      >
        Open Menu
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#5b2626] text-white shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/20 flex justify-between items-center">
          <h2 className="text-xl font-semibold tracking-wide">Menu</h2>
          <button onClick={() => setOpen(false)} className="text-sm">
            ✕
          </button>
        </div>

        {/* Menu List */}
        <div className="p-4 space-y-5 overflow-y-auto h-full">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 border-b border-white/10 pb-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
              />

              <div>
                <h3 className="text-lg tracking-wide">{item.title}</h3>
                <p className="text-sm text-white/70">{item.description}</p>
                <p className="mt-1 font-semibold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
