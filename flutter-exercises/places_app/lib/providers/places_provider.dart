import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:places_app/models/place.dart';

class PlacesNotifier extends StateNotifier<List<Place>> {
  PlacesNotifier() : super(const []);

  void addPlace(String title, File image) {
    final Place place = Place(
      title: title,
      image: image,
    );

    state = [place, ...state];
  }
}

final placesProvider = StateNotifierProvider<PlacesNotifier, List<Place>>(
  (ref) => PlacesNotifier(),
);
