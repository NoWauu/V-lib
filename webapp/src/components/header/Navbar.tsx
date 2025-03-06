import Logo from "@/components/header/Logo";
import Links from "@/components/header/Links";
import MaxWidthWrapper from "@/components/wrappers/Wrapper";
import Account from "@/components/header/Account";

import { Rubik } from "next/font/google";
import PhoneMenu from "./PhoneMenu";

const rubik = Rubik({
  weight: "variable",
  subsets: ["latin"],
});

export default function Navbar() {
  return (
    <>
      <div className="w-full fixed z-50">
        <MaxWidthWrapper
          className={`relative bg-background flex items-center justify-between md:px-10 px-4 py-4 border-b-2 border-x-2 md:rounded-b-3xl shadow-sm ${rubik.className}`}
        >
          <Logo />
          <Links />
          <Account />

          <PhoneMenu />
        </MaxWidthWrapper>
      </div>
    </>
  );
}
