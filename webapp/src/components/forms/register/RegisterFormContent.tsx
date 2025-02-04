import LoginInput from "@/components/forms/Input";
import {CardContent} from "@/components/ui/card";

export default function RegisterFormContent() {
  return (
    <CardContent className="space-y-2">
      <LoginInput
        id="register_lastname"
        content="Nom"
        placeholder="Dupont"
        textCase="uppercase"
      />

      <LoginInput
        id="register_firstname"
        content="Prénom"
        placeholder="Samuel"
        textCase="capitalize"
      />

      <LoginInput
        id="register_address"
        content="Adresse mail"
        placeholder="exemple@vlib.com"
        textCase="lowercase"
      />

      <LoginInput
        id="register_phone_nb"
        content="Numéro de téléphone"
        placeholder="06 12 34 56 78"
        isNumber={true}
      />

      <LoginInput
        id="register_pwd"
        content="Mot de passe"
        placeholder="******"
        type="password"
      />

      <LoginInput
        id="register_pwd_confirm"
        content="Confirmer le mot de passe"
        placeholder="******"
        type="password"
      />
    </CardContent>
  );
}