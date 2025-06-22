import 'package:flutter/material.dart';
import 'package:phone_app/auth/providers/auth_provider.dart';
import 'package:phone_app/auth/wrappers/auth_wrapper.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

Future<void> main() async {
  try {
    await dotenv.load(fileName: ".env").timeout(const Duration(seconds: 5));
  } catch (e) {
    debugPrint('Erreur lors du chargement du .env : '
        '${e.toString()}');
  }
  runApp(App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => AuthProvider(),
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          brightness: Brightness.light,
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
        home: AuthWrapper(),
      ),
    );
  }
}
