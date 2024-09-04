import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function RecentExpenses () {
    const expensesCtx = useContext(ExpensesContext);
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
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