import 'package:flutter/material.dart';
import 'package:phone_app/buttons/back.dart';
import 'package:phone_app/forms/components/login.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).brightness == Brightness.dark
          ? Colors.black
          : null,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(30.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              CustomBackButton(),

              SizedBox(height: 50,),
              Spacer(flex: 2,),
        
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("Bon retour parmi nous !", style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),),
                  Text("Connectez-vous pour réserver.", style: TextStyle(fontSize: 16)),
                  SizedBox(height: 60,),
                  LoginForm()
                ],
              ),

              Spacer(flex: 8)
            ],
          ),
        ),
      ),
    );
  }
}
