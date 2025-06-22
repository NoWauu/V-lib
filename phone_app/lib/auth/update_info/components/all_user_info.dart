import 'package:flutter/material.dart';
import 'package:phone_app/auth/update_info/components/display_single_info.dart';
import 'package:phone_app/auth/update_info/pages/edit.dart';
import 'package:provider/provider.dart';
import 'package:phone_app/auth/providers/auth_provider.dart';
import 'package:phone_app/forms/validation/auth_validations.dart';

class DisplayAllUserInfo extends StatelessWidget {
  const DisplayAllUserInfo({super.key});

  void _goTo(BuildContext context, String value, String fieldName, String field, FormFieldValidator<String> validator) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => UpdateUserInfoPage(
          value: value,
          fieldName: fieldName,
          field: field,
          validator: validator,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final _user = context.watch<AuthProvider>().user;

    List<Map<String, dynamic>> userDataStructure = [
      {
        "fieldName": "Nom",
        "field": "last_name",
        "value": _user!.lastName,
        "validator": checkName
      },
      {
        "fieldName": "Prénom",
        "field": "first_name",
        "value": _user.firstName,
        "validator": checkName
      },
      {
        "fieldName": "Adresse mail",
        "field": "email",
        "value": _user.email,
        "validator": checkEmail
      },
      {
        "fieldName": "Numéro de téléphone",
        "field": "phone_number",
        "value": _user.phoneNumber,
        "validator": checkPhoneNumber
      },
    ];

    return ListView.separated(
      shrinkWrap: true,
      physics: NeverScrollableScrollPhysics(),
      itemCount: userDataStructure.length,
      itemBuilder: (context, index) {
        final data = userDataStructure[index];
        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0),
          child: UserInfo(
            fieldName: data['fieldName']!,
            field: data['field']!,
            value: data['value']!,
            pressed: () => _goTo(context, data['value']!, data['fieldName']!, data['field']!, data['validator']!),
          ),
        );
      },
      separatorBuilder: (context, index) => const Divider(),
    );
  }
}
