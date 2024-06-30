import 'package:flutter/material.dart';
import 'package:meals_app/models/category.dart';

class CategoryGridItem extends StatelessWidget {
  const CategoryGridItem({super.key, required this.catg, required this.onSelectCategory});

  final Category catg;
  final void Function() onSelectCategory;

  @override
  Widget build(BuildContext context) {
    final borderRadius = BorderRadius.circular(14);

    return InkWell(
      onTap: onSelectCategory,
      splashColor: catg.color.withOpacity(0.5),
      borderRadius: borderRadius,
      child: Container(
          padding: const EdgeInsets.all(15),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                catg.color.withOpacity(0.55),
                catg.color.withOpacity(0.9),
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: borderRadius,
          ),
          child: Text(
            catg.title,
            style: Theme.of(context).textTheme.titleLarge!.copyWith(
                  color: Theme.of(context).colorScheme.onBackground,
                ),
          )),
    );
  }
}
