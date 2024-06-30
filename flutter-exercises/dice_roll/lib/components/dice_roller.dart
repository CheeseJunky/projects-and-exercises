import 'package:flutter/material.dart';
import 'dart:math';

import 'package:dice_roll/components/default_text.dart';

class DiceRoller extends StatefulWidget {
  @override
  State<DiceRoller> createState() {
    return _DiceRollerState();
  }
}

class _DiceRollerState extends State<DiceRoller> {
  var activeDice = 'assets/images/dice-images/dice-1.png';
  final randomizer = Random();

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Image.asset(
          activeDice,
          width: MediaQuery.of(context).size.width * 0.6,
        ),
        const SizedBox(
          height: 15,
        ),
        TextButton(
          onPressed: () {
            var res = randomizer.nextInt(6) + 1;
            setState(() {
                  activeDice = 'assets/images/dice-images/dice-$res.png';
            });
          },
          style: TextButton.styleFrom(
            textStyle: const TextStyle(
              fontSize: 24,
            ),
            shadowColor: const Color.fromARGB(100, 143, 39, 202),
            elevation: 1,
          ),
          child: const DefaultText("Roll the dice"),
        )
      ],
    );
  }
}
