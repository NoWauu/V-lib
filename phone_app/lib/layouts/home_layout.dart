import 'package:flutter/material.dart';

class HomeLayout extends StatefulWidget {
  const HomeLayout({super.key});

  @override
  State<HomeLayout> createState() => _HomeLayoutState();
}

class _HomeLayoutState extends State<HomeLayout> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 30),
      child: Column(
        spacing: 20,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "Réserver vos Vélib' RAPIDEMENT !",
                style: TextStyle(
                  color: Colors.green,
                  fontSize: 20,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Flexible(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 5),
                  child: Text(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis bibendum nunc, vel pellentesque nibh. Nullam vitae tincidunt mi. Pellentesque ornare accumsan orci at molestie. Suspendisse eget maximus elit. Phasellus varius scelerisque justo, vitae volutpat sapien dictum id. Pellentesque sagittis est sed nibh iaculis accumsan",
                    style: TextStyle(
                      fontSize: 14,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ],
          ),
        ],
      ), 
    );
  }
}