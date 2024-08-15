import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class NewMessage extends StatefulWidget {
  const NewMessage({super.key});

  @override
  State<NewMessage> createState() {
    return _NewMessageState();
  }
}

class _NewMessageState extends State<NewMessage> {
  var messageController = TextEditingController();

  @override
  void dispose() {
    super.dispose();
    messageController.dispose();
  }

  void sendMessage() async {
    final msg = messageController.text;
    if (msg.trim().isEmpty) {
      return;
    }

    messageController.clear();
    FocusScope.of(context).unfocus(); // close keyboard

    final usr = FirebaseAuth.instance.currentUser!;
    final usrData = await FirebaseFirestore.instance.collection('users').doc(usr.uid).get();  // should be saved locally to avoid http req spam
    FirebaseFirestore.instance.collection('messages').add({
      'text': msg,
      'time': Timestamp.now(),
      'userId': usr.uid,
      'username': usrData.data()!['username'],
      'avatar': usrData.data()!['avatar'],
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        vertical: 4,
        horizontal: 10,
      ),
      child: Row(children: [
        Expanded(
          child: TextField(
            textCapitalization: TextCapitalization.sentences,
            autocorrect: false,
            decoration: const InputDecoration(labelText: "Send a message..."),
            controller: messageController,
          ),
        ),
        IconButton(
          onPressed: sendMessage,
          icon: const Icon(Icons.send_rounded),
        )
      ]),
    );
  }
}
