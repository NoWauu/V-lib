import Wrapper from "@/components/wrappers/Wrapper";
import LoginTab from "@/components/forms/LoginTab";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function LoginRegister() {
  return (
    <Wrapper className="flex-grow mx-0 px-0 max-w-full w-full h-full flex flex-col items-center justify-center bg-[url(/bg.jpg)] bg-cover bg-center border-b-2 border-primary">
      <div className="flex-grow flex items-center justify-center w-full h-full backdrop-blur-[6px] bg-black bg-opacity-30 pb-8 pt-24">
        <LoginTab />
      </div>
    </Wrapper>
  );
}
