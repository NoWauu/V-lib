import 'package:flutter/material.dart';

// ATOM: Description
class HomeDescription extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Text(
        "Vous cherchez une solution rapide, pratique et écologique pour vos déplacements en ville ? Ne cherchez plus ! Notre site de réservation de Vélib' est conçu pour rendre vos trajets plus simples et agréables, que ce soit pour aller au travail, faire vos courses ou explorer la ville.",
        style: TextStyle(
          color: Theme.of(context).colorScheme.onSurface,
          fontSize: 15,
        ),
        textAlign: TextAlign.justify,
      ),
    );
  }
}