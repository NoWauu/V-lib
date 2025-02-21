"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import Logo from "@/components/header/Logo";

const pagesLinks = [
  { name: "Accueil", path: "/" },
  { name: "Réservation", path: "/reservation" },
  { name: "Nous contacter", path: "/contact" },
  { name: "A propos", path: "/a-propos" },
];

export default function PhoneMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <ChevronLeft onClick={() => setIsOpen(true)} />
      <nav
        className={clsx(
          {
            "w-0": !isOpen,
            "w-full": isOpen,
          },
          "flex overflow-hidden md:hidden flex-col justify-start items-center transition-all duration-300 fixed top-0 right-0 h-full bg-background z-10"
        )}
      >
        <div className="w-full flex py-6 px-6 justify-end items-center overflow-hidden">
          <div
            className="flex items-center gap-2 text-primary"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-2xl">Fermer</span>
            <ChevronRight size={30} />
          </div>
        </div>
        <div className="h-full flex flex-col gap-10 pb-24 self-center justify-center">
          {pagesLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className="text-3xl transition-all w-full text-center text-foreground hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
