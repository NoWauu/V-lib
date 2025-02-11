"use client";

import {Button} from "@/components/ui/button";
import {LogIn} from "lucide-react";
import {CardFooter, CardContent} from "@/components/ui/card";
import LoginInput from "@/components/forms/Input";
import ForgotPassword from "@/components/forms/login/ForgotPassword";
import {useState} from "react";

export default function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  async function handleSubmit() {
    const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/login`;

    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (!(regex.test(loginEmail)) || loginPassword == '') {
      alert("Identifiants de connexion incorrects !");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          'email': loginEmail,
          'password': loginPassword,
        })
      });

      if (await checkdata(response)) {
        console.log('ok')
      } else {
        console.log('not ok')
      }

      const result = await response;
      console.log(result);
    } catch (error) {
      alert(`Error submitting form: ${error}`)
      console.error('Error submitting form:', error);
    }
  }

  async function tokenRefresh() {
    const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/refresh_token`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          'email': loginEmail,
        })
      });

      if (await checkdata(response)) {
        console.log('ok')
      } else {
        console.log('not ok')
      }

      const result = await response;
      console.log(result);
    } catch (error) {
      alert(`Error submitting form: ${error}`)
      console.error('Error submitting form:', error);
    }
  }

  async function checkdata(data: Response): Promise<boolean> {
    const dataJson = await data.json();

    const responseEmail = await dataJson.data.email;

    if(responseEmail.toString() !== (loginEmail)) {
      console.log('email is invalid');
      throw new Error('email is invalid')
    }

    const tokenExpiration = dataJson.data.token_data.expiration_date;
    let tokenValue = dataJson.data.token_data.token;

    if(new Date(tokenExpiration).valueOf() - Date.now().valueOf() < 0) {
      console.log("Token has expired");
      tokenValue = await tokenRefresh();
    }

    sessionStorage.setItem('token',tokenValue);

    return true;
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
          setValue={setLoginEmail}
        />

        <LoginInput
          id="login_password"
          content="Mot de passe"
          placeholder="******"
          type="password"
          value={loginPassword}
          setValue={setLoginPassword}
          maxLength={28}
        />

        <ForgotPassword/>
      </CardContent>
      <CardFooter className="flex justify-center items-center mx-16">
        <Button
          type="submit"
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