export default function UseData(){
  return (
    <div id="hosting" className="mt-16 lg:mt-20">
      <h1 className="text-2xl md:text-4xl text-foreground font-semibold">
        Utilisation des données
      </h1>
      <div className="mt-6 text-lg text-muted-foreground">
        <p>
          Les données collectées sont utilisées uniquement pour les finalités suivantes :
        </p>

        <br/>

        <ul>
          <li>• Création et gestion de votre compte utilisateur</li>
          <li>• Fourniture de nos services de réservation de vélib</li>
        </ul>

        <br/>

        <p>
          Nous nous engageons à ne pas utiliser vos informations personnelles à d'autres fins sans votre consentement explicite.
        </p>
      </div>
    </div>
  );
}