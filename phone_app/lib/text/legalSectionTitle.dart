import 'package:flutter/material.dart';

// ATOM: Titre de section
class LegalSectionTitle extends StatelessWidget {
  final String text;
  const LegalSectionTitle(this.text, {super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16,vertical: 8),
      child: Text(
        text,
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