import { createContext, useReducer } from "react";
import uuid from 'react-native-uuid';

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: (description, price, date) => { },
    setExpenses: (expenses) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, price, date }) => { }
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = uuid.v4();
            return [{ ...action.data, id: id }, ...state]
        case 'SET':
            const inverted = action.data.reverse();
            return inverted;
        case 'UPDATE':
            const updateIndex = state.findIndex(
                (expense) => expense.id === action.data.id
            );
            const updateObj = state[updateIndex];
            const updatedItem = { ...updateObj, ...action.data.data }
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
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', data: expenseData });
    }

    function setExpenses(expenses) {
        dispatch({ type: 'SET', data: expenses });
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
        setExpenses: setExpenses,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense,
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;
