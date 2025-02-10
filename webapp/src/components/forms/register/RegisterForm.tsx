'use client'

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

  async function checkData(data: Response): Promise<boolean> {
    const dataJson = await data.json();

    const responseEmail = dataJson.data.email;
    const responseFirstName = dataJson.data.first_name;
    const responseLastName = dataJson.data.last_name;
    const responsePhone = dataJson.data.phone_number;


    if(responseEmail.toString() !== emailValue) {
      throw new DOMException("Email is invalid");
    }

    if(responseFirstName.toString() !== firstnameValue) {
      throw new DOMException("First name is invalid");
    }
    if(responseLastName.toString() !== lastnameValue) {
      throw new DOMException("Email is invalid");
    }

    if(responsePhone.toString() !== phoneValue) {
      throw new DOMException("Phone number is invalid");
    }

    return true;
  }

  async function handleSubmit() {
    const apiUrl = `https://${process.env.NEXT_PUBLIC_DJANGO_API_ROOT}/users/register`;

    if(passValue !== passValidValue) {
      console.log(`Passwords are different : "${passValue}" / "${passValidValue}"`);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
          "first_name": firstnameValue,
          "last_name": lastnameValue,
          "email": emailValue,
          "phone_number": phoneValue,
          "password": passValue
        })
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
        />

        <LoginInput
          id="register_firstname"
          content="Prénom"
          placeholder="Samuel"
          textCase="capitalize"
          value={firstnameValue}
          setValueAction={firstnameSetValue}
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
        />

        <LoginInput
          id="register_pwd_confirm"
          content="Confirmer le mot de passe"
          placeholder="******"
          type="password"
          value={passValidValue}
          setValueAction={passValidSetValue}
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