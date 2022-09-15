import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteData, storeData, storeDate, updateData } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

export default function ManageExpenses({ route, navigation }) {
  const expId = route.params?.expId;
  const isEdit = !!expId;
  const expenseCtx = useContext(ExpensesContext);
  const selectedExpense = expenseCtx.expenses.find((exp) => exp.id === expId);
  const [isLoading, setIsLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdit]);

  async function deleteExpense(id) {
    setIsLoading(true)
    await deleteData(expId)
    expenseCtx.deleteExpenses(expId);
    // console.log("delete "+expId)
    navigation.goBack();
  }
  function cancel(id) {
    navigation.goBack();
  }
  async function confirm(expenseData) {
    setIsLoading(true)
    if (isEdit) {
      await updateData(expId, expenseData)
      expenseCtx.updateExpenses(expId, expenseData);
    } else {
      const id = await storeData(expenseData);
      expenseCtx.addExpenses({...expenseData, id: id});
    }
    navigation.goBack();
  }

  if(isLoading){
    return <LoadingOverlay />
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
