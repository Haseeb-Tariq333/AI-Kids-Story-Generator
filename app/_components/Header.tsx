"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const { user, isSignedIn } = useUser();
  const MenuList = [
    { name: "Home", href: "/" },
    { name: "Create Story", href: "/create-story" },
    { name: "Explore", href: "/explore" },
    { name: "Contact", href: "/contact-us" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white/90 backdrop-blur-sm shadow-sm"
      maxWidth="full"
    >
      {/* Left Side - Logo */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-teal-600 text-white rounded-lg p-1.5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">
              Kidso Stories
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Center - Navigation Links */}
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {MenuList.map((item, index) => (
          <NavbarItem key={index}>
            <Link 
              href={item.href}
              className="text-gray-700 hover:text-teal-600 transition-colors px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Side - Auth Buttons */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/dashboard">
            <Button 
              className="bg-teal-600 text-white hover:bg-teal-700 transition-colors"
              size="md"
            >
              {isSignedIn ? "Dashboard" : "Get Started"}
            </Button>
          </Link>
        </NavbarItem>
        {isSignedIn && (
          <NavbarItem>
            <UserButton afterSignOutUrl="/" />
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-4">
        {MenuList.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-gray-700 hover:text-teal-600 p-3 rounded-lg hover:bg-teal-50 transition-colors block"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;
