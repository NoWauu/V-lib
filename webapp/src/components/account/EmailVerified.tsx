import { BadgeCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const apiUrl = "/api/ask-verify-mail";

export default function EmailVerified({ verified }: { verified: boolean }) {
  const verifyMail = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET"
      });

      if (response.ok) {
        toast.success("Email envoyé");
      } else {
        if (response.status === 429) {
          toast.error("Trop de tentatives, veuillez réessayer plus tard.");
          return;
        } else if (response.status === 400)
        {
          toast.error("Token invalide ou expiré.")
          return;
        }
        else {
          toast.error("Une erreur interne est survenue.")
        }
      }
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  }

  return (
    <div className="flex h-full items-center justify-center place-self-start gap-4">
      <p className="flex items-center gap-2">
        <span>Email vérifié : </span>
        {verified ? (
          <span className="text-primary flex items-center gap-2">
            <BadgeCheck className="size-5" />
            <span>Oui</span>
          </span>
        ) : (
          <span className="text-red-600 flex items-center gap-2">
            <ShieldAlert className="size-5" />
            <span>Non</span>
          </span>
        )}
      </p>
      {!verified && <Button variant={"ghost"} onClick={verifyMail}>Vérifier l'adresse</Button>}
    </div>
  );
}
