"use client";

import {Button} from "@/components/ui/button";
import {LogIn} from "lucide-react";
import {CardFooter, CardContent} from "@/components/ui/card";
import LoginInput from "@/components/forms/Input";
import ForgotPassword from "@/components/forms/login/ForgotPassword";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {ApiLoginUrl, RedirectAfterLogin, MailRegex} from "@/lib/constants";
import {registerToken} from "@/lib/utils";

export default function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (!(MailRegex.test(loginEmail)) || loginPassword == '') {
      alert("Identifiants de connexion incorrects !");
      return;
    }

    try {
      const response = await fetch(ApiLoginUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        })
      });

      const data = await response.json();
      await registerToken(data);

      if(response.ok){
        router.push(RedirectAfterLogin);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
          type='password'
          value={loginPassword}
          setValueAction={setLoginPassword}
          maxLength={40}
        />

        <ForgotPassword/>
      </CardContent>
      <CardFooter className="flex justify-center items-center mx-16">
        <Button
          className="w-full tracking-wider flex items-center justify-center gap-2"
          effect={"ringHover"}
          onClick={handleSubmit}
        >
          <LogIn/>
          <span>Se connecter</span>
        </Button>
      </CardFooter>
    </form>
  );
}