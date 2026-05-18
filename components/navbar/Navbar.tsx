"use client";

import { useState } from "react";
import MenuToggle from "./MenuToggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full">
        <div className="flex items-center justify-between px-6 py-6 lg:px-12">
          
          {/* Logo */}
          <div className="text-white text-2xl font-light">
            AG
          </div>

          {/* Desktop */}
          <nav className="hidden md:flex gap-10 text-white uppercase tracking-[0.2em] text-sm">
            <a href="#">Início</a>
            <a href="#">Presentes</a>
            <a href="#">Fotos</a>
            <a href="#">História</a>
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