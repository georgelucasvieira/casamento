"use client";

import { useEffect, useState } from "react";
import MenuToggle from "./MenuToggle";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const currentPath = usePathname()

  const paths = {
    home: "/",
    presentes: "/presentes",
    presenca: "/confirmar-presenca",
    instrucoes: "/instrucoes",
    localizacao: "/localizacao",
  };

  const shouldStartWhite = currentPath === paths.home;

  const [isTextWhite, setIsTextWhite] = useState(shouldStartWhite)

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

  }, [currentPath])

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full">
        <div className={`
            ${isTextWhite
            ? ""
            : "lg:bg-white"
          }
            flex items-center justify-between px-6 py-6 lg:px-12
          `}>
          {/* Logo */}
          <div className={`
            ${isTextWhite || isOpen
              ? "text-white"
              : "text-black"
            }
            text-2xl font-light font-cormorant
          `}>
            <img src="/images/monograma.png"
              className={`${isTextWhite || isOpen
                ? "invert"
                : ""
                } w-12 h-12 cursor-pointer`}
              onClick={() => { window.location.pathname = "/" }} />
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

            <a href={paths.presenca}
              className={`
                ${currentPath === paths.presenca ?
                  "font-cormorant-700 italic text-4xl lowercase" :
                  "regular pt-2"}
              `}
            >Confirmação</a>

            <a href={paths.instrucoes}
              className={`
                ${currentPath === paths.instrucoes ?
                  "font-cormorant-700 italic text-4xl lowercase" :
                  "regular pt-2"}
              `}
            >Instruções</a>

            <a href={paths.localizacao}
              className={`
                ${currentPath === paths.localizacao ?
                  "font-cormorant-700 italic text-4xl lowercase" :
                  "regular pt-2"}
              `}
            >Localização</a>
          </nav>

          {/* Mobile Button */}
          <div className="md:hidden">
            <MenuToggle
              isOpen={isOpen}
              isTextWhite={isTextWhite}
              toggle={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} />
    </>
  );
}