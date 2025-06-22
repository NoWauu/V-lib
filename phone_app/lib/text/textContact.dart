import 'package:flutter/material.dart';

// ATOM: Description
class TextContact extends StatelessWidget {
  final String text;
  const TextContact(this.text, {super.key});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerLeft, // ← aligne le texte à gauche
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Text(
          text,
          style: TextStyle(
            color: Theme.of(context).colorScheme.onSurface,
            fontSize: 15,
          ),
          textAlign: TextAlign.left,
        ),
      ),
    );
  }
}