import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ImageSelect extends StatefulWidget {
  const ImageSelect({super.key, required this.onImageSelected});

  final void Function(File img) onImageSelected; 

  @override
  State<ImageSelect> createState() {
    return _ImageSelectState();
  }
}

class _ImageSelectState extends State<ImageSelect> {
  File? selectedImage;

  void pickImage() async {
    final pickedImg = await ImagePicker().pickImage(
      source: ImageSource.camera,
      imageQuality: 50,
      maxWidth: 150,
    );

    if (pickedImg == null) {
      return;
    }

    setState(() {
      selectedImage = File(pickedImg.path);
    });

    widget.onImageSelected(selectedImage!);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CircleAvatar(
          radius: 30,
          backgroundColor: Colors.grey,
          foregroundImage: selectedImage != null ? FileImage(selectedImage!) : null,
        ),
        TextButton.icon(
          onPressed: pickImage,
          icon: const Icon(Icons.camera_alt),
          label: Text("Take a picture",
              style: TextStyle(
                color: Theme.of(context).primaryColor,
              )),
        )
      ],
    );
  }
}
