import 'package:flutter/material.dart';
import 'package:phone_app/inputs/password_input.dart';
import 'package:phone_app/inputs/simple_input.dart';
import 'package:phone_app/buttons/btn_with_icon.dart';

import 'package:phone_app/forms/validation/auth_validations.dart';
import 'package:phone_app/auth/providers/auth_provider.dart';
import 'package:phone_app/auth/classes/register_credentials.dart';
import 'package:provider/provider.dart';

class RegisterForm extends StatefulWidget {
  const RegisterForm({super.key});

  @override
  State<RegisterForm> createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  final _formKey = GlobalKey<FormState>();
  final _lastNameController = TextEditingController();
  final _firstNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _phoneNumberController = TextEditingController();

  @override
  void dispose() {
    _lastNameController.dispose();
    _firstNameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _phoneNumberController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      autovalidateMode: AutovalidateMode.onUnfocus,
      child: Column(
        children: <Widget>[
          Row(
            children: [
              Flexible(child: SimpleInput(icon: Icons.text_fields_rounded, label: "Nom", controller: _lastNameController, validator: checkName, keyboardType: TextInputType.text, textCapitalization: TextCapitalization.characters,)),
              SizedBox(width: 20,),
              Flexible(child: SimpleInput(icon: Icons.text_fields_rounded, label: "Prénom", controller: _firstNameController, validator: checkName, keyboardType: TextInputType.text, textCapitalization: TextCapitalization.words,)),
            ],
          ),

          SizedBox(height: 16),
          SimpleInput(icon: Icons.alternate_email, label: "E-mail", controller: _emailController, validator: checkEmail, keyboardType: TextInputType.emailAddress),
          SizedBox(height: 16),
          SimpleInput(icon: Icons.phone, label: "Numéro de téléphone", controller: _phoneNumberController, validator: checkPhoneNumber, keyboardType: TextInputType.number),
          SizedBox(height: 16),
          PasswordInput(icon: Icons.password, label: "Mot de passe", controller: _passwordController, validator: checkPassword,),
          SizedBox(height: 16,),
          PasswordInput(icon: Icons.password, label: "Confirmer le mot de passe", controller: _confirmPasswordController, validator: (value) {
            if (value == null || value.isEmpty) {
              return "Champ vide.";
            } else if (value != _passwordController.text) {
              return "Différent.";
            }

            return null;
          },),
          SizedBox(height: 16,),
          ButtonWithIcon(text: "Créer", icon: Icons.person_add, onPressed: () async {
            if (_formKey.currentState!.validate()) {
              RegisterCredentials rc = RegisterCredentials(
                  email: _emailController.text,
                  password: _passwordController.text,
                  firstName: _firstNameController.text,
                  lastName: _lastNameController.text,
                  phoneNumber: _phoneNumberController.text
              );

              if (await context.read<AuthProvider>().register(rc)) {
                Navigator.of(context).pop();
              }
            }
          }),
        ],
      ),
    );
  }
}
