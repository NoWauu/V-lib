import 'package:flutter/material.dart';
import 'package:phone_app/layouts/main_layout.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.light,
        scaffoldBackgroundColor: Color(0xFFd6d6d6),
        primaryColor: Colors.green,
        primarySwatch: Colors.green
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: Color(0xFF181818),
        canvasColor: Colors.white,
        primarySwatch: Colors.green,
        primaryColor: Colors.green
      ),
      home: const MainLayout(),
    );
  }
}
