import Wrapper from "@/components/wrappers/Wrapper";
import { Suspense } from "react";

import type { Metadata } from "next";
import VerifyMail from "@/components/user/verify-mail";

export const metadata: Metadata = {
  title: "Vérification d'email",
};

export default function MailVerificationPage() {
  return (
    <Wrapper>
      <div className="w-full h-20 mb-8"></div>
      <Suspense>
        <VerifyMail />
      </Suspense>
    </Wrapper>
  );
}
