import 'package:flutter/material.dart';

class UserInfo extends StatelessWidget {
  final String fieldName;
  final String field;
  final String value;
  final VoidCallback pressed;

  const UserInfo({
    super.key,
    required this.fieldName,
    required this.field,
    required this.value,
    required this.pressed
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: pressed,
      behavior: HitTestBehavior.opaque,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(fieldName,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600
              ),),
              SizedBox(height: 6,),
              Text(value, style: TextStyle(
                fontSize: 16,
                color: Colors.grey.shade400
              ),)
            ],
          ),
          Icon(Icons.arrow_forward_ios_rounded)
        ],
      ),
    );
  }
}
