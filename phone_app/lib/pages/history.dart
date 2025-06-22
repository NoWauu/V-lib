import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../auth/providers/auth_provider.dart';
import '../config.dart';
import '../text/sectionTitle.dart';
import '../text/textBlock.dart';
import '../organisms/reservation_card.dart';
import '../atoms/history_api.dart';
import '../buttons/back.dart';

class HistoryPage extends StatefulWidget {
  @override
  State<HistoryPage> createState() => _HistoryPageState();
}

class _HistoryPageState extends State<HistoryPage> {
  List<dynamic> _stations = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchHistory();
  }

  Future<void> _fetchHistory() async {
    final token = Provider.of<AuthProvider>(context, listen: false).token?.token;
    try {
      final data = await fetchUserHistory(token.toString(), apiUrl);
      setState(() {
        _stations = data;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = 'Erreur lors du chargement : $e';
        _isLoading = false;
      });
    }
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
                  Padding(
                    padding: const EdgeInsets.only(left: 12),
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: CustomBackButton(),
                    ),
                  ),
                  SizedBox(height: 16),
                  SectionTitle("Historique des réservations"),
                  SizedBox(height: 16),
                  _stations.isEmpty
                      ? TextBlock(
                          text: "Vous n'avez pas encore réservé de vélib dans une station. Reservez-en pour les retrouver facilement.",
                        )
                      : ListView.builder(
                          shrinkWrap: true,
                          physics: NeverScrollableScrollPhysics(),
                          itemCount: _stations.length,
                          itemBuilder: (context, index) {
                            final station = _stations[index];
                            final DateTime start = DateTime.parse(station['start_time']);
                            final DateTime end = DateTime.parse(station['end_time']);
                            final bool isExpired = end.isBefore(DateTime.now());
                            return ReservationCard(
                              stationName: station['station_name'] ?? 'Station',
                              start: start,
                              end: end,
                              isExpired: isExpired,
                              onTap: null,
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