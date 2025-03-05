import Image from "next/image";

export default function SecondParagraph(){
  return(
    <div className="flex items-center justify-center mt-8 mx-8 gap-96">
      <div className="mt-8 flex-1 justify-center text-center max-w-3xl">
        <p>Chez V-Lib', nous croyons que se déplacer en ville doit être une expérience fluide, économique et respectueuse de l’environnement.</p>
        <p>Que vous soyez un habitué des Vélib’ ou un utilisateur occasionnel, notre plateforme est là pour répondre à toutes vos attentes.</p>
        <p>Rejoignez une communauté d’usagers engagés !</p>
        <p>Des milliers de citadins comme vous nous font déjà confiance pour transformer leurs trajets en expériences uniques.</p>
        <p>Avec V-Lib', pédalez vers un avenir plus vert et plus connecté.</p>
      </div>
      <div className="flex-1 justify-center items-center">
        <Image
          src={"/Photo_Velib_profil.jpg"}
          alt={"Velib_photo"}
          width={350}
          height={1}
          className="block border-box rounded-2xl border-primary border-[3px] mb-8 mt-8 align-middle"
        />
      </div>
    </div>
  );
}