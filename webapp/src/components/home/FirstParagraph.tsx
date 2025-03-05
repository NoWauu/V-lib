import Image from "next/image";
import Title from "@/components/atoms/Title";

export default function FirstParagraph(){
  return(
    <div className="flex items-center justify-center mt-8 mx-8">
      <div className="flex-1 justify-center items-center">
        <Image
          src={"/Photo_Velib_derriere.jpg"}
          alt={"Velib_photo"}
          width={650}
          height={490}
          className="block border-box rounded-2xl border-primary border-[3px] mb-8 mt-8 align-middle"
        />
      </div>
      <div className="mt-8 flex-1">
        <Title text={"Pourquoi nous choisir ?"}/>
        <ul className="list-disc ml-6 text-justify">
          <li>Facilité d’utilisation : Une interface intuitive pour réserver un vélo en quelques clics.</li>
          <li>Proximité : Trouvez rapidement un Vélib’ disponible près de chez vous ou de votre destination.</li>
          <li>Engagement écologique : Contribuez à réduire votre empreinte carbone tout en vous offrant une expérience urbaine unique.</li>
        </ul>
        <Title text={"Comment ça marche ?"}/>
        <ul className="list-disc ml-6 text-justify">
          <li>Inscrivez-vous ou connectez-vous à votre compte.</li>
          <li>Indiquez votre localisation pour découvrir les vélos disponibles à proximité.</li>
          <li>Choisissez votre vélo et réservez-le instantanément.</li>
          <li>Déplacez-vous librement et rapportez le Vélib’ à une station compatible en toute simplicité.</li>
        </ul>
      </div>
    </div>
  );
}