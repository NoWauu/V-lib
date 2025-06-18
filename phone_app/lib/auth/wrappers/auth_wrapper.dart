import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:phone_app/pages/auth.dart';
import 'package:phone_app/layouts/main_layout.dart';
import 'package:phone_app/auth/providers/auth_provider.dart';

class AuthWrapper extends StatelessWidget {
  const AuthWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    return auth.isAuthenticated
        ? MainLayout()
        : AuthPage();
  }
}
