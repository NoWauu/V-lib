import 'package:flutter/material.dart';
import 'package:phone_app/inputs/password_input.dart';
import 'package:phone_app/inputs/simple_input.dart';
import 'package:phone_app/buttons/btn_with_icon.dart';

import 'package:phone_app/auth/classes/login_credentials.dart';
import 'package:phone_app/auth/providers/auth_provider.dart';
import 'package:phone_app/forms/validation/auth_validations.dart';
import 'package:provider/provider.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      autovalidateMode: AutovalidateMode.onUnfocus,
      key: _formKey,
      child: Column(
        children: <Widget>[
          SimpleInput(icon: Icons.alternate_email, label: "E-mail", controller: _emailController, validator: checkEmail, keyboardType: TextInputType.emailAddress,),
          SizedBox(height: 16),
          PasswordInput(icon: Icons.password, label: "Mot de passe", controller: _passwordController, validator: checkPassword,),
          SizedBox(height: 16),
          ButtonWithIcon(text: "Se connecter", icon: Icons.login,  onPressed: () async {
            if (_formKey.currentState!.validate()) {
              LoginCredentials lc = LoginCredentials(
                  email: _emailController.text,
                  password: _passwordController.text
              );

              if (await context.read<AuthProvider>().login(lc)) {
                Navigator.of(context).pop();
              }
            }
          }),
        ],
      ),
    );
  }
}
