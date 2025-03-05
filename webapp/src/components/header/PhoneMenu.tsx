"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import IResType from "@/types/IResType";
import clsx from "clsx";

const pagesLinks = [
  { name: "Accueil", path: "/" },
  { name: "Réservation", path: "/reservation" },
  { name: "Nous contacter", path: "/contact" },
  { name: "A propos", path: "/a-propos" },
];

export default function PhoneMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const logOut = async () => {
    const response = await fetch("/api/logout");
    const data = await response.json();

    if (data.status === "success") {
      setLoggedIn(false);
      router.push("/");
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch("/api/get-user-data");
      const data: IResType = await response.json();

      const userData = data.userData;
      if (userData) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }

    fetchUserData();
  }, [pathname]);

  return (
    <div className="md:hidden">
      <ChevronLeft strokeWidth={3} onClick={() => setIsOpen(true)} />
      <nav
        className={clsx(
          {
            "w-0": !isOpen,
            "w-full": isOpen,
          },
          "flex overflow-hidden md:hidden flex-col justify-start items-center transition-all duration-300 fixed top-0 right-0 h-full bg-background"
        )}
      >
        <div className="w-full flex py-6 px-2 justify-end items-center overflow-hidden">
          <div
            className="flex items-center gap-2 text-primary"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-xl font-semibold">Fermer</span>
            <ChevronRight strokeWidth={2} size={30} />
          </div>
        </div>
        <div className="h-full flex flex-col gap-10 pb-24 self-center justify-start pt-20">
          {pagesLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className="text-3xl transition-all w-full text-foreground hover:text-primary/90 text-right"
            >
              {link.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <Link
                href="/compte"
                className="text-3xl transition-all w-full text-right text-foreground hover:text-primary/90"
              >
                Compte
              </Link>
              <Link
                href="/deconnexion"
                className="text-3xl transition-all w-full text-right text-foreground hover:text-primary/90"
              >
                <span onClick={logOut}>Se déconnecter</span>
              </Link>
            </>
          ) : (
            <Link
              href="/connexion"
              className="text-3xl transition-all w-full text-right text-foreground hover:text-primary/90"
            >
              Connexion
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
