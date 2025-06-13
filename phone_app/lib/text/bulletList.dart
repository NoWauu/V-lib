import 'package:flutter/material.dart';

// ATOM: Liste à puces
class BulletList extends StatelessWidget {
  final List<String> items;
  BulletList(this.items);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: items
            .map((item) => Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("• ", style: TextStyle(fontSize: 15)),
                      Expanded(child: Text(item, style: TextStyle(fontSize: 15))),
                    ],
                  ),
                ))
            .toList(),
      ),
    );
  }
}