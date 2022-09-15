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
  const expenseCtx = useContext(ExpensesContext)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdit]);

  function deleteExpense(id) {
    expenseCtx.deleteExpenses(expId)
    // console.log("delete "+expId)
    navigation.goBack();
  }
  function cancel(id) {
    navigation.goBack();
  }
  function confirm() {
    if(isEdit){
      expenseCtx.updateExpenses()
    }else{
      expenseCtx.addExpenses()
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.btnContainer}>
        <Button style={styles.button} mode='flat' onPress={cancel} >Cancel</Button>
        <Button style={styles.button} onPress={confirm} >{ isEdit?'Update':'Add' }</Button>
      </View>
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
    backgroundColor: GlobalStyles.colors.primary800
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    margin: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  }
});
