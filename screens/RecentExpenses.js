import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getMinusDays } from "../utils/date";
import { getData } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function RecentExpenses() {
  const expenseCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  const [fetchedData, setFetchedData] = useState([])

  useEffect(() => {
    async function getExp(){
      setIsLoading(true)
      try{
        const expenses = await getData()
        expenseCtx.setExpenses(expenses)
      }catch(error){
        setError(error)
      }
      setIsLoading(false)
      // setFetchedData(expenses)
    }
    getExp()
  }, []);

  function errorHandler(){
    setError(null)
  }

  if(error && !isLoading){
    <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

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
