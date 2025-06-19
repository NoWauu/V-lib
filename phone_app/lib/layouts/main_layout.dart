import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:phone_app/pages/account.dart';
import 'package:phone_app/pages/favorites.dart';
import 'package:phone_app/pages/home.dart';
import 'package:phone_app/pages/rents.dart';

class MainLayout extends StatefulWidget {
  const MainLayout({super.key});

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  int _selectedIndex = 0;

  Widget _getPage(int index) {
    switch (index) {
      case 0: return HomePage();
      case 1: return rentsPage();
      case 2: return FavoritesPage();
      case 3: return AccountPage();
      default: return HomePage();
    }
  }

  void _onTabTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  final List<GButton> _tabs = const [
    GButton(icon: Icons.home, text: 'Accueil'),
    GButton(icon: Icons.directions_bike, text: 'Réserver'),
    GButton(icon: Icons.favorite, text: 'Favoris'),
    GButton(icon: Icons.person, text: 'Compte'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _getPage(_selectedIndex),
      bottomNavigationBar: Container(
        color: Theme.of(context).scaffoldBackgroundColor,
        padding: const EdgeInsets.only(left: 24, right:24, bottom: 18, top: 6), // Exterior margins
        child: Container(
          decoration: BoxDecoration(
            color: Colors.black,
            borderRadius: BorderRadius.circular(50),
          ),
          padding: const EdgeInsets.all(10), // Interior
          child: GNav(
            color: Colors.green,
            activeColor: Colors.green,
            tabBackgroundColor: Colors.green.withValues(alpha: 0.25),
            padding: const EdgeInsets.all(16),
            gap: 12,
            selectedIndex: _selectedIndex,
            onTabChange: _onTabTapped,
            tabs: _tabs,
          ),
        ),
      ),
    );
  }
}
