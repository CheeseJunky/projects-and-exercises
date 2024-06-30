import 'package:flutter/material.dart';

class DefaultText extends StatelessWidget {
 const DefaultText(this.text, {super.key});

  final String text;

  @override
  Widget build(context) {
    return Text(
      text,
      style: const TextStyle(
        color: Colors.white,
        fontSize: 18,
      ),
    );
  }
}
