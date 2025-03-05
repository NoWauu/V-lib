import Wrapper from "@/components/wrappers/Wrapper";
import Introduction from "@/components/privacy-policy/Introduction";
import DataCollection from "@/components/privacy-policy/DataCollection";
import UseData from "@/components/privacy-policy/UseData";
import ProtectData from "@/components/privacy-policy/ProtectData";
import ShareData from "@/components/privacy-policy/ShareData";
import StorageData from "@/components/privacy-policy/StorageData";
import UserRight from "@/components/privacy-policy/UserRight";
import EditPolicy from "@/components/privacy-policy/EditPolicy";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PolitiqueConfidentialite() {
  return (
    <Wrapper className="flex-grow mx-0 px-0 max-w-full w-full h-full flex flex-col items-center justify-center bg-cover bg-center border-b-2 border-primary">
      <div className="max-w-5xl mx-auto mt-24 md:mt-36 lg:mt-44 px-6 flex flex-col items-start justify-center mb-12">
        <h1 className="text-center self-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
          Politique de confidentialité
        </h1>
        <Introduction/>

        <DataCollection/>

        <UseData/>

        <ShareData/>

        <ProtectData/>

        <StorageData/>

        <UserRight/>

        <EditPolicy/>
      </div>
    </Wrapper>
  );
}
