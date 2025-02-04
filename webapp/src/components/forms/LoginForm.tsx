import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LogIn, UserRoundPlus } from "lucide-react";

import LoginInput from "@/components/forms/Input";

import Link from "next/link";

export default function LoginForm() {
  return (
    <Tabs defaultValue="login" className="max-w-md w-full">
      <TabsList className="grid w-full grid-cols-2 bg-card border-border border-[1px]">
        <TabsTrigger value="login">Connexion</TabsTrigger>
        <TabsTrigger value="register">S'enregistrer</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Identifiants</CardTitle>
          </CardHeader>
          <form action="">
            <CardContent className="space-y-2">
              <LoginInput
                id="login_email"
                content="Adresse mail"
                placeholder="exemple@vlib.com"
                textCase="lowercase"
              />

              <LoginInput
                id="login_password"
                content="Mot de passe"
                placeholder="******"
                type="password"
              />

              <div>
                <Link
                  href="/reinitialisation-identifiants"
                  className="ms-1 text-sm"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center items-center mx-16">
              <Button
                type="submit"
                className="w-full tracking-wider flex items-center justify-center gap-2"
                effect={"ringHover"}
              >
                <LogIn />
                <span>Se connecter</span>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Création d'un compte</CardTitle>
            <CardDescription>
              Vous n'avez pas encore de compte ? Créez-en un gratuitement dès
              maintenant.
            </CardDescription>
          </CardHeader>
          <form action="">
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
            <CardFooter className="flex justify-center items-center mx-10">
              <Button
                className="w-full tracking-wider flex items-center justify-center gap-2"
                effect={"ringHover"}
                type="submit"
              >
                <UserRoundPlus />
                <span>S'enregistrer</span>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
