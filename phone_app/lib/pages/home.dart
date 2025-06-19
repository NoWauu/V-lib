import 'package:flutter/material.dart';
import 'package:phone_app/image/imageVelo.dart';
import 'package:phone_app/text/homeDescription.dart';
import 'package:phone_app/text/homeTitle.dart';
import 'package:phone_app/text/sectionTitle.dart';
import 'package:phone_app/text/bulletList.dart';
import 'package:phone_app/text/textBlock.dart';


Widget HomePage() {
  return SafeArea(
    child: LayoutBuilder(
        builder: (context, constraints) {
          return SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.only(top: 30, left: 16, right: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(height: 16),
                  HomeTitle(),
                  SizedBox(height: 16),
                  HomeDescription(),
                  SizedBox(height: 16),
                  ImageVelo(imagePath: 'assets/images/home/Photo_Velib_derriere.jpg'),
                  SizedBox(height: 32),
                  SectionTitle("Pourquoi nous choisir ?"),
                  SizedBox(height: 12),
                  BulletList([
                    "Facilité d’utilisation : Une interface intuitive pour réserver un vélo en quelques clics.",
                    "Proximité : Trouvez rapidement un Vélib’ disponible près de chez vous ou de votre destination.",
                    "Engagement écologique : Contribuez à réduire votre empreinte carbone tout en vous offrant une expérience urbaine unique.",
                  ]),
                  SizedBox(height: 32),
                  SectionTitle("Comment ça marche ?"),
                  SizedBox(height: 12),
                  BulletList([
                    "Inscrivez-vous ou connectez-vous à votre compte.",
                    "Indiquez votre localisation pour découvrir les vélos disponibles à proximité.",
                    "Choisissez votre vélo et réservez-le instantanément.",
                    "Déplacez-vous librement et rapportez le Vélib’ à une station compatible en toute simplicité.",
                  ]),
                  SizedBox(height: 16),
                  TextBlock(
                    text: "Chez V-LIB, nous croyons que se déplacer en vélo doit être une expérience ludique, économique et respectueuse de l’environnement.\n\nQue vous soyez un habitué des Vélib’ ou un utilisateur occasionnel, notre plateforme est là pour répondre à toutes vos attentes.\n\nRejoignez une communauté d’amateurs engagés !\n\nDes milliers de citadins comme vous nous font déjà confiance pour transformer leurs trajets en expériences uniques.\n\nAvec V-LIB, pédalez vers un avenir plus vert et plus connecté.",
                  ),
                  SizedBox(height: 24),
                  ImageVelo(imagePath: 'assets/images/home/Photo_Velib_profil.jpg'),
                  SizedBox(height: 24),
                ],
              ),
            ),
          );
        },
      ),
  );
}
