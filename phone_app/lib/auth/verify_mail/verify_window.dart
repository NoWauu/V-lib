import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:phone_app/buttons/btn_with_icon.dart';
import 'package:provider/provider.dart';
import 'package:phone_app/auth/providers/auth_provider.dart';
import 'package:phone_app/auth/classes/user.dart';
import 'package:http/http.dart' as http;
import 'package:phone_app/config.dart';

class MailVerificationWindow extends StatelessWidget {
  const MailVerificationWindow({super.key});

  Future<void> sendVerificationMail(BuildContext context) async {
    final authProvider = context.read<AuthProvider>();

    final http.Response res = await authProvider.callWrapper(
      () async => await http.post(
        Uri.http(apiUrl, "users/verify-email/"),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: {
          "user_token": authProvider.token?.token,
        },
      ),
    );

    switch (res.statusCode) {
      case 500:
        Fluttertoast.showToast(msg: "Une erreur inconnue est survenue côté serveur.");
        break;
      case 429:
        Fluttertoast.showToast(msg: "Vous effectuez trop de demandes. Veuillez patienter puis réessayer.");
        break;
      case 400:
        if (res.body.contains("already verified")) {
          Fluttertoast.showToast(msg: "Email déjà vérifié. Rafraîchissez l'affichage en appuyant sur le bouton.");
        } else {
          Fluttertoast.showToast(msg: "Votre session n'est plus valide. Veuillez quitter la page pour vous reconnecter.");
        }
        break;
      case 200:
        Fluttertoast.showToast(msg: "Mail envoyé avec succès, vérifiez votre boîte mail.");
        break;
      case _:
        Fluttertoast.showToast(msg: "Une erreur inconnue est survenue. Veuillez vérifier votre connexion à internet et réessayer.");
    }
  }

  Future<void> refreshIsMailVerified(BuildContext context) async {
    final authProvider = context.read<AuthProvider>();

    final http.Response res = await authProvider.callWrapper(
          () async =>
      await http.post(
        Uri.http(apiUrl, "users/is-email-verified/"),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: {
          "token": authProvider.token?.token,
        },
      ),
    );

    if (res.statusCode == 200 && authProvider.user != null) {
      authProvider.setEmailVerified(true);
    } else if (res.statusCode == 400) {
      Fluttertoast.showToast(
          msg: "Une erreur est survenue lors de l'envoi des données. Veuillez relancer l'application");
    } else {
      Fluttertoast.showToast(
          msg: "Votre session n'est plus valide, veuillez vous reconnecter.");
    }
  }

  @override
  Widget build(BuildContext context) {
    final User? user = context.read<AuthProvider>().user;

    if (user != null && !user.isEmailVerified) {
      return Container(
        margin: const EdgeInsets.only(bottom: 24, top: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          border: Border.all(
            color: Colors.redAccent,
            width: 2,
          ),
          borderRadius: BorderRadius.circular(8)
        ),
        child: Column(
          children: [
            Row(
              children: [
              Icon(Icons.warning_rounded, color: Colors.redAccent, size: 26,),
            SizedBox(width: 4,),
            Text("Votre mail n'est pas vérifié", style: TextStyle(
                fontSize: 20
            ),)
          ]
        ),
        SizedBox(height: 16,),
        ButtonWithIcon(text: "Envoyer un mail", icon: Icons.send_rounded, onPressed: () async => { await sendVerificationMail(context)}),
            SizedBox(height: 16,),
            ButtonWithIcon(text: "Rafraîchir", icon: Icons.refresh, onPressed: () => {})
          ],
        ),
      );
    }

    return SizedBox.shrink();
  }
}
