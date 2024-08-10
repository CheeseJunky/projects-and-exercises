import 'dart:io';

import 'package:uuid/uuid.dart';

const uuid = Uuid();


class PlaceLocation {
  const PlaceLocation({
    required this.lat,
    required this.long,
    required this.alt,
  });

  final double lat;
  final double long;
  final double alt;
}

class Place {
  Place({
    required this.title,
    required this.image,
    required this.location,
  }) : id = uuid.v4();

  final String id;
  final String title;
  final File image;
  final PlaceLocation location;
}
