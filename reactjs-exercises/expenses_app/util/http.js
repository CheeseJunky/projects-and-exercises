import axios from "axios";

const FIREBASE_DATABASE = 'https://react-native-test-c8fea-default-rtdb.europe-west1.firebasedatabase.app';

export async function storeExpense (expenseData) {
    const response = await axios.post(FIREBASE_DATABASE + '/expenses.json', expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpenses () {
    const response = await axios.get(FIREBASE_DATABASE + '/expenses.json');
    const expenses = [];

    for (const key in response.data) {
        const expObj = {
            id: key,
            price: response.data[key].price,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expObj);
    }

    return expenses;
}

export function updateExpense (id, expData) {
    return axios.put(FIREBASE_DATABASE + `/expenses/${id}.json`, expData)
}

export function deleteExpense (id) {
    return axios.delete(FIREBASE_DATABASE + `/expenses/${id}.json`);
}
