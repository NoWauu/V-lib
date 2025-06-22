import 'package:flutter/material.dart';
import 'package:phone_app/buttons/back.dart';
import 'package:phone_app/text/sectionTitle.dart';
import 'package:phone_app/text/textBlock.dart';
import 'package:phone_app/image/image_velo.dart';


Widget aboutUsPage() {
  return Scaffold(
      body: SafeArea(
    child: SingleChildScrollView(
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
                  ImageVelo(imagePath: 'assets/images/about_us/univ.jpg'),
                  SizedBox(height: 32),
                  SectionTitle("Qui sommes-nous ?"),
                  SizedBox(height: 12),
                  TextBlock(
                    text: "Nous sommes cinq étudiants passionnés par le développement et l'innovation. Notre équipe est composée de Mathis, Ryan, Téo, Maxime et Mathew. Nous sommes actuellement en 2e année de BUT Informatique. Nous avons créé ce projet universitaire pour faciliter la location de vélos en libre-service.",
                  ),
                  SizedBox(height: 32),
                  ImageVelo(imagePath: 'assets/images/about_us/velo.jpg'),
                  SizedBox(height: 12),
                  SectionTitle("Pourquoi Vélib ?"),
                  SizedBox(height: 16),
                  TextBlock(
                    text: "Le service Vélib' est un système de vélos en libre-service disponible dans plusieurs villes. Il est devenu un moyen de transport populaire grâce à sa facilité d'accès et son intégration dans la mobilité urbaine. Nous avons été sollicités pour développer une application qui permet de gérer les stations Vélib'. Notre objectif est de privilégier les emprunts plutôt que les achats, car c'est une solution plus écologique.",
                  ),
                  SizedBox(height: 16),
                  SectionTitle("Merci de votre visite et de votre soutien !"),
                  SizedBox(height: 24),
                ],
              ),
            ),
          ),
      ),
  );
}
