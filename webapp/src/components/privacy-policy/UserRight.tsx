import Link from "next/link";

export default function UserRight(){
  return (
    <div id="hosting" className="mt-16 lg:mt-20">
      <h1 className="text-2xl md:text-4xl text-foreground font-semibold">
        Droits des utilisateurs
      </h1>
      <div className="mt-6 text-lg text-muted-foreground">
        <p>
          Conformément à la réglementation en vigueur, vous disposez des droits suivants concernant vos données personnelles :
        </p>

        <br/>

        <ul className="list-disc ml-6">
          <li>Droit d'accès : vous pouvez demander à consulter les informations que nous détenons sur vous.</li>
          <li>Droit de rectification : vous pouvez demander la correction de vos informations personnelles si elles sont inexactes ou incomplètes.</li>
          <li>Droit à l'effacement : vous pouvez demander la suppression de vos informations personnelles dans certaines circonstances.</li>
          <li>Droit d'opposition : vous pouvez vous opposer à l'utilisation de vos données personnelles dans certaines situations.</li>
          <li>Droit à la portabilité des données : vous pouvez demander à recevoir une copie de vos informations personnelles dans un format structuré et lisible par machine.</li>
        </ul>

        <br/>

        <p>
          Pour exercer ces droits, veuillez {" "}

          <Link
            href="/contact"
            className="text-emerald-800"
          >
            nous contacter
          </Link>

          {" "} avec les informations disponibles sur cette page.
        </p>
      </div>
    </div>
  );
}