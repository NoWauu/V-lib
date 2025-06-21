import 'package:flutter/material.dart';

// ATOM: Description
class LegalDescription extends StatelessWidget {
  final String text;
  LegalDescription(this.text);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Text(
        text,
        style: TextStyle(
          color: Theme.of(context).colorScheme.onSurface,
          fontSize: 15,
        ),
        textAlign: TextAlign.justify,
      ),
    );
  }
}