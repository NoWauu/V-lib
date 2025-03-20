import Wrapper from "@/components/wrappers/Wrapper";
import Animation from "@/components/home/Animation";
import Introduction from "@/components/home/Introduction";
import FirstParagraph from "@/components/home/FirstParagraph";
import SecondParagraph from "@/components/home/SecondParagraph";
import ReservationButton from "@/components/home/ReservationButton";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil • V-lib",
};

import Outro from "@/components/home/Outro";

export default function HomePage() {
	return (
		<Wrapper
			className="flex-grow mx-0 px-0 max-w-full w-full h-full flex flex-col text-center items-center bg-cover bg-center border-b-2 border-primary mt-24 background">
			<Animation/>

			<div className="mt-10 text-lg text-muted-foreground">

				<Introduction/>

				<FirstParagraph/>

				<SecondParagraph/>

				<Outro/>

				<ReservationButton/>

			</div>
		</Wrapper>
	);
}
