import 'package:flutter/material.dart';

import 'package:dice_roll/components/gradient_container.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Dice Roller'),
          bottomOpacity: 50,
        ),
        body: const GradientContainer(
          startColor:  Color.fromARGB(255, 7, 155, 224),
          endColor:  Color.fromARGB(255, 143, 39, 202),
        ),
      ),
    ),
  );
}
