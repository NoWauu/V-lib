import 'package:flutter/material.dart';

class HomeLayout extends StatefulWidget {
  const HomeLayout({super.key});

  @override
  State<HomeLayout> createState() => _HomeLayoutState();
}

// ATOM: Titre principal
class HomeTitle extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text(
      "Réservez vos Vélib' RAPIDEMENT !",
      style: TextStyle(
        color: Colors.green.shade700,
        fontSize: 22,
        fontWeight: FontWeight.bold,
      ),
      textAlign: TextAlign.center,
    );
  }
}

// ATOM: Description
class HomeDescription extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text(
      "Vous cherchez une solution rapide, pratique et écologique pour vos déplacements en ville ? Ne cherchez plus ! Notre site de réservation de Vélib' est conçu pour rendre vos trajets plus simples et agréables, que ce soit pour aller au travail, faire vos courses ou explorer la ville.",
      style: TextStyle(
        color: Theme.of(context).colorScheme.onSurface,
        fontSize: 15,
      ),
      textAlign: TextAlign.justify,
    );
  }
}

// ATOM: Image d'accueil
class HomeImage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 20),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Colors.green.shade700,
            width: 2,
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(10),
          child: Image.asset(
            'assets/images/home/Photo_Velib_derriere.jpg',
            width: MediaQuery.of(context).size.width * 0.7,
            fit: BoxFit.contain,
          ),
        ),
      ),
    );
  }
}

// ATOM: Titre de section
class SectionTitle extends StatelessWidget {
  final String text;
  SectionTitle(this.text);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Theme.of(context).colorScheme.onSurface,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }
}

// ATOM: Liste à puces
class BulletList extends StatelessWidget {
  final List<String> items;
  BulletList(this.items);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: items
          .map((item) => Padding(
                padding: const EdgeInsets.symmetric(vertical: 2),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("• ", style: TextStyle(fontSize: 15)),
                    Expanded(child: Text(item, style: TextStyle(fontSize: 15))),
                  ],
                ),
              ))
          .toList(),
    );
  }
}

//ATOM: 

// ATOM: Deuxième image d'accueil
class HomeImage2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 20),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Colors.green.shade700,
            width: 2,
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(10),
          child: Image.asset(
            'assets/images/home/Photo_Velib_profil.jpg',
            width: MediaQuery.of(context).size.width * 0.7,
            fit: BoxFit.contain,
          ),
        ),
      ),
    );
  }
}

// ORGANISM: Page d'accueil
class _HomeLayoutState extends State<HomeLayout> {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.only(top: 30, left: 16, right: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                HomeTitle(),
                SizedBox(height: 16),
                HomeDescription(),
                SizedBox(height: 16),
                HomeImage(),
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
                SizedBox(height: 24),
                Text(
                  "Chez V-LIB, nous croyons que se déplacer en vélo doit être une expérience ludique, économique et respectueuse de l’environnement.\n\nQue vous soyez un habitué des Vélib’ ou un utilisateur occasionnel, notre plateforme est là pour répondre à toutes vos attentes.\n\nRejoignez une communauté d’amateurs engagés !\n\nDes milliers de citadins comme vous nous font déjà confiance pour transformer leurs trajets en expériences uniques.\n\nAvec V-LIB, pédalez vers un avenir plus vert et plus connecté.",
                  style: TextStyle(fontSize: 15),
                  textAlign: TextAlign.justify,
                ),
                SizedBox(height: 24),
                HomeImage2(),
                SizedBox(height: 24),
              ],
            ),
          ),
        );
      },
    );
  }
}