import 'package:flutter/material.dart';

// ATOM: Titre principal
class HomeTitle extends StatelessWidget {
  const HomeTitle({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Text(
        "Réservez vos Vélib' RAPIDEMENT !",
        style: TextStyle(
          color: Colors.green.shade700,
          fontSize: 22,
          fontWeight: FontWeight.bold,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }
}