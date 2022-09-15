import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

export default function ManageExpenses({ route, navigation }) {
  const expId = route.params?.expId;
  const isEdit = !!expId;
  const expenseCtx = useContext(ExpensesContext);
  const selectedExpense = expenseCtx.expenses.find((exp) => exp.id === expId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdit]);

  function deleteExpense(id) {
    expenseCtx.deleteExpenses(expId);
    // console.log("delete "+expId)
    navigation.goBack();
  }
  function cancel(id) {
    navigation.goBack();
  }
  function confirm(expenseData) {
    if (isEdit) {
      expenseCtx.updateExpenses(expId, expenseData);
    } else {
      expenseCtx.addExpenses(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirm}
        onCancel={cancel}
        submitButtonLabel={isEdit ? "Edit" : "Add"}
        defaultValue={selectedExpense}
      />
      {isEdit && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpense}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    margin: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
