import Wrapper from "@/components/wrappers/Wrapper";
import {Mail} from "lucide-react";
import GridAddress from "@/components/about_us/GridAddress";
import MailCard from "@/components/about_us/MailCard";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function LoginRegister() {
  return (
    <Wrapper className="flex-grow mx-0 px-0 max-w-full w-full h-full flex flex-col items-center justify-center bg-white bg-cover bg-center border-b-2 border-primary">
      <div className="h-20 w-full mb-8"></div>
        <div className="bg-white text-center space-y-10 p-4 rounded-xl mb-9">
          <div className="gap-2 flex text-center items-center justify-center">
              <Mail className="size-5" strokeWidth={3}/>
              <span className="text-2xl font-semibold leading-none tracking-tight">Nous contacter</span>
          </div>
          <MailCard Email="equipevlib@gmail.com" NomPrenom="Email de l'équipe"/>
          
          <div>
            <GridAddress/>
        </div>
      </div>
    </Wrapper>
  );
}