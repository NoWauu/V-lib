import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:fluttertoast/fluttertoast.dart';
import 'package:phone_app/auth/classes/login_credentials.dart';
import 'package:phone_app/auth/classes/register_credentials.dart';
import 'package:phone_app/auth/classes/token_data.dart';
import 'package:phone_app/auth/classes/user.dart';

import 'package:phone_app/config.dart';

class AuthProvider with ChangeNotifier {
  TokenData? _token;
  User? _user; // user data : name, etc

  /*
    Getters
   */

  bool get isAuthenticated => _token != null;

  TokenData? get token => _token;
  User? get user => _user;

  /*
    Auth-related functions
   */

  /// Wrapper to logout the user if the API
  /// sends that the token has expired
  Future<http.Response> callWrapper(
      Future<http.Response> Function() apiCall
  ) async {
    if (double.parse(_token!.expirationTimestamp) < DateTime.now().millisecondsSinceEpoch) {
      logout();
    }

    // Perform the request
    final res = await apiCall();

    dynamic data;

    try {
      data = json.decode(res.body);
    } on Exception {
      // pass
    }

    if (data is Map && data["message"] is String) {
      if ((data["message"] as String).toLowerCase().contains("token")) {
        logout();
      }
    }

    return res;
  }

  /// Store the user and the auth token
  /// to use it throughout all the application
  Future<void> _storeUserAndToken(String resBody) async {
    final resData = jsonDecode(resBody);

    _token = TokenData(
        token: resData["data"]["token_data"]["token"],
        expirationTimestamp: resData["data"]["token_data"]["expiration_date"]
    );

    _user = User(
        email: resData["data"]["email"],
        firstName: resData["data"]["first_name"],
        lastName: resData["data"]["first_name"],
        phoneNumber: resData['data']["phone_number"],
        isEmailVerified: resData["data"]["is_email_verified"]
    );

    notifyListeners();
  }

  /// Call the API to register a new user
  /// and store the user information sent back
  /// if everything went successfully
  Future<bool> register(RegisterCredentials rc) async {
    final res = await http.post(
      Uri.http(apiUrl, "users/register/"),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
      body: {
        "email": rc.email,
        "password": rc.password,
        "first_name": rc.firstName,
        "last_name": rc.lastName,
        "phone_number": rc.phoneNumber
      }
    );

    switch (res.statusCode) {
      case 201:
        _storeUserAndToken(res.body);

        Fluttertoast.showToast(
          msg: "Bienvenue sur l'application !",
          backgroundColor: Colors.green.shade700,
          textColor: Colors.white
        );

        return true;
      case 400:
        final resData = jsonDecode(res.body);

        if (resData.message.contains("too long")) {
          Fluttertoast.showToast(
              msg: "Le mot de passe est trop long.",
              backgroundColor: Colors.redAccent
          );
        } else if (resData.message.contains("Invalid data")) {
          Fluttertoast.showToast(
              msg: "Au moins un champ est invalide.",
              backgroundColor: Colors.redAccent
          );
        } else {
          Fluttertoast.showToast(
              msg: "Au moins un champ est vide.",
              backgroundColor: Colors.redAccent
          );
        }

        break;
      case 409:
        Fluttertoast.showToast(
            msg: "Cet email est déjà relié à un compte.",
            backgroundColor: Colors.redAccent
        );
        break;
      case 500:
        Fluttertoast.showToast(
            msg: "Une erreur inconnue est survenue. Merci de réessayer.",
            backgroundColor: Colors.redAccent
        );
        break;
    }

    return false;
  }

  /// Call the API to login and store the user
  /// data if successful
  Future<bool> login(LoginCredentials lc) async {
    // API call
    final res = await http.post(
      Uri.http(apiUrl, "users/login/"),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
      body: {
        "email": lc.email,
        "password": lc.password
      }
    );

    // Analyze response
    switch (res.statusCode) {
      case 200:
        _storeUserAndToken(res.body);
        return true;
      case 400:
        Fluttertoast.showToast(
          msg: "Au moins un champ est vide.",
            backgroundColor: Colors.redAccent
        );
        break;
      case 404:
        Fluttertoast.showToast(
          msg: "Identifiants invalides.",
          backgroundColor: Colors.redAccent
        );
        break;
      case 500:
        Fluttertoast.showToast(
          msg: "Une erreur inconnue est survenue. Merci de réessayer.",
          backgroundColor: Colors.redAccent
        );
        break;
    }

    return false;
  }

  void logout() {
    _token = null;
    _user = null;
    notifyListeners();
  }
}
