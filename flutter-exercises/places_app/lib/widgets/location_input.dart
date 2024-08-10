import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:places_app/models/place.dart';
import 'package:places_app/widgets/map_display.dart';

class LocationInput extends StatefulWidget {
  const LocationInput({
    super.key,
    required this.onLocationSelected,
  });

  final void Function(PlaceLocation location) onLocationSelected;

  @override
  State<LocationInput> createState() {
    return _LocationInputState();
  }
}

class _LocationInputState extends State<LocationInput> {
  LocationData? selectedLocation;
  PlaceLocation? cLocation;
  var isLocating = false;

  void getCurrentLocation() async {
    Location location = Location();

    bool serviceEnabled;
    PermissionStatus permissionGranted;
    LocationData locationData;

    serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await location.requestService();
      if (!serviceEnabled) {
        return;
      }
    }

    permissionGranted = await location.hasPermission();
    if (permissionGranted == PermissionStatus.denied) {
      permissionGranted = await location.requestPermission();
      if (permissionGranted != PermissionStatus.granted) {
        return;
      }
    }

    setState(() {
      isLocating = true;
    });

    locationData = await location.getLocation();

    setState(() {
      isLocating = false;
      selectedLocation = locationData;
      cLocation = PlaceLocation(
        lat: selectedLocation!.latitude!,
        long: selectedLocation!.longitude!,
        alt: selectedLocation!.altitude!,
      );
    });
    widget.onLocationSelected(cLocation!);
  }

  @override
  Widget build(BuildContext context) {
    Widget content = Text(
      "No location chosen",
      textAlign: TextAlign.center,
      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
            color: Theme.of(context).colorScheme.primary,
          ),
    );

    if (isLocating) {
      content = const CircularProgressIndicator();
    }

    if (selectedLocation != null) {
      content = MapDisplay(location: cLocation!);
    }

    return Column(
      children: [
        Container(
          height: 200,
          width: double.infinity,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            border: Border.all(
              width: 1,
              color: Theme.of(context).colorScheme.primary.withOpacity(0.2),
            ),
          ),
          child: content,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            TextButton.icon(
              onPressed: getCurrentLocation,
              icon: const Icon(Icons.location_on),
              label: const Text("Get current location"),
            ),
            TextButton.icon(
              onPressed: null,
              icon: const Icon(Icons.map),
              label: const Text("Select on map"),
            ),
          ],
        ),
      ],
    );
  }
}
