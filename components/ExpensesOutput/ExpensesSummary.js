import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constant/styles";
import Rupiah from "../../utils/rupiah";

export default function ExpensesSummary({ expenses, periodName }) {
  const expensesSums = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0);
  return (
    <View style={styles.rootContainer} >
      <Text style={styles.period} >{periodName}</Text>
      <Text style={styles.amount} >{Rupiah(expensesSums)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500
  }
});
