"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "E-commerce", href: "#ecommerce" },
  { label: "Brands", href: "#brands" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/[0.08] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logos/Blueprinter - Logo Design - final_Icoon Los - Black.svg"
            alt="Blueprinter"
            width={40}
            height={40}
          />
          <span
            className="text-md font-medium tracking-[0.15em] text-black uppercase"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            BLUEPRINTER
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-mid transition-colors hover:text-black"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://app.blueprinter.io"
            className="inline-flex h-8 items-center rounded-md border border-black/20 px-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
          >
            Login
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-5 bg-black transition-transform ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-black transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-5 bg-black transition-transform ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="border-t border-black/[0.08] bg-white px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium text-gray-mid transition-colors hover:text-black"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://app.blueprinter.io"
            className="mt-2 block py-2 text-sm font-medium text-black"
          >
            Login
          </a>
        </nav>
      )}
    </header>
  );
}
