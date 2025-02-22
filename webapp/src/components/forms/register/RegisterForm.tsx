"use client";

import LoginInput from "@/components/forms/Input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ApiRegisterUrl,
  MailRegex,
  EmptyRegex,
  defaultPageLink,
} from "@/lib/constants";
import { toast } from "sonner";
import { responseData } from "@/types/AuthRes";

export default function RegisterForm() {
  const [lastnameValue, lastnameSetValue] = useState("");
  const [firstnameValue, firstnameSetValue] = useState("");
  const [emailValue, emailSetValue] = useState("");
  const [phoneValue, phoneSetValue] = useState("");
  const [passValue, passSetValue] = useState("");
  const [passValidValue, passValidSetValue] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    for (const input of [
      lastnameValue,
      firstnameValue,
      emailValue,
      phoneValue,
      passValue,
      passValidValue,
    ]) {
      if (EmptyRegex.test(input)) {
        toast.error("Champ(s) vide(s)", {
          description: "Veuillez remplir tous les champs.",
        });
        return;
      }
    }

    if (!MailRegex.test(emailValue) || passValue === "") {
      toast.error("Informations incorrectes", {
        description: "Veuillez vérifier les données saisies.",
      });
      return;
    }

    try {
      const response = await fetch(ApiRegisterUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          last_name: lastnameValue,
          first_name: firstnameValue,
          phone_number: phoneValue,
          email: emailValue,
          password: passValue,
        }),
      });

      if (response.ok) {
        const redirectLink = searchParams.get("redirect");
        if (redirectLink) {
          router.push(redirectLink);
        } else {
          router.push(defaultPageLink);
        }
      } else {
        let errorDescription = "";

        if (response.status === 409) {
          errorDescription = "Un compte est déjà associé à cette adresse mail.";
        } else if (response.status === 400) {
          const responseData: responseData = await response.json();
          if (responseData.message === "Missing data") {
            errorDescription = "Certains champs sont manquants.";
          } else if (responseData.message === "Invalid data") {
            errorDescription = "Certains champs sont incorrects.";
          } else {
            errorDescription =
              "Le mot de passe dépasse la limite de caractères autorisée.";
          }
        }

        toast.error("Une erreur est survenue", {
          description: errorDescription,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <form>
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
          onClick={handleSubmit}
        >
          <UserRoundPlus />
          <span>S&#39;enregistrer</span>
        </Button>
      </CardFooter>
    </form>
  );
}
