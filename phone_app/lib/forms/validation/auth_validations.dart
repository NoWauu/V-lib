import 'package:flutter/cupertino.dart';

final emailRegex = RegExp(r"^(?!.*\.\.)[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9.-]+\.[a-z]{2,}$");
final passwordRegex = RegExp(r"^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:<>?~`[\]\\;'\/.,]).{8,}$");
final phoneRegex = RegExp(r"^[0-9]{10}$");

final minPasswordLength = 8;

FormFieldValidator<String> checkName = (value) {
  if (value == null || value.isEmpty) {
    return "Champ vide.";
  }

  return null;
};

FormFieldValidator<String> checkEmail = (value) {
  if (value == null || value.isEmpty) {
    return "Champ vide.";
  } else if (!emailRegex.hasMatch(value)) {
    return "Format invalide.";
  }

  return null;
};

FormFieldValidator<String> checkPassword = (value) {
  if (value == null || value.isEmpty) {
    return "Champ vide.";
  } else if (value.length < minPasswordLength) {
    return "Mot de passe inférieur à 8 charactères.";
  } else if (!passwordRegex.hasMatch(value)) {
    return "Il doit y avoir au minimum une majuscule, un chiffre et un caractère spécial.";
  }

  return null;
};

FormFieldValidator<String> checkPhoneNumber = (value) {
  if (value == null || value.isEmpty) {
    return "Champ vide.";
  } else if (!phoneRegex.hasMatch(value)) {
    return "Numéro de téléphone invalide. Celui-ci doit être consitué de 10 chiffres sans espace.";
  }

  return null;
};
