import Wrapper from "@/components/wrappers/Wrapper";
import LoginTab from "@/components/forms/LoginTab";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function LoginRegister() {
  return (
    <Wrapper className="my-auto flex flex-col items-center justify-center">
      <div className="h-20 w-full mb-8"></div>
      <LoginTab />
    </Wrapper>
  );
}
