import 'package:flutter/material.dart';


class ImageVelo extends StatelessWidget {
  final String imagePath;
  final double borderRadius;
  final double borderWidth;
  final Color? borderColor;
  final double widthFactor;

  const ImageVelo({
    super.key,
    required this.imagePath,
    this.borderRadius = 12,
    this.borderWidth = 2,
    this.borderColor,
    this.widthFactor = 0.7,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
      child: Center(
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(borderRadius),
            border: Border.all(
              color: borderColor ?? Colors.green.shade700,
              width: borderWidth,
            ),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(borderRadius - 2),
            child: Image.asset(
              imagePath,
              width: MediaQuery.of(context).size.width * widthFactor,
              fit: BoxFit.contain,
            ),
          ),
        ),
      ),
    );
  }
}
