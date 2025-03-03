import Wrapper from "@/components/wrappers/Wrapper";
import Copyright from "@/components/legal-mention/Copyright";
import Owner from "@/components/legal-mention/Owner"
import Hosting from "@/components/legal-mention/Hosting";
import Links from "@/components/legal-mention/Links";
import Laws from "@/components/legal-mention/Laws"
import NoticeChanges from "@/components/legal-mention/NoticeChanges";
import Credits from "@/components/legal-mention/Credits"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales",
};

export default function MentionsLegales() {
  return (
    <Wrapper className="flex-grow mx-0 px-0 max-w-full w-full h-full flex flex-col items-center justify-center bg-cover bg-center border-b-2 border-primary">
      <div className="max-w-5xl mx-auto mt-24 md:mt-36 lg:mt-44 px-6 flex flex-col items-start justify-center mb-12">
        <h1 className="text-center self-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
          Mentions Légales
        </h1>

        <Copyright/>

        <Owner/>

        <Hosting/>

        <Links/>

        <Credits/>

        <Laws/>

        <NoticeChanges/>

      </div>
    </Wrapper>
  );
}
