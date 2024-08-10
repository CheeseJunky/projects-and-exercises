import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ImageInput extends StatefulWidget {
  const ImageInput({
    super.key, 
    required this.onImageSelected
  });

  final void Function (File image) onImageSelected;

  @override
  State<ImageInput> createState() {
    return _ImageInputState();
  }
}

class _ImageInputState extends State<ImageInput> {
  File? selectedImage;

  void takePicture() async {
    final imagePicker = ImagePicker();
    final img = await imagePicker.pickImage(
      source: ImageSource.camera,
      // source: ImageSource.gallery,
      maxWidth: 600,
    );
    if (img == null) {
      return;
    }

    setState(() {
      selectedImage = File(img.path);
    });

    widget.onImageSelected(selectedImage!);
  }

  @override
  Widget build(BuildContext context) {
    Widget content = TextButton.icon(
      onPressed: takePicture,
      icon: const Icon(Icons.camera_alt),
      label: const Text("Take a picture"),
    );

    if (selectedImage != null) {
      content = GestureDetector(
        onTap: takePicture,
        child: Image.file(
          selectedImage!,
          fit: BoxFit.cover,
          height: double.infinity,
          width: double.infinity,
        ),
      );
    }

    return Container(
      height: 200,
      width: double.infinity,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        border: Border.all(
          width: 1,
          color: Theme.of(context).colorScheme.primary.withOpacity(0.5),
        ),
      ),
      child: content,
    );
  }
}
