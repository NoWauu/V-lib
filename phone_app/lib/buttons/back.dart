import 'package:flutter/material.dart';

class CustomBackButton extends StatelessWidget {
  const CustomBackButton({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () { Navigator.pop(context); },
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: const [
          Icon(Icons.arrow_back_ios_rounded, size: 18,),
          SizedBox(width: 4,),
          Text("Retour", style: TextStyle(fontSize: 18, letterSpacing: 2, fontWeight: FontWeight.w500),)
        ],
      ),
    );
  }
}
