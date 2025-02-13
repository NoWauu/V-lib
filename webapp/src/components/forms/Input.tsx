"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import {Dispatch, SetStateAction} from "react";


export default function LoginInput({
  id,
  content,
  placeholder,
  type = "text",
  textCase = "none",
  isNumber = false,
  maxLength= 100,
  value,
  setValueAction
}: {
  id: string;
  content: string;
  placeholder?: string;
  type?: string;
  textCase?: "uppercase" | "lowercase" | "capitalize" | "none";
  isNumber?: boolean;
  maxLength?: number;
  value: string;
  setValueAction: Dispatch<SetStateAction<string>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumber) {
      const newValue = e.target.value.replace(/[^0-9 ]/g, ""); // Remove non-numeric & non-space characters
      const numberOfCharacters = newValue.replace(/\s/g, "");
      if (numberOfCharacters.length <= 10) {
        setValueAction(newValue);
      }
    } else {
      setValueAction(e.target.value);
    }
  };

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{content}</Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        className={clsx({
          uppercase: textCase === "uppercase",
          lowercase: textCase === "lowercase",
          capitalize: textCase === "capitalize",
          "normal-case": textCase === "none",
        })}
        onChange={handleChange}
        value={value}
        maxLength={maxLength}
      />
    </div>
  );
}
