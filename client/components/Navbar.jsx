"use client";

import Link from "next/link";
import { ShoppingBag, Menu, Search, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignInButton } from '@clerk/nextjs'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </button>

        {/* Logo */}
        <div className="flex-shrink-0 md:flex-1 md:text-center flex justify-center w-full md:w-auto">
          <Link href="/" className="font-serif text-2xl md:text-3xl tracking-widest font-bold text-foreground hover:text-primary transition-colors">
            ELEGANCE
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 justify-center space-x-8">
          {["Shop", "Collections", "Our Story", "Journal"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 md:flex-1 flex justify-end items-center space-x-4">
          <button className="p-2 text-muted-foreground hover:text-primary transition-colors hidden sm:block">
            <Search className="h-5 w-5" />
          </button>
          <SignInButton mode="modal">
          <button className="p-2 text-muted-foreground hover:text-primary transition-colors hidden sm:block">
            <User className="h-5 w-5" />
          </button>
          </SignInButton>
          <button className="p-2 text-muted-foreground hover:text-primary transition-colors relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary ring-2 ring-background"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-background">
          <div className="px-4 py-6 space-y-4 flex flex-col items-center">
            {["Shop", "Collections", "Our Story", "Journal"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-lg uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
