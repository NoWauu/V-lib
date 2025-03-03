import Link from "next/link";

export default function Copyright(){
  return(
  <div id="copyright" className="mt-16">
    <h1 className="text-2xl md:text-4xl text-foreground font-semibold">
      1. Avis de droits d'auteur
    </h1>
    <p className="mt-6 text-lg text-muted-foreground">
      Les textes, images, et graphiques présents sur ce site sont la propriété de l'équipe V-Lib, sauf mention contraire.
      Ces contenus sont protégés par les lois et traités internationaux sur les droits d'auteur. Toute utilisation,
      reproduction ou distribution non autorisée de ces matériaux est strictement interdite sans l'autorisation écrite
      préalable de tous les membres de l'équipe V-Lib.

      <br/><br/>

      Les utilisateurs du site sont informés que toute violation des droits d'auteur peut donner lieu à des poursuites
      judiciaires et sanctions civiles et pénales.

      <br/><br/>

      Pour toute demande de reproduction ou d'utilisation de notre contenu, veuillez nous contacter à l'aide des informations
      fournies via la page «

      <Link
        href="/contact"
        className="text-emerald-800 text-[20px]"
      >
        Nous contacter
      </Link>

      ».
    </p>
  </div>
  );
}