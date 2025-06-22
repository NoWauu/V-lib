import 'package:flutter/material.dart';

class ExpiredBadge extends StatelessWidget {
  const ExpiredBadge({super.key});

  @override
  Widget build(BuildContext context) {
    return Text(
      'Expiré',
      style: const TextStyle(
        color: Colors.red,
        fontWeight: FontWeight.bold,
        fontSize: 16,
      ),
    );
  }
}

