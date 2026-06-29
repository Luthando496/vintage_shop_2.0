"use client"; // Needed for interactive elements like mobile menu
import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0),
  );

  return (
    <nav className="fixed top-0 w-full bg-luxury-bg/80 backdrop-blur-md z-50 border-b border-luxury-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-wide text-luxury-text"
          >
            VINTAGE <span className="text-luxury-accent">&</span> CO.
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 text-sm font-medium tracking-wider uppercase">
            <Link
              href="/"
              className="hover:text-luxury-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href="/browse"
              className="hover:text-luxury-accent transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="hover:text-luxury-accent transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-luxury-accent transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right Icons (Cart & Account) */}
          <div className="flex items-center space-x-6">
            <Link
              href="/login"
              className="hidden md:block text-sm font-medium hover:text-luxury-accent transition-colors"
            >
              Account
            </Link>
            <Link
              href="/cart"
              className="relative hover:text-luxury-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {/* Mock Cart Count */}
              <span className="absolute -top-2 -right-2 bg-luxury-accent text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 space-y-4 text-center">
            <Link
              href="/"
              className="block text-sm font-medium tracking-wider uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/browse"
              className="block text-sm font-medium tracking-wider uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block text-sm font-medium tracking-wider uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium tracking-wider uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="block text-sm font-medium tracking-wider uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Account
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
