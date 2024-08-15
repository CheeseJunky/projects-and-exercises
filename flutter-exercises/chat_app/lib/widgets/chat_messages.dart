import 'package:chat_app/widgets/message_bubble.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class ChatMessages extends StatelessWidget {
  const ChatMessages({super.key});

  @override
  Widget build(BuildContext context) {
    final currentUser = FirebaseAuth.instance.currentUser!;

    return StreamBuilder(
        stream: FirebaseFirestore.instance
            .collection('messages')
            .orderBy('time', descending: true)
            .snapshots(),
        builder: (ctx, chatSnapshots) {
          if (chatSnapshots.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (!chatSnapshots.hasData || chatSnapshots.data!.docs.isEmpty) {
            return const Center(child: Text('No messages'));
          }

          if (chatSnapshots.hasError) {
            return const Center(
                child: Text('An error occured, try again later'));
          }

          final messageList = chatSnapshots.data!.docs;

          return ListView.builder(
              padding: const EdgeInsets.only(
                left: 10,
                right: 10,
                bottom: 10,
              ),
              reverse: true,
              itemCount: messageList.length,
              itemBuilder: (ctx, index) {
                final chatMessage = messageList[index].data();
                final nextChat = (index + 1 < messageList.length)
                    ? messageList[index + 1].data()
                    : null;

                if (nextChat != null &&
                    chatMessage['username'] == nextChat['username']) {
                  return MessageBubble.next(
                      message: chatMessage['text'],
                      isMe: currentUser.uid == chatMessage['userId']);
                } else {
                  return MessageBubble.first(
                      userImage: chatMessage['avatar'],
                      username: chatMessage['username'],
                      message: chatMessage['text'],
                      isMe: currentUser.uid == chatMessage['userId']);
                }
              });
        });
  }
}
