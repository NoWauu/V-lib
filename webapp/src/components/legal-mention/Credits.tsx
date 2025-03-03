import Link from "next/link";

export default function Credits(){
  return (
    <div id="laws" className="mt-16 lg:mt-20">
      <h1 className="text-2xl md:text-4xl text-foreground font-semibold">
        5. Crédits photographiques
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Certaines photographies et illustrations utilisées ont été trouvées sur des sites libres de droits dont voici les liens:

        <br/><br/>

        <Link
          href="https://www.sorbonne.fr"
          className="text-emerald-800 text-[20px]"
        >
          www.sorbonne.fr
        </Link>

        <br/><br/>

        <Link
          href="https://www.istockphoto.com"
          className="text-emerald-800 text-[20px]"
        >
          www.istockphoto.com
        </Link>

        <br/><br/>

        Toute autre utilisation des images présentes sur ce site doit faire l'objet d'une autorisation préalable des détenteurs des droits.
      </p>
    </div>
  );
}
