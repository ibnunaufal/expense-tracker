import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constant/styles";
import { ExpensesContext } from "../../store/expenses-context";

export default function ExpensesOutput({ expenses, expensesPeriod, altText }) {
  let ctx = useContext(ExpensesContext);
  let content = <Text>{altText}</Text>;
  if (ctx.expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
