import 'package:flutter/material.dart';

class EmailBox extends StatelessWidget {
  final String text;

  const EmailBox({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.green.shade700, width: 2),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 17,
          color: Theme.of(context).colorScheme.onSurface,        ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
