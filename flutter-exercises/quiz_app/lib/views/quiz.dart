import 'package:flutter/material.dart';
import 'package:quiz_app/views/questions_screen.dart';
import 'package:quiz_app/views/results_screen.dart';

import 'package:quiz_app/views/start_screen.dart';

class Quiz extends StatefulWidget {
  const Quiz({super.key});

  @override
  State<Quiz> createState() {
    return _QuizState();
  }
}

class _QuizState extends State<Quiz> {
  final List<String> _selectedAnswers = [];

  // Widget? activeScreen;
  var activeScreen = 'start-screen';

  // @override
  // void initState() {
  //   // activeScreen = StartScreen(switchScreen);
  //   super.initState();
  // }

  void switchScreen(String view) {
    setState(() {
      // activeScreen = const QuestionsScreen();
      activeScreen = view;
    });
  }

  void answerChosen(String answer) {
    _selectedAnswers.add(answer);
  }

  void restartQuiz() {
    _selectedAnswers.clear();
    switchScreen('start-screen');
  }

  @override
  Widget build(BuildContext context) {
    Widget screenWidget = StartScreen(() {
      switchScreen('questions-screen');
    });

    if (activeScreen == 'questions-screen') {
      screenWidget = QuestionsScreen(
        onAnswerSelected: answerChosen,
        onQuizFinished: () {
          switchScreen('result-screen');
        },
      );
    } else if (activeScreen == 'result-screen') {
      screenWidget = ResultsScreen(
        chosenAnswers: _selectedAnswers,
        onRestartQuiz: restartQuiz,
      );
    }

    return MaterialApp(
      home: Scaffold(
        body: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Color.fromARGB(249, 87, 87, 182),
                Color.fromARGB(238, 103, 28, 165),
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          // child: activeScreen,
          child: screenWidget,
        ),
      ),
    );
  }
}
