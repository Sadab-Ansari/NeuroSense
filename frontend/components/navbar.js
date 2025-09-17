"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="
        fixed top-6 left-1/2 -translate-x-1/2 
        flex items-center justify-between w-11/12 max-w-6xl h-14
        bg-white text-gray-900 
        px-6 md:px-8 rounded-full shadow-xl z-50 
        border border-gray-200
      "
    >
      <div className="text-xl font-bold tracking-wide">
        Neuro<span className="text-blue-500">Sense</span>
      </div>

      <div className="hidden md:flex gap-8 text-md font-medium absolute left-1/2 -translate-x-1/2">
        {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative group transition-colors"
          >
            {item}
            <span
              className="absolute left-1/2 -translate-x-1/2 -bottom-1
                w-full h-[2px] bg-blue-500
                transform scale-x-0
                transition-transform duration-500 ease-in-out
                origin-left
                group-hover:scale-x-100"
            ></span>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-1.5 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <button
          className="md:hidden text-gray-700 hover:text-blue-500"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col items-start p-4 gap-4 md:hidden">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
