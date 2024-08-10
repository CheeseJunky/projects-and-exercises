import 'package:flutter/material.dart';
import 'package:places_app/models/place.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class MapDisplay extends StatelessWidget {
  const MapDisplay({
    super.key,
    required this.location,
  });

  final PlaceLocation location;

  @override
  Widget build(BuildContext context) {
    return FlutterMap(
      options: MapOptions(
        initialCenter: LatLng(
          location.lat,
          location.long,
        ),
        initialZoom: 9,
      ),
      children: [
        TileLayer(
          urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          userAgentPackageName: 'com.example.app',
          maxNativeZoom: 19,
        ),
        MarkerLayer(
          markers: [
            Marker(
              point: LatLng(location.lat, location.long),
              width: 80,
              height: 80,
              child: const Icon(
                Icons.location_on,
                color: Color.fromARGB(255, 201, 48, 37),
              ),
            ),
          ],
        ),
        RichAttributionWidget(
          attributions: [
            TextSourceAttribution(
              'OpenStreetMap contributors',
              onTap: () =>
                  launchUrl(Uri.parse('https://openstreetmap.org/copyright')),
            ),
          ],
          popupBackgroundColor: Theme.of(context).cardColor,
        ),
      ],
    );
  }
}
