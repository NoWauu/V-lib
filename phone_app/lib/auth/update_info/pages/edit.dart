import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:phone_app/auth/providers/auth_provider.dart';
import 'package:phone_app/buttons/back.dart';
import 'package:phone_app/buttons/btn_with_icon.dart';
import 'package:phone_app/inputs/simple_input.dart';
import 'package:provider/provider.dart';
import 'package:phone_app/config.dart';

class UpdateUserInfoPage extends StatefulWidget {
  final String value;
  final String fieldName;
  final String field;
  final FormFieldValidator<String> validator;

  const UpdateUserInfoPage({
    super.key,
    required this.value,
    required this.fieldName,
    required this.field,
    required this.validator
  });

  @override
  State<UpdateUserInfoPage> createState() => _UpdateUserInfoPageState();
}

class _UpdateUserInfoPageState extends State<UpdateUserInfoPage> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _inputController;

  @override
  void initState() {
    super.initState();
    _inputController = TextEditingController(text: widget.value);
  }

  @override
  void dispose() {
    _inputController.dispose();
    super.dispose();
  }

  void updateValue(BuildContext context, String value) async {
    AuthProvider authProvider = context.read<AuthProvider>();

    final res = await authProvider.callWrapper(
          () async => await http.post(
        Uri.http(apiUrl, "users/update/"),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: {
          "token": authProvider.token?.token,
          "field": widget.field,
          "new_value": value
        },
      ),
    );

    if (res.statusCode == 200) {
      authProvider.storeUser(res.body);
      Navigator.of(context).pop();
    } else {
      Fluttertoast.showToast(
        msg: "Une erreur est survenue. Les données entrées sont incorrectes, ou le serveur ne répond pas.",
        backgroundColor: Colors.redAccent,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CustomBackButton(),
              Spacer(),
              Text(
                "Modifier une\ninformation",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 26,
                ),
              ),
              Spacer(),
              Form(
                key: _formKey,
                child: Column(
                  children: [
                    SimpleInput(
                      icon: Icons.alternate_email,
                      label: widget.fieldName,
                      controller: _inputController,
                      validator: widget.validator,
                      keyboardType: TextInputType.text,
                    ),
                    SizedBox(height: 16),
                    ButtonWithIcon(
                      text: "Mettre à jour",
                      icon: Icons.save,
                      onPressed: () {
                        if (_formKey.currentState!.validate()) {
                          updateValue(context, _inputController.text);
                        }
                      },
                    ),
                  ],
                ),
              ),
              Spacer(flex: 6),
            ],
          ),
        ),
      ),
    );
  }
}

