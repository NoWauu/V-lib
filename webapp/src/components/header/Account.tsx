"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import IResType from "@/types/IResType";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown, LogOut, UserRoundPen } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

export default function Account() {
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const logOut = async () => {
    const response = await fetch("/api/logout");
    const data = await response.json();

    if (data.status === "success") {
      setLoggedIn(false);
      router.push("/");
    }
  }

  let redirectLink: string = "/connexion";
  if (pathname !== "/connexion") 
  {
    redirectLink += "?redirect=" + encodeURIComponent(pathname);
  }

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch("/api/get-user-data");
      const data: IResType = await response.json();

      const userData = data.userData;
      if (userData) {
        setUserFirstName(userData.first_name);
        setUserLastName(userData.last_name);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }

    fetchUserData();
  }, [pathname]);

  return (
    <div className="hidden md:block">
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center gap-2 text-lg focus:outline-none text-foreground">
            {userFirstName + " " + userLastName}
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-lg">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/compte" className="flex items-center justify-center gap-2">
                <UserRoundPen />
                <span className="text-lg">Compte</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut />
              <span className="text-lg" onClick={logOut}>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href={redirectLink}
          className="text-lg bg-primary rounded-lg text-background px-3 py-1 hover:bg-primary/85 transition duration-300 hidden md:block"
        >
          Connexion
        </Link>
      )}
    </div>
  );
}
