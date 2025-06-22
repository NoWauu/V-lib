import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class ReservationDates extends StatelessWidget {
  final DateTime start;
  final DateTime end;
  final Color? color;
  const ReservationDates({
    super.key,
    required this.start,
    required this.end,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    final formatter = DateFormat('dd/MM/yyyy HH:mm');
    return Text(
      'Début : ${formatter.format(start)}\nFin : ${formatter.format(end)}',
      style: color != null ? TextStyle(color: color) : null,
    );
  }
}

