import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:meals_app/providers/meals_provider.dart';

enum Filter {
  enGluterFree,
  enLactoseFree,
  enVegetarian,
  enVegan,
}

class FiltersNorifier extends StateNotifier<Map<Filter, bool>> {
  FiltersNorifier() : super({
    Filter.enGluterFree: false,
    Filter.enLactoseFree: false,
    Filter.enVegetarian: false,
    Filter.enVegan: false
  });

  void setFilter(Filter filter, bool isActive) {
    // copy old filter and set/overwrite the one that changed
    state = {
      ...state,
      filter: isActive,
    };
  }

  void setFilters(Map<Filter, bool> chosenFilters) {
    state = chosenFilters;
  }
}

final filtersProvider = StateNotifierProvider<FiltersNorifier, Map<Filter, bool>>(
  (ref) => FiltersNorifier(),
);



final filteredMealsProvider = Provider((ref) {
  final meals = ref.watch(mealsProvider);
  final activeFilters = ref.watch(filtersProvider);

      return meals.where((meal) {
      if (activeFilters[Filter.enGluterFree]! && !meal.isGlutenFree) {
        return false;
      }
      if (activeFilters[Filter.enLactoseFree]! && !meal.isLactoseFree) {
        return false;
      }
      if (activeFilters[Filter.enVegetarian]! && !meal.isVegetarian) {
        return false;
      }
      if (activeFilters[Filter.enVegan]! && !meal.isVegan) {
        return false;
      }
      return true;
    }).toList();
});