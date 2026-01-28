import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:phone_app/auth/providers/auth_provider.dart';

class ButtonDisconnect extends StatefulWidget {
  final String text;
  final IconData icon;

  const ButtonDisconnect({super.key, required this.text, required this.icon});

  @override
  State<ButtonDisconnect> createState() => _ButtonDisconnectState();
}

class _ButtonDisconnectState extends State<ButtonDisconnect> {
  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final backgroundColor = isDark
        ? Colors.grey.shade900.withValues(alpha: 0.5)
        : Colors.grey.shade700.withValues(alpha: 0.1);

    final borderColor = Colors.grey.shade600.withValues(alpha: 0.3);

    final textColor = Colors.red;

    return ElevatedButton(
      onPressed:
          () => {
            showDialog(
              context: context,
              builder:
                  (context) => AlertDialog(
                    title: Text("Déconnexion"),
                    content: Text("Voulez-vous vraiment vous déconnecter ?"),
                    actions: [
                      TextButton(
                        child: Text(
                          "Annuler",
                          style: TextStyle(color: Colors.grey),
                        ),
                        onPressed: () => Navigator.of(context).pop(),
                      ),
                      TextButton(
                        child: Text(
                          "Confirmer",
                          style: TextStyle(color: Colors.redAccent),
                        ),
                        onPressed: () {
                          // Call the logout method
                          context.read<AuthProvider>().logout();

                          // Close the dialog
                          Navigator.of(context).pop();
                        },
                      ),
                    ],
                  ),
            ),
          },
      style: ElevatedButton.styleFrom(
        backgroundColor: backgroundColor,
        minimumSize: Size(double.infinity, 54),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(6),
          side: BorderSide(color: borderColor, width: 1),
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
                Icon(widget.icon, color: textColor, size: 24),
                SizedBox(width: 16),
                Text(
                  widget.text,
                  style: TextStyle(fontSize: 18, color: textColor),
                ),
              ],
            ),
            Icon(Icons.arrow_forward_ios_rounded, color: textColor),
          ],
        ),
      ),
    );
  }
}
