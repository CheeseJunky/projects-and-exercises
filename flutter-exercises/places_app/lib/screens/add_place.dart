import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:places_app/providers/places_provider.dart';
import 'package:places_app/widgets/image_input.dart';
import 'package:places_app/widgets/location_input.dart';

class AddPlaceScreen extends ConsumerStatefulWidget {
  const AddPlaceScreen({super.key});

  @override
  ConsumerState<AddPlaceScreen> createState() {
    return _AddPlaceScreenState();
  }
}

class _AddPlaceScreenState extends ConsumerState<AddPlaceScreen> {
  final _titleController = TextEditingController();
  File? selectedImage;

  void addNewPlace() {
    final inputText = _titleController.text;

    if (inputText.isEmpty || selectedImage == null) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Invalid title or image"),
        duration: Duration(seconds: 2),
      ));
      return;
    }

    ref.read(placesProvider.notifier).addPlace(inputText, selectedImage!);
    Navigator.of(context).pop();
  }

  @override
  void dispose() {
    super.dispose();

    _titleController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Add New Place"),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(10),
        child: Column(
          children: [
            TextField(
              decoration: const InputDecoration(labelText: "Insert a title"),
              controller: _titleController,
              style: const TextStyle(color: Colors.white70),
            ),
            const SizedBox(height: 10),
            ImageInput(
              onImageSelected: (image) {
                selectedImage = image;
              },
            ),
            const SizedBox(height: 10),
            const LocationInput(),
            const SizedBox(height: 10),
            ElevatedButton.icon(
              onPressed: addNewPlace,
              icon: const Icon(Icons.add),
              label: const Text("Add place"),
            ),
          ],
        ),
      ),
    );
  }
}
