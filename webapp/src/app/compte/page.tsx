import Wrapper from "@/components/wrappers/Wrapper";

import type { Metadata } from "next";
import AccountTabs from "@/components/account/AccountTabs";

export const metadata: Metadata = {
  title: "Compte",
};

export default function AccountInfo() {
  return (
    <Wrapper>
      <div className="w-full h-20"></div>
      <AccountTabs />
    </Wrapper>
  );
}
