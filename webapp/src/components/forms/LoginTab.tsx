import { Tabs } from "@/components/ui/tabs";

import TopBar from "@/components/forms/TopBar";
import LoginContent from "@/components/forms/login/LoginContent";
import RegisterContent from "@/components/forms/register/RegisterContent";
import { Suspense } from "react";

export default function LoginTab() {
  return (
    <Suspense>
      <Tabs defaultValue="login" className="max-w-md w-full">
        <TopBar />
    
        <LoginContent />
        <RegisterContent />
      </Tabs>
    </Suspense>
  );
}
