import 'package:flutter/material.dart';
import 'package:places_app/models/place.dart';
import 'package:places_app/screens/place_details.dart';

class PlacesList extends StatelessWidget {
  const PlacesList({super.key, required this.places});

  final List<Place> places;

  @override
  Widget build(BuildContext context) {
    if (places.isEmpty) {
      return Center(
        child: Text(
          "No places to display",
          style: Theme.of(context)
              .textTheme
              .bodyLarge!
              .copyWith(color: Colors.white70),
        ),
      );
    }

    return ListView.builder(
      itemCount: places.length,
      itemBuilder: (ctx, index) => ListTile(
        leading: CircleAvatar(
          radius: 20,
          backgroundImage: FileImage(
            places[index].image,
          ),
        ),
        title: Text(
          places[index].title,
          style: Theme.of(context)
              .textTheme
              .titleLarge!
              .copyWith(color: Colors.white70),
        ),
        subtitle: Text(
          "Lat: ${places[index].location.lat} Long: ${places[index].location.long}",
          style: Theme.of(context)
              .textTheme
              .titleSmall!
              .copyWith(color: Colors.white70),
        ),
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (ctx) => PlaceDetailsScreen(place: places[index]),
            ),
          );
        },
      ),
    );
  }
}
