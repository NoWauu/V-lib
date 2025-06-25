import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import '../auth/providers/auth_provider.dart';
import '../config.dart';

import '../maps/google_maps.dart';
import '../models/station.dart';

class StationItem {
  final Station station;
  StationItem(this.station);
  LatLng get location => LatLng(station.latitude, station.longitude);
}

Widget rentsPage() {
  return const MapSample();
}

class MapSample extends StatefulWidget {
  const MapSample({super.key});

  @override
  State<MapSample> createState() => RentsPage();
}

class RentsPage extends State<MapSample> {
  final Completer<GoogleMapController> _controller =
      Completer<GoogleMapController>();

  CameraPosition? _currentCameraPosition;
  bool _isLoading = true;
  List<Station> _stations = [];
  Set<Marker> _markers = {};
  String _searchQuery = '';
  Station? _selectedStation;

  @override
  void initState() {
    super.initState();
    _initialize();
  }

  Future<void> _initialize() async {
    try {
      await _fetchStations();
      await _setInitialLocation();
    } catch (e) {
      debugPrint('Initialization error: $e');
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }


  Future<void> _fetchStations() async {
    // Try pagination first (requires Django changes), fall back to full request
    try {
      await _fetchStationsPaginated();
    } catch (e) {
      debugPrint('Pagination failed, trying full request: $e');
      await _fetchStationsFullRequest();
    }
  }

  Future<void> _fetchStationsPaginated() async {
    List<Station> allStations = [];
    int page = 1;
    const pageSize = 100;

    while (true) {
      debugPrint('Fetching page $page...');

      try {
        final response = await http.get(
          Uri.http(apiUrl, 'stations/get-stations/', {
            'page': page.toString(),
            'page_size': pageSize.toString(),
          }),
        ).timeout(const Duration(seconds: 30));

        if (response.statusCode == 200) {
          final decoded = jsonDecode(response.body);
          final List<dynamic> pageData = decoded['stations'] ?? [];

          if (pageData.isEmpty) break; // No more data

          final pageStations = pageData.map((e) => Station.fromJson(e)).toList();
          allStations.addAll(pageStations);

          debugPrint('Page $page: ${pageStations.length} stations (total: ${allStations.length})');

          // Update UI progressively
          setState(() {
            _stations = List.from(allStations);
          });

          if (pageStations.length < pageSize) break; // Last page
          page++;

          await Future.delayed(const Duration(milliseconds: 100));

        } else if (response.statusCode == 404) {
          // Pagination not implemented, throw to fall back
          throw Exception('Pagination not available');
        } else {
          throw Exception('HTTP ${response.statusCode}');
        }
      } catch (e) {
        if (page == 1) rethrow; // If first page fails, try full request
        debugPrint('Page $page failed: $e');
        break; // Use what we have so far
      }
    }

    if (allStations.isNotEmpty) {
      setState(() {
        _stations = allStations;
        _updateMarkers();
      });
      debugPrint('Pagination complete: ${allStations.length} stations loaded');
    } else {
      throw Exception('No stations loaded via pagination');
    }
  }

  Future<void> _fetchStationsFullRequest() async {
    debugPrint('Attempting full request with reduced timeout...');

    try {
      // Single attempt with shorter timeout - if server can't handle it, fail fast
      final response = await http.get(
        Uri.http(apiUrl, 'stations/get-stations/'),
      ).timeout(const Duration(seconds: 45));

      if (response.statusCode == 200) {
        debugPrint("Full response: ${response.body.length} chars");

        if (response.body.length < 50000) {
          throw Exception('Response too short: ${response.body.length} chars');
        }

        final decoded = jsonDecode(response.body);
        final List<dynamic> data = decoded['stations'] ?? [];

        setState(() {
          _stations = data.map((e) => Station.fromJson(e)).toList();
          _updateMarkers();
        });

        debugPrint('Full request success: ${_stations.length} stations');
      } else {
        throw Exception('HTTP ${response.statusCode}');
      }

    } catch (e) {
      debugPrint('Full request failed: $e');

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Server cannot handle large request. Please implement pagination on server.'),
            duration: Duration(seconds: 5),
            action: SnackBarAction(
              label: 'Retry',
              onPressed: _fetchStations,
            ),
          ),
        );
      }
      rethrow;
    }
  }

  Future<void> _setInitialLocation() async {
    try {
      Position position = await _currentPosition();
      setState(() {
        _currentCameraPosition = CameraPosition(
          target: LatLng(position.latitude, position.longitude),
          zoom: 16.0,
        );
      });
    } catch (e) {
      _currentCameraPosition = baseLocation;
    }
  }

  static const CameraPosition baseLocation = CameraPosition(
      bearing: 0.0,
      target: LatLng(48.866667, 2.333333),
      tilt: 0.0,
      zoom: 10.0
  );

  List<Station> get _filteredStations {
    if (_searchQuery.isEmpty) return _stations;
    return _stations.where((s) => s.name.toLowerCase().contains(_searchQuery.toLowerCase())).toList();
  }

  void _updateMarkers() {
    _markers = _filteredStations.map((s) => Marker(
      markerId: MarkerId(s.code.toString()),
      position: LatLng(s.latitude, s.longitude),
      infoWindow: InfoWindow(
        title: s.name,
        snippet: 'Voir les détails',
        onTap: () {
          setState(() {
            _selectedStation = s;
          });
          showModalBottomSheet(
            context: context,
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
            ),
            builder: (context) => _buildStationCard(s),
          );
        },
      ),
    )).toSet();
  }

  Widget _buildStationCard(Station station) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(station.name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                IconButton(
                  icon: Icon(_isFavorite(station) ? Icons.favorite : Icons.favorite_border, color: Colors.red),
                  onPressed: () => _toggleFavorite(station),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text('Vélos disponibles : ${station.capacity}', style: const TextStyle(fontSize: 16)),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: Row(
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.directions),
                      label: const Text('Itinéraire Google Maps'),
                      onPressed: () => openGoogleMaps(station),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.lock),
                      label: const Text('Réserver'),
                      onPressed: () => _reserveStation(station),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }


  Future<void> _reserveStation(Station station) async {
    final token = Provider.of<AuthProvider>(context, listen: false).token?.token;
    final url = Uri.parse('http://$apiUrl/users/add-rent/');
    try {
      final request = http.MultipartRequest('POST', url);
      request.fields['id_station'] = _stations.indexOf(station).toString();
      request.fields['token'] = token.toString();
      final streamedResponse = await request.send();
      final response = await http.Response.fromStream(streamedResponse);
      Navigator.of(context).pop();
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Réservation réussie !')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Votre email n'est pas vérifié. Veuillez vérifier votre email pour réserver un vélo.")),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur réseau : $e')),
      );
    }
  }

  final Set<int> _favoriteStationIds = {};
  bool _isFavorite(Station station) => _favoriteStationIds.contains(station.code);

  void _toggleFavorite(Station station) async {
    final token = Provider.of<AuthProvider>(context, listen: false).token?.token;
    if (token == null) {
      // Utilisation de ScaffoldMessenger sans contextBuilder
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Vous devez être connecté pour gérer les favoris.')),
      );
      return;
    }
    final url = Uri.parse('http://$apiUrl/stations/manage-favorites/');
    try {
      final request = http.MultipartRequest('POST', url);
      request.fields['token'] = token.toString();
      request.fields['station_code'] = station.code.toString();
      final streamedResponse = await request.send();
      final response = await http.Response.fromStream(streamedResponse);
      if (response.statusCode == 200) {
        if (mounted) {
          setState(() {
            if (_isFavorite(station)) {
              _favoriteStationIds.remove(station.code);
            } else {
              _favoriteStationIds.add(station.code);
            }
            // On force la reconstruction de la fiche station affichée
            _selectedStation = _stations.firstWhere((s) => s.code == station.code, orElse: () => station);
            // Fermer et rouvrir la fiche pour forcer l'actualisation de l'icône
            Navigator.of(context).pop();
            Future.delayed(Duration(milliseconds: 100), () {
              showModalBottomSheet(
                context: context,
                shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
                ),
                builder: (context) => _buildStationCard(_selectedStation!),
              );
            });
          });
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erreur lors de la gestion du favori : ${response.body}')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur réseau : ${e.toString()}')),
      );
    }

  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading || _currentCameraPosition == null) {
      return Scaffold(
        body: Center(child: CircularProgressIndicator(color: Colors.green.shade700,)),
      );
    }
    final suggestions = _searchQuery.isEmpty
        ? []
        : _stations.where((s) => s.name.toLowerCase().contains(_searchQuery.toLowerCase())).toList();
    return Scaffold(
      extendBody: true,
      extendBodyBehindAppBar: true,
      body: Stack(
        children: [
          GoogleMap(
            mapType: MapType.normal,
            initialCameraPosition: _currentCameraPosition!,
            markers: _markers,
            onMapCreated: (GoogleMapController controller) {
              _controller.complete(controller);
            },
          ),
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: SafeArea(
              child: Container(
                color: Colors.transparent,
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        color: const Color.fromRGBO(255, 255, 255, 0.7),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: TextField(
                        decoration: const InputDecoration(
                          hintText: 'Rechercher une station...',
                          border: InputBorder.none,
                          prefixIcon: Icon(Icons.search),
                          contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        ),
                        onChanged: (value) {
                          setState(() {
                            _searchQuery = value;
                            _updateMarkers();
                          });
                        },
                      ),
                    ),
                    if (suggestions.isNotEmpty)
                      Flexible(
                        child: ConstrainedBox(
                          constraints: const BoxConstraints(maxHeight: 150),
                          child: Material(
                            color: const Color.fromRGBO(255, 255, 255, 0.9),
                            elevation: 2,
                            borderRadius: BorderRadius.circular(12),
                            child: ListView.builder(
                              shrinkWrap: true,
                              itemCount: suggestions.length,
                              itemBuilder: (context, index) {
                                final station = suggestions[index];
                                return ListTile(
                                  title: Text(station.name),
                                  onTap: () async {
                                    setState(() {
                                      _selectedStation = station;
                                      _searchQuery = station.name;
                                      _updateMarkers();
                                    });
                                    final controller = await _controller.future;
                                    controller.animateCamera(CameraUpdate.newLatLngZoom(
                                      LatLng(station.latitude, station.longitude),
                                      18.0,
                                    ));
                                  },
                                );
                              },
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<Position> _currentPosition() async {
    bool serviceEnabled;
    LocationPermission permission;

    // Test if location services are enabled.
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      // Location services are not enabled, return an error.
      return Future.error('Location services are disabled.');
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      // Permissions are denied, request permissions.
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        // Permissions are denied forever, return the location of Paris
        return Future.error('Location permissions are denied');
      }
    }

    // When we reach here, permissions are granted and we can get the position.
    return await Geolocator.getCurrentPosition();
  }

}