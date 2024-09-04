import { createContext, useReducer } from "react";
import uuid from 'react-native-uuid';

const DUMMY_EXPENSES = [
    {
        id: 'expense1',
        description: 'shoes',
        price: 59.99,
        date: new Date('2024-09-02')
    },
    {
        id: 'expense2',
        description: 'bread',
        price: 3.21,
        date: new Date('2024-09-02')
    },
    {
        id: 'expense3',
        description: 'liquid',
        price: 20.00,
        date: new Date('2024-08-24')
    },
    {
        id: 'expense4',
        description: 'books',
        price: 35.67,
        date: new Date('2024-07-20')
    },
    {
        id: 'expense5',
        description: 'brakes',
        price: 89.99,
        date: new Date('2024-07-02')
    },
    {
        id: 'expense6',
        description: 'shoes',
        price: 59.99,
        date: new Date('2024-09-02')
    },
    {
        id: 'expense7',
        description: 'bread',
        price: 3.21,
        date: new Date('2024-09-02')
    },
    {
        id: 'expense8',
        description: 'liquid',
        price: 20.00,
        date: new Date('2024-08-24')
    },
    {
        id: 'expense9',
        description: 'books',
        price: 35.67,
        date: new Date('2024-07-20')
    },
    {
        id: 'expense10',
        description: 'brakes',
        price: 89.99,
        date: new Date('2024-07-02')
    }
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: (description, price, date) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, price, date }) => { }
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = uuid.v4();
            return [{...action.data, id: id}, ...state]
        case 'UPDATE':
            const updateIndex = state.findIndex(
                (expense) => expense.id === action.data.id
            );
            const updateObj = state[updateIndex];
            const updatedItem = {...updateObj, ...action.data.data}
            updatedExpenses = [...state];
            updatedExpenses[updateIndex] = updatedItem
            return updatedExpenses
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.data)
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', data: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', data: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', data: { id: id, data: expenseData } });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense,
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;
