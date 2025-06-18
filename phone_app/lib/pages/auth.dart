// pages/auth.dart
import 'package:flutter/material.dart';
import 'package:phone_app/buttons/btn_with_icon.dart';
import 'package:phone_app/pages/login.dart';
import 'package:phone_app/pages/register.dart';

class AuthPage extends StatelessWidget {
  const AuthPage({super.key});

  void _goTo(BuildContext context, Widget page) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => page));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).brightness == Brightness.dark
          ? Colors.black
          : null,
      body: SafeArea(
        child: Stack(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 60.0),
              child: Align(
                alignment: Alignment.topCenter,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Spacer(flex: 1),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Image.asset(
                          "assets/images/logo/logo_texte.png",
                          fit: BoxFit.contain,
                          height: 180,
                          width: 180,
                        ),
                      ],
                    ),
                    Spacer(flex: 1),
                    Column(
                      children: [
                        ButtonWithIcon(text: "Se connecter", icon: Icons.login, onPressed: () { _goTo(context, LoginPage()); }),
                        SizedBox(height: 30),
                        ButtonWithIcon(text: "Créer un compte", icon: Icons.person_add, onPressed: () { _goTo(context, RegisterPage()); }),
                      ],
                    ),
                    Spacer(flex: 1),
                  ],
                ),
              ),
            ),

            // Bottom Text
            Positioned(
              bottom: 30,
              left: 40,
              right: 40,
              child: Text(
                "© 2025 Equipe V-Lib. Tous droits réservés.",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 14, color: Colors.grey),
              ),
            ),
          ],
        ),
      ),
    );

  }
}
