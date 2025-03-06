import Wrapper from "@/components/wrappers/Wrapper";
import {Mail} from "lucide-react";
import ListMail from "@/components/contact/ListMail";
import Titre from "@/components/contact/Titre";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <Wrapper className="flex-grow mx-0 px-0 max-w-full w-full h-full flex flex-col items-center justify-center bg-white bg-cover bg-center border-b-2 border-primary">
      <div className="h-20 w-full mb-8"></div>
        <div className="bg-white text-center space-y-10 p-4 rounded-xl mb-9">
          <Titre/>
          <ListMail/>
        </div>
    </Wrapper>
  );
}