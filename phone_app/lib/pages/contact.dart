import 'package:flutter/material.dart';
import 'package:phone_app/text/emailBox.dart';
import 'package:phone_app/buttons/back.dart';
import 'package:phone_app/text/sectionTitle.dart';
import 'package:phone_app/text/textContact.dart';

class ContactPage extends StatelessWidget {

  const ContactPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: LayoutBuilder(
        builder: (context, constraints) {
          return SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.only(top: 30, left: 16, right: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Align(
                    alignment: Alignment.centerLeft,
                    child: Padding(
                      padding: const EdgeInsets.only(left: 12),
                      child: CustomBackButton(),
                    ),
                  ),
                  SizedBox(height: 24),
                  SectionTitle("Nos contacts"),
                  SizedBox(height: 24,),
                  TextContact("Mail de l'équipe V-Lib :"),
                  SizedBox(height: 12,),

                  Align(
                    alignment: Alignment.centerLeft,
                    child: SectionTitle("equipevlib@gmail.com"),
                  ),

                  SizedBox(height: 12,),
                  TextContact("Pour toute question, veuillez envoyer un mail à l'équipe V-Lib ou à l'un des membres à l'une des adresses ci-dessous"),
                  SizedBox(height: 24,),
                  TextContact("Mail des membres :"),
                  SizedBox(height: 24,),
                  EmailBox(text: "maxime.stepkowski@edu.univ-paris13.fr"),
                  SizedBox(height: 24),
                  EmailBox(text: "ryan.mariapaul@edu.univ-paris13.fr"),
                  SizedBox(height: 24),
                  EmailBox(text: "teo.lemesle@edu.univ-paris13.fr"),
                  SizedBox(height: 24),
                  EmailBox(text: "mathis.samat@edu.univ-paris13.fr"),
                  SizedBox(height: 24),
                  EmailBox(text: "mathew.prades@edu.univ-paris13.fr"),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}