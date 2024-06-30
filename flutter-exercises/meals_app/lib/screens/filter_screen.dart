import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:meals_app/providers/filters_provider.dart';

class FilterScreen extends ConsumerWidget {
  const FilterScreen({
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activeFilters = ref.watch(filtersProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Filters'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(10),
        child: Column(
          children: [
            SwitchListTile(
              value: activeFilters[Filter.enGluterFree]!,
              onChanged: (checked) {
                ref
                    .read(filtersProvider.notifier)
                    .setFilter(Filter.enGluterFree, checked);
              },
              title: Text(
                'Gluten-free',
                style: Theme.of(context).textTheme.titleMedium!.copyWith(
                      color: Theme.of(context).colorScheme.onBackground,
                    ),
              ),
              subtitle: Text(
                'Only include gluten-free meals.',
                style: Theme.of(context).textTheme.labelSmall!.copyWith(
                      color: Theme.of(context).colorScheme.onBackground,
                    ),
              ),
              activeColor: Theme.of(context).colorScheme.primary.withAlpha(40),
              contentPadding:
                  const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            ),
            SwitchListTile(
              value: activeFilters[Filter.enLactoseFree]!,
              onChanged: (checked) {
                ref
                    .read(filtersProvider.notifier)
                    .setFilter(Filter.enLactoseFree, checked);
              },
              title: Text(
                'Lactose-free',
                style: Theme.of(context).textTheme.titleMedium!.copyWith(
                      color: Theme.of(context).colorScheme.onBackground,
                    ),
              ),
              subtitle: Text(
                'Only include lactose-free meals.',
                style: Theme.of(context).textTheme.labelSmall!.copyWith(
                      color: Theme.of(context).colorScheme.onBackground,
                    ),
              ),
              activeColor: Theme.of(context).colorScheme.primary.withAlpha(40),
              contentPadding:
                  const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            ),
            SwitchListTile(
              value: activeFilters[Filter.enVegetarian]!,
              onChanged: (checked) {
                ref
                    .read(filtersProvider.notifier)
                    .setFilter(Filter.enVegetarian, checked);
              },
              title: Text(
                'Vegetarian',
                style: Theme.of(context).textTheme.titleMedium!.copyWith(
                      color: Theme.of(context).colorScheme.onBackground,
                    ),
              ),
              subtitle: Text(
                'Only include vegetarian meals.',
                style: Theme.of(context).textTheme.labelSmall!.copyWith(
                      color: Theme.of(context).colorScheme.onBackground,
                    ),
              ),
              activeColor: Theme.of(context).colorScheme.primary.withAlpha(40),
              contentPadding:
                  const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            ),
            SwitchListTile(
              value: activeFilters[Filter.enVegan]!,
              onChanged: (checked) {
                ref
                    .read(filtersProvider.notifier)
                    .setFilter(Filter.enVegan, checked);
              },
              title: Text(
                'Vegan',
                style: Theme.of(context).textTheme.titleMedium!.copyWith(
                      color: Theme.of(context).colorScheme.onBackground,
                    ),
              ),
              subtitle: Text(
                'Only include vegan meals.',
                style: Theme.of(context).textTheme.labelSmall!.copyWith(
                      color: Theme.of(context).colorScheme.onBackground,
                    ),
              ),
              activeColor: Theme.of(context).colorScheme.primary.withAlpha(40),
              contentPadding:
                  const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            ),
          ],
        ),
      ),
    );
  }
}




/*class FilterScreen extends ConsumerStatefulWidget {
  const FilterScreen({
    super.key,
    // required this.initialFilters
  });

  // final Map<Filter, bool> initialFilters;

  @override
  ConsumerState<FilterScreen> createState() {
    return _FilterScreenState();
  }
}

class _FilterScreenState extends ConsumerState<FilterScreen> {
  bool _glutenFreeFilter = false;
  bool _lactoseFreeFilter = false;
  bool _vegetarianFilter = false;
  bool _veganFilter = false;

  @override
  void initState() {
    super.initState();

    final activeFilters = ref.read(filtersProvider);
    _glutenFreeFilter = activeFilters[Filter.enGluterFree]!;
    _lactoseFreeFilter = activeFilters[Filter.enLactoseFree]!;
    _vegetarianFilter = activeFilters[Filter.enVegetarian]!;
    _veganFilter = activeFilters[Filter.enVegan]!;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Filters'),
      ),
      /*drawer: MainDrawer(
        onSelectScreen: (identifier) {
          Navigator.of(context).pop();
          if (identifier == 'meals') {
            Navigator.of(context).push(MaterialPageRoute(
              builder: (ctx) => const TabsScreen(),
            ));
          }
        },
      ),*/
      body: PopScope(
        canPop: false,
        onPopInvoked: (bool didPop) async {
          ref.read(filtersProvider.notifier).setFilters({
            Filter.enGluterFree: _glutenFreeFilter,
            Filter.enLactoseFree: _lactoseFreeFilter,
            Filter.enVegetarian: _vegetarianFilter,
            Filter.enVegan: _veganFilter,
          });
          Navigator.of(context).pop();
          // if (didPop) return;
          // Navigator.of(context).pop({
          //   // this gets returned to the other screen when popping
          //   Filter.enGluterFree: _glutenFreeFilter,
          //   Filter.enLactoseFree: _lactoseFreeFilter,
          //   Filter.enVegetarian: _vegetarianFilter,
          //   Filter.enVegan: _veganFilter,
          // });
        },
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Column(
            children: [
              SwitchListTile(
                value: _glutenFreeFilter,
                onChanged: (checked) {
                  setState(() {
                    _glutenFreeFilter = checked;
                  });
                },
                title: Text(
                  'Gluten-free',
                  style: Theme.of(context).textTheme.titleMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground,
                      ),
                ),
                subtitle: Text(
                  'Only include gluten-free meals.',
                  style: Theme.of(context).textTheme.labelSmall!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground,
                      ),
                ),
                activeColor:
                    Theme.of(context).colorScheme.primary.withAlpha(40),
                contentPadding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              ),
              SwitchListTile(
                value: _lactoseFreeFilter,
                onChanged: (checked) {
                  setState(() {
                    _lactoseFreeFilter = checked;
                  });
                },
                title: Text(
                  'Lactose-free',
                  style: Theme.of(context).textTheme.titleMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground,
                      ),
                ),
                subtitle: Text(
                  'Only include lactose-free meals.',
                  style: Theme.of(context).textTheme.labelSmall!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground,
                      ),
                ),
                activeColor:
                    Theme.of(context).colorScheme.primary.withAlpha(40),
                contentPadding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              ),
              SwitchListTile(
                value: _vegetarianFilter,
                onChanged: (checked) {
                  setState(() {
                    _vegetarianFilter = checked;
                  });
                },
                title: Text(
                  'Vegetarian',
                  style: Theme.of(context).textTheme.titleMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground,
                      ),
                ),
                subtitle: Text(
                  'Only include vegetarian meals.',
                  style: Theme.of(context).textTheme.labelSmall!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground,
                      ),
                ),
                activeColor:
                    Theme.of(context).colorScheme.primary.withAlpha(40),
                contentPadding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              ),
              SwitchListTile(
                value: _veganFilter,
                onChanged: (checked) {
                  setState(() {
                    _veganFilter = checked;
                  });
                },
                title: Text(
                  'Vegan',
                  style: Theme.of(context).textTheme.titleMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground,
                      ),
                ),
                subtitle: Text(
                  'Only include vegan meals.',
                  style: Theme.of(context).textTheme.labelSmall!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground,
                      ),
                ),
                activeColor:
                    Theme.of(context).colorScheme.primary.withAlpha(40),
                contentPadding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              ),
            ],
          ),
        ),
      ),
    );
  }
}*/
