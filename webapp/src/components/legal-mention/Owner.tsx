import Link from "next/link";

export default function Owner(){
  return (
    <div id="owner" className="mt-16 lg:mt-20">
      <h1 className="text-2xl md:text-4xl text-foreground font-semibold">
        2. Propriétaire du site Web
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Les propriétaires et administrateurs de ce site Web sont l'équipe V-Lib.
        Les informations pour les contacter sont disponibles sur la page «

        <Link
          href="/contact"
          className="text-emerald-800 text-[20px]"
        >
          Nous contacter

        </Link>
        ».

        <br/><br/>

        Pour toute question ou réclamation concernant le site, n'hésitez pas à nous joindre via les coordonnées trouvées sur cette page.
      </p>
    </div>
  );
}