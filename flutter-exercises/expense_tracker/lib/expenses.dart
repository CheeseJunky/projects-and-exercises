import 'package:expense_tracker/components/add_expense_overlay.dart';
import 'package:expense_tracker/components/expenses_list.dart';
import 'package:expense_tracker/models/expense.dart';
import 'package:expense_tracker/components/chart/chart.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class Expenses extends StatefulWidget {
  const Expenses({super.key});

  @override
  State<Expenses> createState() {
    return _ExpensesState();
  }
}

class _ExpensesState extends State<Expenses> {
  final List<Expense> _expenseList = [
    Expense(
        title: 'Prvi',
        amount: 19.99,
        date: DateTime.fromMillisecondsSinceEpoch(1716912769000),
        category: Category.work),
    Expense(
        title: 'Drugi',
        amount: 2.40,
        date: DateTime.fromMillisecondsSinceEpoch(1716913769000),
        category: Category.travel),
    Expense(
        title: 'Tretji',
        amount: 56.45,
        date: DateTime.fromMillisecondsSinceEpoch(1716813769000),
        category: Category.food),
    Expense(
        title: 'Cetrti',
        amount: 120.15,
        date: DateTime.fromMillisecondsSinceEpoch(1716553769000),
        category: Category.leisure),
  ];

  void _openAddExpenseOverlay() {
    showModalBottomSheet(
      useSafeArea: true,
        isScrollControlled: true,
        context: context,
        builder: (ctx) => AddExpenseOverlay(onAddExpense: _addExpense));
  }

  void _addExpense(Expense expe) {
    setState(() {
      _expenseList.add(expe);
    });
  }

  void _removeExpense(Expense expe) {
    final expenseIndex = _expenseList.indexOf(expe);

    setState(() {
      _expenseList.remove(expe);
    });

    ScaffoldMessenger.of(context)
        .clearSnackBars(); // the old one might still be showing
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        duration: const Duration(seconds: 3),
        content: const Text('Item deleted'),
        action: SnackBarAction(
            label: 'Undo',
            onPressed: () {
              setState(() {
                _expenseList.insert(expenseIndex, expe);
              });
            }),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final wdt = MediaQuery.of(context).size.width;

    Widget mainContent = const Center(
      child: Text('No expenses to show'),
    );

    Widget listContent = ExpensesList(
      expenses: _expenseList,
      onRemoveExpense: _removeExpense,
    );

    if (_expenseList.isNotEmpty) {
      mainContent = listContent;
    }

    return Scaffold(
      appBar: AppBar(
          title: const Text(
            'Expense Tracker',
            style: TextStyle(color: Colors.white, fontSize: 20),
          ),
          // backgroundColor: const Color.fromARGB(255, 122, 27, 211),
          actions: [
            IconButton(
              onPressed: () {
                _openAddExpenseOverlay();
              },
              icon: const Icon(
                Icons.add,
                color: Colors.white,
              ),
            ),
          ]),
      body: wdt < 600
          ? Column(
              children: [
                Expanded(
                  child: Chart(
                    expenses: _expenseList,
                  ),
                ),
                Expanded(
                  child: mainContent,
                ),
              ],
            )
          : Row(
              children: [
                Expanded(
                  child: Chart(
                    expenses: _expenseList,
                  ),
                ),
                Expanded(
                  child: mainContent,
                ),
              ],
            ),
    );
  }
}
