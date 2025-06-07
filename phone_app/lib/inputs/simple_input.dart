import 'package:flutter/material.dart';

class SimpleInput extends StatefulWidget {
  final IconData icon;
  final String label;
  final TextEditingController controller;
  final TextInputType keyboardType;
  final TextCapitalization textCapitalization;
  final FormFieldValidator<String>? validator;

  const SimpleInput({
    super.key,
    required this.icon,
    required this.label,
    required this.controller,
    required this.keyboardType,
    this.textCapitalization = TextCapitalization.none,
    this.validator,
  });

  @override
  State<SimpleInput> createState() => _SimpleInputState();
}

class _SimpleInputState extends State<SimpleInput> {
  late FocusNode focusNode;

  @override
  void initState() {
    super.initState();
    focusNode = FocusNode();
  }

  @override
  void dispose() {
    focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      textCapitalization: widget.textCapitalization,
      keyboardType: widget.keyboardType,
      controller: widget.controller,
      validator: widget.validator,
      focusNode: focusNode,
      cursorColor: Colors.green.shade800,
      decoration: InputDecoration(
        helperText: '',
        helperMaxLines: 2,
        errorStyle: TextStyle(color: Colors.redAccent),
        errorMaxLines: 2,
        prefixIcon: Icon(widget.icon),
        labelText: widget.label,
        labelStyle: TextStyle(
          color: Theme.of(context).brightness == Brightness.dark
              ? Colors.white
              : null,
        ),
        enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Colors.grey.shade600, width: 2),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Colors.green.shade800, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Colors.red, width: 2),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Colors.redAccent, width: 2),
        ),
      ),
    );
  }
}
