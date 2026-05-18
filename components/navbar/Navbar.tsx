"use client";

import { useEffect, useState } from "react";
import MenuToggle from "./MenuToggle";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTextWhite, setIsTextWhite] = useState(true)

  const paths = {
    home: "/",
    presentes: "/presentes",
    presenca: "/confirmar-presenca",
    fotos: "/fotos",
  }

  const currentPath = usePathname()

  useEffect(() => {
    if (currentPath === paths.home) {
      const handleScroll = () => {
        setIsTextWhite(window.scrollY <= 1200)
      }

      handleScroll()

      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }

    if (currentPath === paths.presentes) {
      setIsTextWhite(false)
    }
  }, [currentPath])

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full">
        <div className="flex items-center justify-between px-6 py-6 lg:px-12">
          {/* Logo */}
          <div className={`
            ${isTextWhite
              ? "text-white"
              : "text-black"
            }
            text-2xl font-light
          `}>
            AG
          </div>

          {/* Desktop */}
          <nav className={`hidden w-full md:flex md:gap-10 md:items-center md:justify-center
            ${isTextWhite
              ? "text-white"
              : "text-black"
            }
            uppercase tracking-[0.2em] text-lg`}>
            <a href={paths.home}
              className={`
                ${currentPath === paths.home ?
                  "font-cormorant-700 italic text-4xl lowercase py-0" :
                  "regular pt-2"}

              `}
            >Início</a>

            <a href={paths.presentes}
              className={`
                ${currentPath === paths.presentes ?
                  "font-cormorant-700 italic text-4xl lowercase" :
                  "regular pt-2"}
              `}
            >Presentes</a>

            <a href={paths.fotos} className="pt-2">Fotos</a>
            <a href={paths.home} className="pt-2">História</a>
          </nav>

          {/* Mobile Button */}
          <div className="md:hidden">
            <MenuToggle
              isOpen={isOpen}
              toggle={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} />
    </>
  );
}