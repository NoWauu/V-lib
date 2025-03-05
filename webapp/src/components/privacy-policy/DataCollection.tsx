export default function DataCollection(){
  return (
      <div id="hosting" className="mt-16 lg:mt-20">
        <h1 className="text-2xl md:text-4xl text-foreground font-semibold">
          Collecte des données
        </h1>
        <div className="mt-6 text-lg text-muted-foreground">
          <p>
            Nous collectons les informations suivantes lorsque vous vous naviguez sur notre site :
          </p>

          <br/>

          <ul className="list-disc ml-6">
            <li>Adresse e-mail</li>
            <li>Mot de passe</li>
            <li>Nom</li>
            <li>Prénom</li>
            <li>Numéro de téléphone</li>
            <li>Historique des stations</li>
            <li>Stations favorites</li>
          </ul>

          <br/>

          <p>
            Ces informations sont collectées via notre formulaire d'inscription et sont stockées dans une base de données sécurisée.
          </p>
        </div>
      </div>
  );
}