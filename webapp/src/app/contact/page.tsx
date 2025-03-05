import Wrapper from "@/components/wrappers/Wrapper";
import {Mail} from "lucide-react";

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
          <div className="border border-emerald-800 p-4 rounded-md w-fit m-auto">Email de l'équipe<br/>equipevlib@gmail.com</div>
          
          <div>
            <p className="mb-3">Email des membres :</p>
            <div className="grid w-full grid-cols-2 grid-row-3">
              <div className="border border-emerald-800 p-4 rounded-md m-2 grow">Maxime STEPKOWSKI<br/>maxime.stepkowski@edu.univ-paris13.fr</div>
              <div className="border border-emerald-800 p-4 rounded-md m-2 grow">Téo LEMESLE<br/>teo.lemesle@edu.univ-paris13.fr</div>
              <div className="border border-emerald-800 p-4 rounded-md m-2">Mathew PRADES<br/>mathew.prades@edu.univ-paris13.fr</div>
              <div className="border border-emerald-800 p-4 rounded-md m-2 grow">Ryan MARIA PAUL<br/>ryan.mariapaul@edu.univ-paris13.fr</div>
            </div>
          <div className="border border-emerald-800 p-4 rounded-md m-2 grow">Mathis SAMAT<br/>mathis.samat@edu.univ-paris13.fr</div>
        </div>
      </div>
    </Wrapper>
  );
}