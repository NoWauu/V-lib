"use client";

import {Button} from "@/components/ui/button";
import {LogIn} from "lucide-react";
import {CardFooter, CardContent} from "@/components/ui/card";
import LoginInput from "@/components/forms/Input";
import ForgotPassword from "@/components/forms/login/ForgotPassword";
import {useState} from "react";
import {responseData} from "@/types/AuthRes";
import {useRouter} from "next/navigation";

export default function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const apiUrl = `/api/login`;

    const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;

    if (!(regexEmail.test(loginEmail)) || loginPassword == '') {
      alert("Identifiants de connexion incorrects !");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
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
      await handleToken(data);

      if(response.ok){
        router.push('/');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  async function handleToken(fromData: responseData): Promise<void>{
    if(!fromData.data) {
      return;
    }

    const tokenValue = fromData.data.token_data.token;
    sessionStorage.setItem('token', tokenValue);
  }

  return (
    <form action="">
      <CardContent className="space-y-2">
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