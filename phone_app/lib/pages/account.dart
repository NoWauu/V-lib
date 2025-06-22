import 'package:flutter/material.dart';
import 'package:phone_app/buttons/btn_tabs_account.dart';
import 'package:phone_app/buttons/disconnect.dart';
import 'package:phone_app/pages/about.dart';
import 'package:phone_app/pages/account_info.dart';
import 'package:phone_app/pages/history.dart';
import 'package:phone_app/pages/legal_page.dart';
import 'package:phone_app/pages/privacy_policy.dart';
import 'package:provider/provider.dart';
import 'package:phone_app/auth/providers/auth_provider.dart';

class AccountPage extends StatelessWidget {
  const AccountPage({super.key});

  void _goTo(BuildContext context, Widget page) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => page));
  }

  @override
  Widget build(BuildContext context) {
    final _user = context.watch<AuthProvider>().user;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(26.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(Icons.account_circle_outlined, size: 30),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      "${_user!.firstName} ${_user.lastName}",
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontSize: 28,
                        letterSpacing: 1.5,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),

              Spacer(),

              Text(
                "Modifiez vos informations à partir de cette page. Vous pouvez également accéder à des pages comme la politique de confidentialité, ou les mentions légales.",
                textAlign: TextAlign.justify,
                style: TextStyle(color: isDark ? Colors.grey.shade400 : Colors.grey.shade600),
              ),

              Spacer(),

              ButtonTabs(
                text: "Informations",
                icon: Icons.person,
                onPressed: () => _goTo(context, AccountInfoPage()),
              ),
              SizedBox(height: 24),
              ButtonTabs(
                text: "Historique",
                icon: Icons.history,
                onPressed: () => _goTo(context, HistoryPage()),
              ),
              SizedBox(height: 24),
              ButtonTabs(
                text: "Confidentialité",
                icon: Icons.policy_rounded,
                onPressed: () => _goTo(context, PrivacyPage()),
              ),
              SizedBox(height: 24),
              ButtonTabs(
                text: "Mentions légales",
                icon: Icons.gavel,
                onPressed: () => _goTo(context, LegalPage()),
              ),
              SizedBox(height: 24),
              ButtonTabs(
                text: "À propos",
                icon: Icons.info_outline,
                onPressed: () => _goTo(context, AboutPage()),
              ),
              SizedBox(height: 24),
              ButtonDisconnect(
                text: "Se déconnecter",
                icon: Icons.logout_rounded,
              ),

              Spacer(),
            ],
          ),
        ),
      ),
    );
  }
}
