import 'dart:io';

import 'package:chat_app/widgets/image_select.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

final firebase = FirebaseAuth.instance;

class RegisterUser extends StatefulWidget {
  const RegisterUser({super.key});

  @override
  State<RegisterUser> createState() {
    return _RegisterUserState();
  }
}

class _RegisterUserState extends State<RegisterUser> {
  final _formKey = GlobalKey<FormState>();
  var isLogin = true;
  var isUploading = false;

  String enteredEmail = '';
  String enteredPass = '';
  File? enteredImage;
  String enteredUsername = '';

  void submit() async {
    final isValid = _formKey.currentState!.validate();
    if (!isValid) {
      return;
    }

    _formKey.currentState!.save();

    try {
      setState(() {
        isUploading = true;
      });
      if (isLogin) {
        // login user
        await firebase.signInWithEmailAndPassword(
          email: enteredEmail,
          password: enteredPass,
        );
      } else {
        // register user
        if (enteredImage == null || enteredUsername == '') {
          setState(() {
            isUploading = false;
          });
          return;
        }

        final usrCred = await firebase.createUserWithEmailAndPassword(
          email: enteredEmail,
          password: enteredPass,
        );

        final storageRef = FirebaseStorage.instance
            .ref()
            .child('avatars')
            .child('${usrCred.user!.uid}.png');
        await storageRef.putFile(enteredImage!);
        final avatarUrl = await storageRef.getDownloadURL();

        await FirebaseFirestore.instance
            .collection('users')
            .doc(usrCred.user!.uid)
            .set({
          'username': enteredUsername,
          'email': enteredEmail,
          'avatar': avatarUrl
        });
      }
    } on FirebaseAuthException catch (error) {
      if (!context.mounted) {
        return;
      }
      ScaffoldMessenger.of(context).clearSnackBars();
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(error.message ?? 'Authentication failed')));
      setState(() {
        isUploading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.primary,
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                margin: const EdgeInsets.symmetric(
                  vertical: 50,
                  horizontal: 20,
                ),
                width: 120,
                child: Image.asset('assets/images/chat.png'),
              ),
              Card(
                margin: const EdgeInsets.symmetric(
                  vertical: 10,
                  horizontal: 30,
                ),
                child: SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          if (!isLogin)
                            ImageSelect(
                              onImageSelected: (img) {
                                enteredImage = img;
                              },
                            ),
                          TextFormField(
                            decoration: const InputDecoration(
                              labelText: "Email",
                            ),
                            keyboardType: TextInputType.emailAddress,
                            autocorrect: false,
                            textCapitalization: TextCapitalization.none,
                            validator: (value) {
                              if (value == null ||
                                  value.trim().isEmpty ||
                                  !value.contains("@")) {
                                return 'Please enter a valid email';
                              }
                              return null;
                            },
                            onSaved: (value) {
                              enteredEmail = value!;
                            },
                          ),
                          const SizedBox(height: 10),
                          TextFormField(
                            decoration: const InputDecoration(
                              labelText: "Password",
                            ),
                            obscureText: true,
                            validator: (value) {
                              if (value == null || value.trim().length < 6) {
                                return 'Password must be at least 6 characters long';
                              }
                              return null;
                            },
                            onSaved: (value) {
                              enteredPass = value!;
                            },
                          ),
                          if (!isLogin) 
                          const SizedBox(height: 10),
                          if (!isLogin) 
                          TextFormField(
                            decoration: const InputDecoration(
                              labelText: "Username",
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty || value.trim().length < 3) {
                                return 'Username must be at least 3 characters long';
                              }
                              return null;
                            },
                            onSaved: (value) {
                              enteredUsername = value!;
                            },
                          ),
                          const SizedBox(height: 10),
                          ElevatedButton(
                            onPressed: submit,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Theme.of(context)
                                  .colorScheme
                                  .primaryContainer,
                            ),
                            child: isUploading
                                ? const Padding(
                                    padding: EdgeInsets.all(5),
                                    child: CircularProgressIndicator())
                                : Text(isLogin ? "Login" : "Register"),
                          ),
                          const SizedBox(height: 10),
                          TextButton(
                            onPressed: () {
                              setState(() {
                                isLogin = !isLogin;
                              });
                            },
                            child: Text(isLogin
                                ? "Create an account"
                                : "I already have an account"),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
