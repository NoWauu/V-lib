import 'package:flutter/material.dart';

class ButtonTabs extends StatefulWidget {
  final String text;
  final IconData icon;
  final VoidCallback onPressed;

  const ButtonTabs({
    super.key,
    required this.text,
    required this.icon,
    required this.onPressed
  });

  @override
  State<ButtonTabs> createState() => _ButtonTabsState();
}

class _ButtonTabsState extends State<ButtonTabs> {
  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final backgroundColor = isDark
        ? Colors.grey.shade900.withValues(alpha: 0.5)
        : Colors.grey.shade700.withValues(alpha: 0.1);

    final borderColor = Colors.grey.shade600.withValues(alpha: 0.3);

    final textColor = isDark
        ? Colors.white
        : Colors.black;

    return ElevatedButton(
      onPressed: widget.onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: backgroundColor,
        minimumSize: Size(double.infinity, 54),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(6),
          side: BorderSide(
            color: borderColor,
            width: 1
          )
        ),
        shadowColor: Colors.transparent,
        elevation: 0,
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 12.0, horizontal: 0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              children: [
                Icon(widget.icon, color: textColor, size: 24,),
                SizedBox(width: 16),
                Text(
                  widget.text,
                  style: TextStyle(fontSize: 18, color: textColor),
                ),  
              ]
            ),
            Icon(Icons.arrow_forward_ios_rounded, color: textColor,)
          ],
        ),
      ),
    );
  }
}
