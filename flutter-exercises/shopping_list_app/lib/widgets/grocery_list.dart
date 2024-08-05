import 'package:flutter/material.dart';

import 'package:shopping_list_app/models/grocery_item.dart';
import 'package:shopping_list_app/widgets/new_item.dart';

class GroceryList extends StatefulWidget {
  const GroceryList({super.key});

  @override
  State<GroceryList> createState() => _GroceryListState();
}

class _GroceryListState extends State<GroceryList> {
  final List<GroceryItem> _shoppingList = [];

  void addNewItem() async {
    final newItem = await Navigator.of(context).push<GroceryItem>(
        MaterialPageRoute(builder: (ctx) => const NewItem()));

    if (newItem == null) {
      return;
    } else {
      setState(() {
        _shoppingList.add(newItem);
      });
    }
  }

  void removeItem(GroceryItem item) {
    setState(() {
      _shoppingList.remove(item);
    });
  }

  @override
  Widget build(BuildContext context) {
    Widget content = const Center(
      child: Text("No items to display"),
    );
    if (_shoppingList.isNotEmpty) {
      content = ListView.builder(
        itemCount: _shoppingList.length,
        itemBuilder: (ctx, index) => Dismissible(
          key: ValueKey(_shoppingList[index].id),
          onDismissed: (direction) {
            removeItem(_shoppingList[index]);
          },
          child: ListTile(
            title: Text(_shoppingList[index].name),
            leading: Container(
              width: 4,
              height: 24,
              color: _shoppingList[index].category.color,
            ),
            trailing: Text(_shoppingList[index].quantity.toString()),
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text("Groceries"),
        actions: [
          IconButton(
            onPressed: addNewItem,
            icon: const Icon(Icons.add),
          ),
        ],
      ),
      body: content,
    );
  }
}
