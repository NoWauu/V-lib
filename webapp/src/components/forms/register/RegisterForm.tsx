"use client";

import LoginInput from "@/components/forms/Input";
import {CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {UserRoundPlus} from "lucide-react";
import {useState} from "react";


export default function RegisterForm() {
  const [lastnameValue, lastnameSetValue] = useState("");
  const [firstnameValue, firstnameSetValue] = useState("");
  const [emailValue, emailSetValue] = useState("");
  const [phoneValue, phoneSetValue] = useState("");
  const [passValue, passSetValue] = useState("");
  const [passValidValue, passValidSetValue] = useState("");

  async function refreshToken() {
    const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/refresh_token/`;

    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        "email": emailValue,
      })
    });
    const json = await response.json();

    return json.data.token_data.token;
  }

  async function checkData(data: Response): Promise<boolean> {
    const dataJson = await data.json();

    if (!dataJson.hasOwnProperty("data")) {
      console.log("Token data field not found");
      return false;
    }

    if (!dataJson.data.hasOwnProperty("token_data")) {
      console.log("Token data field not found");
      return false;
    }

    if (!dataJson.data.token_data.hasOwnProperty("token")) {
      console.log("Token field not found");
      return false;
    }
    if (!dataJson.data.token_data.hasOwnProperty("expiration_date")) {
      console.log("Token data expiration field not found");
      return false;
    }

    let token = dataJson.data.token_data.token;
    const tokenExpire = dataJson.data.token_data.expiration_date;
    if (new Date(tokenExpire).valueOf() - Date.now() < 0) {
      try {
        token = await refreshToken();
      } catch (e) {
        console.log("An error occured while refreshing the token : " + e);
      }

      if (token !== undefined) {
        sessionStorage.setItem("token", token);
        console.log("Token refreshed.");
      }
    }
      return true;
    }

  async function handleSubmit() {
    const apiUrl = `http://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/register/`;

    if(passValue !== passValidValue) {
      console.log(`Passwords are different : "${passValue}" / "${passValidValue}"`);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", emailValue);
      formData.append("first_name", firstnameValue);
      formData.append("last_name", lastnameValue);
      formData.append("phone_number", phoneValue);
      formData.append("password", passValue);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
        mode: "no-cors"
      });

      if(response.status === 201 && await checkData(response)) {
        console.log("ok");
      } else {
        console.log("not ok");
      }
    } catch (e) {
      console.log(`An error occured while fetching the data : ${e}`);
    }
  }

  return (
    <form action={handleSubmit}>
      <CardContent className="space-y-2">
        <LoginInput
          id="register_lastname"
          content="Nom"
          placeholder="Dupont"
          textCase="uppercase"
          value={lastnameValue}
          setValueAction={lastnameSetValue}
          maxLength={20}
        />

        <LoginInput
          id="register_firstname"
          content="Prénom"
          placeholder="Samuel"
          textCase="capitalize"
          value={firstnameValue}
          setValueAction={firstnameSetValue}
          maxLength={20}
        />

        <LoginInput
          id="register_address"
          content="Adresse mail"
          placeholder="exemple@vlib.com"
          textCase="lowercase"
          value={emailValue}
          setValueAction={emailSetValue}
        />

        <LoginInput
          id="register_phone_nb"
          content="Numéro de téléphone"
          placeholder="06 12 34 56 78"
          isNumber={true}
          value={phoneValue}
          setValueAction={phoneSetValue}
        />

        <LoginInput
          id="register_pwd"
          content="Mot de passe"
          placeholder="******"
          type="password"
          value={passValue}
          setValueAction={passSetValue}
          maxLength={40}
        />

        <LoginInput
          id="register_pwd_confirm"
          content="Confirmer le mot de passe"
          placeholder="******"
          type="password"
          value={passValidValue}
          setValueAction={passValidSetValue}
          maxLength={40}
        />
      </CardContent>

      <CardFooter className="flex justify-center items-center mx-10">
        <Button
          className="w-full tracking-wider flex items-center justify-center gap-2"
          effect={"ringHover"}
          type="submit"
        >
          <UserRoundPlus/>
          <span>S&#39;enregistrer</span>
        </Button>
      </CardFooter>
    </form>
  );
}