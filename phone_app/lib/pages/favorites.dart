import 'package:flutter/material.dart';
import 'package:phone_app/text/sectionTitle.dart';
import 'package:phone_app/text/textBlock.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../auth/providers/auth_provider.dart';
import 'package:provider/provider.dart';
import '../config.dart';
import 'dart:async';
import 'package:url_launcher/url_launcher.dart';


class FavoritesPage extends StatefulWidget {
  const FavoritesPage({super.key});

  @override
  State<FavoritesPage> createState() => _FavoritesPageState();
}

class _FavoritesPageState extends State<FavoritesPage> {
  List<dynamic> _stations = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchFavorites();
  }

  Future<void> _fetchFavorites() async {
    try {
      final token = Provider.of<AuthProvider>(context, listen: false).token?.token;
      final url = Uri.parse('http://$apiUrl/stations/list-favorites/');
      final request = http.MultipartRequest('POST', url);
      request.fields['token'] = token.toString();
      final streamedResponse = await request.send();
      final response = await http.Response.fromStream(streamedResponse);
      if (response.statusCode == 200) {
        setState(() {
          _stations = json.decode(response.body)["data"];
          
          _isLoading = false;
        });
      } else {
        setState(() {
          _error = 'Erreur lors du chargement : ${response.body}';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = 'Erreur réseau : $e';
        _isLoading = false;
      });
    }
  }

void _openGoogleMaps(Map station) async {
  final url = 'https://www.google.com/maps/dir/?api=1&destination=${station['latitude']},${station['longitude']}&travelmode=walking';
  await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
}

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: LayoutBuilder(
        builder: (context, constraints) {
          if (_isLoading) {
            return Center(child: CircularProgressIndicator());
          }
          if (_error != null) {
            return Center(child: Text(_error!));
          }
          return SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.only(top: 30, left: 16, right: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(height: 16),
                  SectionTitle("Stations favorites"),
                  SizedBox(height: 16),
                  _stations.isEmpty
                      ? TextBlock(
                          text: "Vous n'avez pas encore de stations favorites. Ajoutez-en une pour la retrouver facilement.",
                        )
                      : ListView.builder(
                          shrinkWrap: true,
                          physics: NeverScrollableScrollPhysics(),
                          itemCount: _stations.length,
                          itemBuilder: (context, index) {
                            final station = _stations[index];
                            return Card(
                              child: ListTile(
                                title: Text(station['name'] ?? 'Station'),
                                subtitle: Text('Capacité : ${station['capacity']}'),
                                onTap: () => _openGoogleMaps(station),
                              ),
                            );
                          },
                        ),
                  SizedBox(height: 24),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}