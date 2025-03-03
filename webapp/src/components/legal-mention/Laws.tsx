import Link from "next/link";

export default function Laws(){
  return (
    <div id="laws" className="mt-16 lg:mt-20">
      <h1 className="text-2xl md:text-4xl text-foreground font-semibold">
        6. Lois et collecte de données
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Toutes les informations collectées sur ce site Web sont mentionnées dans la {" "}

        <Link
          href="/politique-de-confidentialité"
          className="text-emerald-800 text-[20px]"
        >
          politique de confidentialité
        </Link>
        .
        De plus, les données collectées respectent le Règlement Général sur la Protection des Données (RGPD).
      </p>
    </div>
  );
}