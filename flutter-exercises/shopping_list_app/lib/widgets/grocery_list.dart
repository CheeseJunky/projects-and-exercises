import 'dart:convert';
import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shopping_list_app/data/categories.dart';
import 'package:shopping_list_app/models/category.dart';

import 'package:shopping_list_app/models/grocery_item.dart';
import 'package:shopping_list_app/widgets/new_item.dart';

class GroceryList extends StatefulWidget {
  const GroceryList({super.key});

  @override
  State<GroceryList> createState() => _GroceryListState();
}

class _GroceryListState extends State<GroceryList> {
  List<GroceryItem> _shoppingList = [];
  String _error = "";

  var _isLoading = true;

  @override
  void initState() {
    super.initState();

    loadShoppingListItems();
  }

  void loadShoppingListItems() async {
    final url = Uri.https(
        'flutter-test-17302-default-rtdb.europe-west1.firebasedatabase.app',
        'shopping-list.json');
    final response = await http.get(url);

    if (response.statusCode >= 400) {
      _error = "Failed to fetch data";
    }

    final Map<String, dynamic> listData = json.decode(response.body);
    final List<GroceryItem> _httpItems = [];
    for (final item in listData.entries) {
      final Category tmpCategory = categories.entries
          .firstWhere(
              (element) => element.value.title == item.value['category'])
          .value;
      _httpItems.add(GroceryItem(
          id: item.key,
          name: item.value['name'],
          quantity: item.value['quantity'],
          category: tmpCategory));
    }

    setState(() {
      _shoppingList = _httpItems;
      _isLoading = false;
    });
  }

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

    if (_isLoading) {
      content = const Center(child: CircularProgressIndicator());
    }

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

    if (_error != "") {
      content = Center(child: Text(_error));
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
