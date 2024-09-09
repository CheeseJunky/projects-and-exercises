import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);

    // const [fetchedExpenses, setFetchedExpenses] = useState([]);

    useEffect(() => {   // dont make useEffect into async
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch data');
            }
            setIsFetching(false);
            // setFetchedExpenses(expenses)
        }
        getExpenses();
    }, []);

    function errorHandler () {
        setError(null);
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
    // const recentExpenses = fetchedExpenses.filter((expense) => {
        const today = new Date();
        const daysAgo7 = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)

        return (expense.date >= daysAgo7) && (expense.date <= today);
    });

    return <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 days"
    />
}

export default RecentExpenses;