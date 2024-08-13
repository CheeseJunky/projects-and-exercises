import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:places_app/models/place.dart';
import 'package:path_provider/path_provider.dart' as syspaths;
import 'package:path/path.dart' as path;
import 'package:sqflite/sqflite.dart' as sql;
import 'package:sqflite/sqflite.dart';

Future<Database> getDatabase() async {
  final String dbPath = await sql.getDatabasesPath();
  final sql.Database db = await sql.openDatabase(
    path.join(dbPath, "places.db"),
    onCreate: (db, version) {
      return db.execute(
          "CREATE TABLE Places (id TEXT PRIMARY KEY, title TEXT, image TEXT, lat REAL, long REAL, alt REAL);");
    },
    version: 1,
  );
  return db;
}

class PlacesNotifier extends StateNotifier<List<Place>> {
  PlacesNotifier() : super(const []);

  Future<void> loadPlaces() async {
    final db = await getDatabase();
    final data = await db.query("Places");
    final places = data.map(
      (row) => Place(
        id: row['id'] as String,
        title: row['title'] as String,
        image: File(row['image'] as String),
        location: PlaceLocation(
            lat: row['lat'] as double,
            long: row['long'] as double,
            alt: row['alt'] as double),
      ),
    ).toList();

    state = places;
  }

  void addPlace(String title, File image, PlaceLocation location) async {
    final addDir = await syspaths.getApplicationDocumentsDirectory();
    final filename = path.basename(image.path);
    final localImage = await image.copy("${addDir.path}/$filename");

    final Place place = Place(
      title: title,
      image: localImage,
      location: location,
    );

    final db = await getDatabase();
    db.insert("Places", {
      "id": place.id,
      "title": place.title,
      "image": place.image.path,
      "lat": place.location.lat,
      "long": place.location.long,
      "alt": place.location.alt,
    });

    state = [place, ...state];
  }
}

final placesProvider = StateNotifierProvider<PlacesNotifier, List<Place>>(
  (ref) => PlacesNotifier(),
);
