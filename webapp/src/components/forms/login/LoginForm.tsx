"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { CardFooter, CardContent } from "@/components/ui/card";
import LoginInput from "@/components/forms/Input";
import ForgotPassword from "@/components/forms/login/ForgotPassword";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiLoginUrl, defaultPageLink, MailRegex } from "@/lib/constants";
import { toast } from "sonner";

export default function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (!MailRegex.test(loginEmail) || loginPassword == "") {
      toast.error("Identifiants incorrects", {
        description: "Un champ au minimum est dans un format incorrect.",
      });
      return;
    }

    try {
      const response = await fetch(ApiLoginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      if (response.ok) {
        const redirectLink = searchParams.get("redirect");
        console.log(redirectLink)
        if (redirectLink) {
          router.push(redirectLink);
        } else {
          router.push(defaultPageLink);
        }
      } else {
        if (response.status === 404) {
          toast.error("Identifiants incorrects", {
            description: "Veuillez vérifier les informations saisies.",
          });
        } else {
          toast.error("Une erreur est survenue", {
            description: "Merci de réessayer ultérieurement.",
          });
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <form action="">
      <CardContent className="space-y-2 -z-10">
        <LoginInput
          id="login_email"
          content="Adresse mail"
          placeholder="exemple@vlib.com"
          textCase="lowercase"
          value={loginEmail}
          setValueAction={setLoginEmail}
          maxLength={80}
        />

        <LoginInput
          id="login_password"
          content="Mot de passe"
          placeholder="******"
          type="password"
          value={loginPassword}
          setValueAction={setLoginPassword}
          maxLength={40}
        />

        <ForgotPassword />
      </CardContent>
      <CardFooter className="flex justify-center items-center mx-16">
        <Button
          className="w-full tracking-wider flex items-center justify-center gap-2"
          effect={"ringHover"}
          onClick={handleSubmit}
        >
          <LogIn />
          <span>Se connecter</span>
        </Button>
      </CardFooter>
    </form>
  );
}
