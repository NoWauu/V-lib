import 'package:flutter/material.dart';
import '../atoms/expired_badge.dart';
import '../molecules/reservation_dates.dart';

class ReservationCard extends StatelessWidget {
  final String stationName;
  final DateTime start;
  final DateTime end;
  final bool isExpired;
  final VoidCallback? onTap;

  const ReservationCard({
    super.key,
    required this.stationName,
    required this.start,
    required this.end,
    required this.isExpired,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Text(
                stationName,
                style: isExpired ? const TextStyle(color: Colors.red) : null,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            if (isExpired)
              const Padding(
                padding: EdgeInsets.only(left: 8.0),
                child: ExpiredBadge(),
              ),
          ],
        ),
        subtitle: ReservationDates(
          start: start,
          end: end,
          color: isExpired ? Colors.red : null,
        ),
        onTap: onTap,
      ),
    );
  }
}

