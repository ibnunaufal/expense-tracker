import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { getMinusDays } from '../utils/date';

export default function RecentExpenses() {
  const expenseCtx = useContext(ExpensesContext);

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const days7ago = getMinusDays(today, 7)

    return expense.date > days7ago;
  })

  return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  
}

const styles = StyleSheet.create({})