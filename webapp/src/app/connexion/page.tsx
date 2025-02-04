import Wrapper from "@/components/wrappers/Wrapper"
import LoginForm from "@/components/forms/LoginForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
}

export default function LoginRegister() {

  return (
    <Wrapper className="h-full min-h-screen flex items-center justify-center">
      <LoginForm />
    </Wrapper>
  )
}
