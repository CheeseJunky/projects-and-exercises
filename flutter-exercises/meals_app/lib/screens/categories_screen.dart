import 'package:flutter/material.dart';
import 'package:meals_app/data/dummy_data.dart';
import 'package:meals_app/screens/meals_screen.dart';
import 'package:meals_app/widgets/category_grid_idem.dart';
import 'package:meals_app/models/category.dart';
import 'package:meals_app/models/meal.dart';

class CategoriesScreen extends StatelessWidget {
  const CategoriesScreen({
    super.key, 
    // required this.onToggleFavourite, 
    required this.availableMeals
    });

  // final void Function(Meal meal) onToggleFavourite;
  final List<Meal> availableMeals;

  void _selectCategory(BuildContext context, Category cat) {
    final filteredMeals =
        availableMeals.where((meal) => meal.categories.contains(cat.id)).toList();

    // Navigator.push(context, route)
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (ctx) => MealsScreen(
          title: cat.title,
          meals: filteredMeals,
          // onToggleFavourite: onToggleFavourite,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return GridView(
        padding: const EdgeInsets.all(20),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 3 / 2,
          crossAxisSpacing: 20,
          mainAxisSpacing: 20,
        ),
        children: availableCategories
            .map(
              (category) => CategoryGridItem(
                catg: category,
                onSelectCategory: () {
                  _selectCategory(context, category);
                },
              ),
            )
            .toList()
        // for (final category in availableCategories)
        //   CategoryGridItem(catg: category),
        );
  }
}
