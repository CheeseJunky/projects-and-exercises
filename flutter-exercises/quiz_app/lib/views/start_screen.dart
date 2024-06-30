import 'package:flutter/material.dart';

class StartScreen extends StatelessWidget {
  const StartScreen(this.startQuiz, {super.key});

  final void Function() startQuiz;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Opacity( //processor heavy
          //   opacity: 0.6,
          //   child: Image.asset(
          //     'assets/images/quiz-logo.png',
          //     width: MediaQuery.of(context).size.width * 0.65,
          //   ),
          // ),
          Image.asset(
            'assets/images/quiz-logo.png',
            width: MediaQuery.of(context).size.width * 0.65,
            color: const Color.fromARGB(150, 255, 255, 255),  //set "opacity" on the image
          ),
          const SizedBox(height: 50),
          const Center(
            child: Text(
              "Learn flutter the fun way!",
              style: TextStyle(
                color: Color.fromARGB(255, 253, 231, 231),
                fontSize: 22,
              ),
            ),
          ),
          const SizedBox(height: 20),
          OutlinedButton.icon(
            onPressed: () {
              startQuiz();
            },
            style: OutlinedButton.styleFrom(foregroundColor: Colors.white),
            icon: const Icon(Icons.arrow_right_alt),
            label: const Text("Start Quiz"),
          )
        ],
      ),
    );
  }
}
