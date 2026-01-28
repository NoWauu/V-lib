import 'package:flutter/material.dart';


class TextBlock extends StatelessWidget {
  final String text;
  final TextAlign align;
  final double fontSize;

  const TextBlock({
    super.key,
    required this.text,
    this.align = TextAlign.justify,
    this.fontSize = 15,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Text(
        text,
        style: TextStyle(fontSize: fontSize),
        textAlign: align,
      ),
    );
  }
}
