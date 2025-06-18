import 'package:flutter/material.dart';

class ButtonWithIcon extends StatefulWidget {
  final String text;
  final IconData icon;
  final VoidCallback onPressed;

  const ButtonWithIcon({
    super.key,
    required this.text,
    required this.icon,
    required this.onPressed
  });

  @override
  State<ButtonWithIcon> createState() => _ButtonWithIconState();
}

class _ButtonWithIconState extends State<ButtonWithIcon> {
  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final backgroundColor = isDark
      ? Colors.green.shade700.withValues(alpha: 0.3)
      : Colors.green.shade700;

    final textColor = isDark
      ? Colors.green
      : Colors.white;

    return ElevatedButton(
      onPressed: widget.onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: backgroundColor,
        minimumSize: Size(double.infinity, 54),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        shadowColor: Colors.transparent,
        elevation: 0,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Icon(widget.icon, color: textColor),
          SizedBox(width: 8),
          Text(
            widget.text,
            style: TextStyle(fontSize: 18, color: textColor),
          ),
        ],
      ),
    );
  }
}
