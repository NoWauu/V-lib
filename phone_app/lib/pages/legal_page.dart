import 'package:flutter/material.dart';
import 'package:phone_app/text/sectionTitle.dart';
import 'package:phone_app/text/legalDescription.dart';
import 'package:phone_app/buttons/back.dart';

Widget legalPage() {
  return SafeArea(
    child: LayoutBuilder(
        builder: (context, constraints) {
          return SingleChildScrollView(
            child: Padding(
                padding: const EdgeInsets.only(top: 30, left: 16, right: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 12),
                      child: CustomBackButton(),
                    ),

                    SizedBox(height: 24,),
                    SectionTitle("1. Avis de droits d'auteur"),
                    SizedBox(height: 12,),
                    LegalDescription("Les textes, images, et graphiques présents sur ce site sont la propriété de l'équipe V-Lib, sauf mention contraire."),
                    SizedBox(height: 6,),
                    LegalDescription("Ces contenus sont protégés par les lois et traités internationaux sur les droits d'auteur."),
                    SizedBox(height: 6,),
                    LegalDescription("Toute utilisation,reproduction ou distribution non autorisée de ces matériaux est strictement interdite sans l'autorisation écritepréalable de tous les membres de l'équipe V-Lib."),
                    SizedBox(height: 6,),
                    LegalDescription("Les utilisateurs du site sont informés que toute violation des droits d'auteur peut donner lieu à des poursuites judiciaires et sanctions civiles et pénales."),
                    SizedBox(height: 6,),
                    LegalDescription("Pour toute demande de reproduction ou d'utilisation de notre contenu, veuillez nous contacter à l'aide des informations fournies via la page «Nous contacter»."),

                    SizedBox(height: 24,),
                    SectionTitle("2. Propriétaire du site Web"),
                    SizedBox(height: 12,),
                    LegalDescription("Les propriétaires et administrateurs de ce site Web sont l'équipe V-Lib."),
                    SizedBox(height: 6,),
                    LegalDescription("Les informations pour les contacter sont disponibles sur la page «Nous contacter»."),
                    SizedBox(height: 6,),
                    LegalDescription("Pour toute question ou réclamation concernant le site, n'hésitez pas à nous joindre via les coordonnées trouvées sur cette page."),

                    SizedBox(height: 24,),
                    SectionTitle("3. Liens"),
                    SizedBox(height: 12,),
                    LegalDescription("Ce site Web peut contenir des liens vers des sites externes qui ne sont pas fournis ou maintenus par l'équipe V-Lib."),
                    SizedBox(height: 6,),
                    LegalDescription("Ces liens sont fournis uniquement pour votre commodité et votre référence."),
                    SizedBox(height: 6,),
                    LegalDescription("L'équipe V-Lib ne sera pas responsable du contenu de tout site lié, ou de tout lien contenu dans un site lié."),
                    SizedBox(height: 6,),
                    LegalDescription("De plus, tous les liens vers ce site Web sont autorisés tant que l'origine ne diffuse pas de contenu pouvant être considéré comme offensant."),
                    SizedBox(height: 6,),
                    LegalDescription("Nous vous recommandons de vérifier les politiques de confidentialité et les conditions d'utilisation de ces sites externes avant de les utiliser."),

                    SizedBox(height: 24,),
                    SectionTitle("4. Crédits photographiques"),
                    SizedBox(height: 12,),
                    LegalDescription("Certaines photographies et illustrations utilisées ont été trouvées sur des sites libres de droits dont voici les sites:"),
                    LegalDescription("www.sorbonne.fr"),
                    LegalDescription("www.istockphoto.com"),

                    SizedBox(height: 24,),
                    SectionTitle("5. Lois et collecte de données"),
                    SizedBox(height: 12,),
                    LegalDescription("Toutes les informations collectées sur ce site Web sont mentionnées dans la «Politique de confidentialité»."),
                    SizedBox(height: 6,),
                    LegalDescription("De plus, les données collectées respectent le Règlement Général sur la Protection des Données (RGPD)."),

                    SizedBox(height: 24,),
                    SectionTitle("6. Modifications de cet avis légal"),
                    SizedBox(height: 12,),
                    LegalDescription("L'équipe V-Lib se réserve le droit de mettre à jour ou de modifier cet avis légal à tout moment sans préavis."),
                    SizedBox(height: 6,),
                    LegalDescription("Votre utilisation de ce site Web suite à toute modification constitue votre accord à respecter et être lié par l'avis légal mis à jour."),
                    SizedBox(height: 6,),
                    LegalDescription("Nous vous encourageons à consulter régulièrement cette page afin de prendre connaissance des éventuelles modifications apportées."),
                  ],
                ),
            ),
          );
        })
  );

}

