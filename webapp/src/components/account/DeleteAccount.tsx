import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";

import { Trash2 } from "lucide-react";

const apiUrl = "/api/delete-account";

export default function DeleteAccount() {
  const deleteAccount = async () => {
    const response = await fetch(apiUrl, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.href = "/";
    }
    else {
      toast.error("Erreur lors de la suppression du compte. Veuillez réessayer.");
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="w-full py-2 px-4 rounded-sm transition-all duration-200 text-red-600 hover:bg-red-600 hover:text-background"
          >
            Supprimer
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Suppression de compte
            </DialogTitle>
            <DialogDescription>
              Attention, cette action est irréversible. Toutes vos données
              seront perdues.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="mt-4 w-full tracking-wider bg-red-700 flex hover:bg-red-600 items-center justify-center gap-2"
              onClick={deleteAccount}
            >
              <Trash2 />
              <span>Supprimer</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
