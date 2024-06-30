import 'package:flutter/material.dart';

import 'package:expense_tracker/expenses.dart';
import 'package:flutter/services.dart';

var kColorScheme =
    ColorScheme.fromSeed(seedColor: const Color.fromARGB(238, 103, 28, 165));
var kDarkColorScheme = ColorScheme.fromSeed(
    brightness: Brightness.dark, seedColor: Colors.black54);

void main() {
  // WidgetsFlutterBinding.ensureInitialized();  // lock device orientation
  // SystemChrome.setPreferredOrientations([
  //   DeviceOrientation.portraitUp,
  // ]).then((fn) {
    runApp(
      MaterialApp(
        darkTheme: ThemeData.dark().copyWith(
          colorScheme: kDarkColorScheme,
          appBarTheme: const AppBarTheme().copyWith(
            backgroundColor: const Color.fromARGB(255, 37, 37, 37),
          ),
          cardTheme: const CardTheme().copyWith(
              color: const Color.fromARGB(255, 37, 37, 37),
              margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 20)),
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              backgroundColor: kDarkColorScheme.primaryContainer,
              foregroundColor: kDarkColorScheme.onPrimaryContainer,
            ),
          ),
          textTheme: ThemeData()
              .textTheme
              .copyWith(
                titleLarge: TextStyle(
                  fontWeight: FontWeight.w600,
                  color: kDarkColorScheme.onSecondaryContainer,
                  fontSize: 16,
                ),
              )
              .apply(
                bodyColor: const Color.fromARGB(255, 255, 244, 244),
              ),
          bottomSheetTheme: const BottomSheetThemeData().copyWith(
            backgroundColor: const Color.fromARGB(255, 37, 37, 37),
          ),
        ),

        theme: ThemeData().copyWith(
          colorScheme: kColorScheme,
          appBarTheme: const AppBarTheme().copyWith(
              backgroundColor: kColorScheme.primary,
              foregroundColor: kColorScheme.primaryContainer),
          cardTheme: const CardTheme().copyWith(
              color: kColorScheme.secondaryContainer,
              margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 20)),
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              backgroundColor: kColorScheme.primaryContainer,
            ),
          ),
          textTheme: ThemeData().textTheme.copyWith(
                titleLarge: TextStyle(
                  fontWeight: FontWeight.w600,
                  color: kColorScheme.onSecondaryContainer,
                  fontSize: 16,
                ),
              ),
        ),
        themeMode: ThemeMode.dark, // default
        home: const Expenses(),
      ),
    );
  // });
}
