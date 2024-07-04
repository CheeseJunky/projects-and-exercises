import 'package:flutter/material.dart';
import 'package:meals_app/models/meal.dart';
import 'package:meals_app/widgets/meal_item_trait.dart';
import 'package:transparent_image/transparent_image.dart';

class MealItem extends StatelessWidget {
  const MealItem({
    super.key,
    required this.meal,
    required this.onSelectMeal,
  });

  final Meal meal;
  final void Function(Meal meal) onSelectMeal;

  String get complexityText {
    return meal.complexity.name[0].toUpperCase() + meal.complexity.name.substring(1).toLowerCase();
  }

    String get affordabilityText {
    return meal.affordability.name[0].toUpperCase() + meal.affordability.name.substring(1).toLowerCase();
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10),),
      clipBehavior: Clip.hardEdge,
      elevation: 2,
      child: InkWell(
        onTap: () { onSelectMeal(meal); },
        child: Stack(   // shows items on top of each other
          children: [
            Hero( // Hero animates widgets between screens
              tag: meal.id,
              child: FadeInImage(
                placeholder: MemoryImage(kTransparentImage), 
                image: NetworkImage(meal.imageUrl),
                fit: BoxFit.cover,
                height: 200,
                width: double.infinity,
                ),
            ),
              Positioned(
                bottom: 0,    // positioned on the bottom of the above fadeinimage
                left: 0,      // stretching from left to right
                right: 0,
                child: Container(
                  color: Colors.black54,
                  padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 20),
                  child: Column(
                    children: [
                      Text(
                        meal.title,
                        maxLines: 2,
                        textAlign: TextAlign.center,
                        softWrap: true,
                        overflow: TextOverflow.ellipsis,  // ...
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 10,),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          MealItemTrait(
                            icon: Icons.schedule, 
                            label: '${meal.duration} min'
                            ),
                            const SizedBox(width: 10),
                            MealItemTrait(icon: Icons.trending_up_rounded, label: complexityText),
                            const SizedBox(width: 10),
                            MealItemTrait(icon: Icons.attach_money_sharp, label: affordabilityText)
                        ],
                      ),
                    ],
                  ),
              ),),
          ],
        ),
      ),
    );
  }
}