import 'package:flutter/material.dart';
import 'package:phone_app/buttons/back.dart';
import 'package:phone_app/forms/components/register.dart';

class RegisterPage extends StatelessWidget {
  const RegisterPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).brightness == Brightness.dark
          ? Colors.black
          : null,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(30.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                CustomBackButton(),
          
                SizedBox(height: 90,),
          
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Bienvenue sur V-lib !", style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),),
                    Text("Créez un compte pour réserver.", style: TextStyle(fontSize: 16)),
                    SizedBox(height: 60,),
                    RegisterForm()
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
