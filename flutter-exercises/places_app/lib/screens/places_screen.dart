import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:places_app/providers/places_provider.dart';
import 'package:places_app/screens/add_place.dart';
import 'package:places_app/widgets/places_list.dart';

class PlacesScreen extends ConsumerStatefulWidget {
  const PlacesScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() {
    return _PlacesScreenState();
  }
}

class _PlacesScreenState extends ConsumerState<PlacesScreen> {
  late Future<void> placesFuture;

  @override
  void initState() {
    super.initState();
    placesFuture = ref.read(placesProvider.notifier).loadPlaces();
  }

  @override
  Widget build(BuildContext context) {
    final usrPlaces = ref.watch(placesProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text("Places"),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.of(context).push(
                  MaterialPageRoute(builder: (ctx) => const AddPlaceScreen()));
            },
            icon: const Icon(Icons.add),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(10),
        child: FutureBuilder(
            future: placesFuture,
            builder: (context, snapshot) =>
                snapshot.connectionState == ConnectionState.waiting
                    ? const Center(child: CircularProgressIndicator())
                    : PlacesList(places: usrPlaces)),
      ),
    );
  }
}
