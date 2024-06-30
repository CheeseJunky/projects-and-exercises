import 'package:dice_roll/components/dice_roller.dart';
import 'package:flutter/material.dart';

const Alignment startAlignment = Alignment.topCenter;
const Alignment endAlignment = Alignment.bottomCenter;

class GradientContainer extends StatelessWidget {
  const GradientContainer({
    super.key,
    required this.startColor,
    required this.endColor,
  });

  const GradientContainer.purple({super.key})
      : startColor = const Color.fromARGB(255, 7, 155, 224),
        endColor = const Color.fromARGB(255, 143, 39, 202);

  final Color startColor;
  final Color endColor;

  @override
  Widget build(context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            startColor,
            endColor,
          ],
          begin: startAlignment,
          end: endAlignment,
        ),
      ),
      child: Center(
        child: DiceRoller(),
      ),
    );
  }
}
