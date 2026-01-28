import 'package:flutter/material.dart';
import 'package:phone_app/auth/update_info/components/all_user_info.dart';
import 'package:phone_app/auth/verify_mail/verify_window.dart';
import 'package:phone_app/buttons/back.dart';


class AccountInfoPage extends StatelessWidget {
  const AccountInfoPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(26.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              CustomBackButton(),
              Spacer(flex: 1,),
              MailVerificationWindow(),
              Text("Informations\npersonnelles",
              style: TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.w600
              ),),
              Spacer(flex: 1,),
              DisplayAllUserInfo(),
              Spacer(flex: 7,),
            ]
          )
        ),
      ),
    );
  }
}
