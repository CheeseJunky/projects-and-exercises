import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:meals_app/screens/categories_screen.dart';
import 'package:meals_app/screens/filter_screen.dart';
import 'package:meals_app/screens/meals_screen.dart';
import 'package:meals_app/widgets/main_drawer.dart';
import 'package:meals_app/providers/favourites_provider.dart';
import 'package:meals_app/providers/filters_provider.dart';

// const Map<Filter, bool> kInitialFilters = {
//   Filter.enGluterFree: false,
//   Filter.enLactoseFree: false,
//   Filter.enVegetarian: false,
//   Filter.enVegan: false,
// };

class TabsScreen extends ConsumerStatefulWidget {
  const TabsScreen({super.key});

  @override
  ConsumerState<TabsScreen> createState() {
    return _TabsScreenState();
  }
}

class _TabsScreenState extends ConsumerState<TabsScreen> {
  int _selectedPageIndex = 0;
  // final List<Meal> _favouriteMeals = [];
  // Map<Filter, bool> _selectedFilter = kInitialFilters;

  // void _showInfoMessage(String message) {
  //   ScaffoldMessenger.of(context).clearSnackBars();
  //   ScaffoldMessenger.of(context).showSnackBar(
  //     SnackBar(
  //       content: Text(message),
  //     ),
  //   );
  // }

  /*void _handleMealFavouriteStatus(Meal meal) {
    final isFavourite = _favouriteMeals.contains(meal);

    if (isFavourite) {
      setState(() {
        _favouriteMeals.remove(meal);
        meal.isFavourite = false;
      });
      _showInfoMessage('${meal.title} removed from favourites');
    } else {
      setState(() {
        meal.isFavourite = true;
        _favouriteMeals.add(meal);
      });
      _showInfoMessage('${meal.title} added to favourites');
    }
  }*/

  void _selectPage(int index) {
    setState(() {
      _selectedPageIndex = index;
    });
  }

  void _setScreen(String identifier) async {
    Navigator.of(context).pop();
    if (identifier == 'filter') {
      // final result =
      await Navigator.of(context).push<Map<Filter, bool>>(MaterialPageRoute(
        builder: (ctx) =>
            const FilterScreen(/*initialFilters: _selectedFilter,*/),
      ));

      // setState(() {
      //   // ?? checks if null -> if !null ?? else
      //   _selectedFilter = result ?? kInitialFilters;
      // });
    }
  }

  @override
  Widget build(BuildContext context) {
    // final meals = ref.watch(mealsProvider); // watch rebuilds if data changes
    // final activeFilters = ref.watch(filtersProvider);
    // final availableMeals = meals.where((meal) {
    //   if (activeFilters[Filter.enGluterFree]! && !meal.isGlutenFree) {
    //     return false;
    //   }
    //   if (activeFilters[Filter.enLactoseFree]! && !meal.isLactoseFree) {
    //     return false;
    //   }
    //   if (activeFilters[Filter.enVegetarian]! && !meal.isVegetarian) {
    //     return false;
    //   }
    //   if (activeFilters[Filter.enVegan]! && !meal.isVegan) {
    //     return false;
    //   }
    //   return true;
    // }).toList();

    final availableMeals = ref.watch(filteredMealsProvider);
    Widget activePage = CategoriesScreen(
      // onToggleFavourite: _handleMealFavouriteStatus,
      availableMeals: availableMeals,
    );
    String activePageTitle = 'Categories';

    if (_selectedPageIndex == 1) {
      final favouriteMeals = ref.watch(favouriteMealsProvider);
      activePage = MealsScreen(
        meals: favouriteMeals,
        // onToggleFavourite: _handleMealFavouriteStatus,
      );
      activePageTitle = 'Favourites';
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(activePageTitle),
      ),
      body: activePage,
      bottomNavigationBar: BottomNavigationBar(
        onTap: _selectPage,
        currentIndex: _selectedPageIndex,
        items: [
          BottomNavigationBarItem(
            icon: Icon(_selectedPageIndex == 0
                ? Icons.category
                : Icons.category_outlined),
            label: 'Categories',
          ),
          BottomNavigationBarItem(
            icon: Icon(_selectedPageIndex == 1
                ? Icons.favorite
                : Icons.favorite_outline),
            label: 'Favourites',
          ),
        ],
      ),
      drawer: MainDrawer(onSelectScreen: _setScreen),
    );
  }
}
