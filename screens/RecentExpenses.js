import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getMinusDays } from "../utils/date";
import { getData } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

export default function RecentExpenses() {
  const expenseCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true)

  const [fetchedData, setFetchedData] = useState([])

  useEffect(() => {
    async function getExp(){
      setIsLoading(true)
      const expenses = await getData()
      setIsLoading(false)
      expenseCtx.setExpenses(expenses)
      // setFetchedData(expenses)
    }
    getExp()
  }, []);

  if(isLoading){
    return <LoadingOverlay />
  }

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const days7ago = getMinusDays(today, 7);

    return expense.date > days7ago;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  );
}

const styles = StyleSheet.create({});
