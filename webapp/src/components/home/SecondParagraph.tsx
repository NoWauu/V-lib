import Image from "next/image";

export default function SecondParagraph(){
  return(
    <div className="flex flex-col lg:flex-row items-center justify-center mt-8 mx-4 lg:mx-8 gap-8 lg:gap-16">
      <div className="mt-8 flex-1 justify-center text-center lg:text-left max-w-md lg:max-w-3xl">
        <p className="mb-4">
          Chez V-Lib&apos;, nous croyons que se déplacer en ville doit être une expérience fluide, économique et respectueuse de l’environnement.
        </p>
        <p className="mb-4">
          Que vous soyez un habitué des Vélib’ ou un utilisateur occasionnel, notre plateforme est là pour répondre à toutes vos attentes.
        </p>
        <p className="mb-4">Rejoignez une communauté d’usagers engagés !</p>
        <p className="mb-4">
          Des milliers de citadins comme vous nous font déjà confiance pour transformer leurs trajets en expériences uniques.
        </p>
        <p>Avec V-Lib&apos;, pédalez vers un avenir plus vert et plus connecté.</p>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Image
          src={"/Photo_Velib_profil.jpg"}
          alt={"Velib_photo"}
          width={350}
          height={250}
          className="block border-box rounded-2xl border-primary border-[3px] mb-8 mt-8 align-middle max-w-full"
        />
      </div>
    </div>
  );
}