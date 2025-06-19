import 'package:flutter/material.dart';
import 'package:phone_app/buttons/back.dart';
import 'package:phone_app/text/bulletList.dart';
import 'package:phone_app/text/sectionTitle.dart';
import 'package:phone_app/text/textBlock.dart';


Widget PrivacyPolicy() {
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
                  SizedBox(height: 16),
                  SectionTitle("Introduction"),
                  SizedBox(height: 12),
                  TextBlock(
                    text: "Nous, L'équipe V-Lib, attachons une grande importance à la protection de vos données personnelles et à votre vie privée. Cette politique de confidentialité a pour but de vous informer sur la manière dont nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre application mobile.",
                  ),
                  SizedBox(height: 12),
                  SectionTitle("Collecte des données"),
                  SizedBox(height: 16),
                  TextBlock(
                    text: "Nous collectons les informations suivantes lorsque vous vous naviguez sur notre application mobile :",
                  ),
                  BulletList([
                    "Adresse e-mail",
                    "Mot de passe",
                    "Nom",
                    "Prénom",
                    "Numéro de téléphone",
                    "Historique des stations",
                    "Staions favorites",
                  ]),
                  TextBlock(
                    text: "Ces informations sont collectées via notre formulaire d'inscription et sont stockées dans une base de données sécurisée.",
                  ),
                  SizedBox(height: 16),
                  SectionTitle("Utilisation des données"),
                  SizedBox(height: 16),
                  TextBlock(
                    text: "Les données collectées sont utilisées uniquement pour les finalités suivantes :",
                  ),
                  BulletList([
                    "Création et gestion de votre compte utilisateur",
                    "Fourniture de nos services de réservation de vélib",
                  ]),
                  TextBlock(
                    text: "Nous nous engageons à ne pas utiliser vos informations personnelles à d'autres fins sans votre consentement explicite.",
                  ),
                  SizedBox(height: 16),
                  SectionTitle("Partage des données"),
                  SizedBox(height: 16),
                  TextBlock(
                    text: "Nous ne partageons, ne vendons ni ne louons vos informations personnelles à des tiers.",
                  ),
                  TextBlock(
                    text: "Les données collectées sont strictement utilisées en interne pour fournir et améliorer notre service."
                  ),
                  SizedBox(height: 16),
                  SectionTitle("Protection des données"),
                  SizedBox(height: 16),
                  TextBlock(
                    text: "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé, toute modification, divulgation ou destruction.",
                  ),
                  SizedBox(height: 16),
                  SectionTitle("Conservation des données"),
                  SizedBox(height: 16),
                  TextBlock(
                    text: "Vos informations personnelles sont conservées aussi longtemps que nécessaire pour fournir nos services et répondre à nos obligations légales.",
                  ),
                  TextBlock(text: "Lorsque les données ne sont plus nécessaires, nous les supprimons de manière sécurisée."),
                  SizedBox(height: 16),
                  SectionTitle("Droits des utilisateurs"),
                  TextBlock(text: "Conformément à la réglementation en vigueur, vous disposez des droits suivants concernant vos données personnelles :"),
                  BulletList([
                    "Droit d'accès : Vous pouvez demander l'accès à vos données personnelles que nous détenons.",
                    "Droit de rectification : Vous pouvez demander la correction de vos données personnelles si elles sont inexactes ou incomplètes.",
                    "Droit à l'effacement : Vous pouvez demander la suppression de vos données personnelles dans certaines circonstances.",
                    "Droit à la limitation du traitement : Vous pouvez demander la limitation du traitement de vos données dans certaines situations.",
                    "Droit à la portabilité des données : Vous pouvez demander à recevoir vos données personnelles dans un format structuré, couramment utilisé et lisible par machine.",
                  ]),
                  TextBlock(
                    text: "Pour exercer ces droits, veuillez nous contacter à l'adresse e-mail fournie dans la section 'Contact' de cette politique.",
                  ),
                  SizedBox(height: 16),
                  SectionTitle("Modifications de la politique de confidentialité"),
                  SizedBox(height: 16),
                  TextBlock(
                    text: "Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour.",
                  ),
                  TextBlock(
                    text: "Nous vous encourageons à consulter régulièrement cette politique pour rester informé des éventuelles modifications.",
                  ),
                  SizedBox(height: 16),
                ],
              ),
            ),
          );
        },
      ),
  );
}
