"use client";

import IUserUpdateDataRes from "@/types/IUserUpdateDataRes";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const apiUrl = `/api/verify-mail`;

export default function VerifyMail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("email_token");

  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function verifyMail() {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",  // Set the content type to JSON
          },
          body: JSON.stringify({
            email_token: token,
          }),
        });

        const resData: IUserUpdateDataRes = await response.json();

        if (response.ok) {
          router.push("/compte");
        } else {
          setMessage(resData.message);
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setMessage("Une erreur est survenue côté serveur. Veuillez ré-essayer.");
      }
    }

    if (token) {
      verifyMail();
    } else {
      setMessage("Aucun token fourni.");
    }
  }, []);

  return (
    <>
      {message && (
        <>
          <p className="text-center text-xl text-red-600">Email non vérifié.</p>
          <p className="text-center text-lg text-foreground">{message}</p>
        </>
      )}
    </>
  );
}
