"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const apiUrl = '/api/update-user-data';

export default function ModifyValue({
  label,
  defaultValue,
  fieldName,
}: {
  label: string;
  defaultValue: string;
  fieldName: string;
}) {
  const [value, setValue] = useState(defaultValue);

  const updateData = async () => {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        field: fieldName,
        newValue: value,
      }),
    });

    if (response.ok) window.location.reload();
    else toast.error("Une erreur est survenue.", {
      description: "Les données entrées sont peut-être invalides. Vos informations n'ont pas été modifiées.",
    });
  };

  return (
    <>
      <div className="w-full mx-auto flex-col">
        <Label>{label}</Label>
        <div className="w-full flex max-w-xs items-center space-x-2">
          <Input readOnly value={defaultValue} />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Pencil />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Modification d'une information</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4 place-items-center">
                <div className="flex flex-col justify-center items-start gap-2 px-4 w-full">
                  <Label htmlFor="username" className="text-right">
                    {label}
                  </Label>
                  <Input defaultValue={defaultValue} onChange={(e) => setValue(e.target.value)} />
                </div>
              </div>
              <DialogFooter className="flex justify-end gap-4">
                <Button
                  className="sm:max-w-[200px] max-w-full sm:py-2 py-6 tracking-wider flex items-center justify-center gap-2"
                  onClick={updateData}
                >
                  <Save />
                  Enregistrer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
