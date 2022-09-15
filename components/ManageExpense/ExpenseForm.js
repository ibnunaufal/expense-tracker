import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "../UI/Input";
import { GlobalStyles } from "../../constant/styles";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utils/date";

export default function ExpenseForm({
  onSubmit,
  onCancel,
  submitButtonLabel,
  defaultValue,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: defaultValue ? true : false, // or use !! defaultValue
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : "",
      isValid: defaultValue ? true : false,
    },
    desc: {
      value: defaultValue ? defaultValue.desc.toString() : "",
      isValid: defaultValue ? true : false,
    },
  });
  function inputChangeHandler(identifier, value) {
    setInputs((currents) => {
      return {
        ...currents,
        [identifier]: { value: value, isValid: true },
      };
    });
  }
  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      desc: inputs.desc.value,
    };
    const isValidAmount = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isValidDate = expenseData.date.toString() !== "Invalide Date";
    const isValidDesc = expenseData.desc.trim().length > 0;

    if (!isValidAmount || !isValidDate || !isValidDesc) {
      // Alert.alert("Invalid input", "Check again")
      setInputs((current) => {
        return {
          amount: { value: current.amount.value, isValid: isValidAmount },
          date: { value: current.date.value, isValid: isValidDate },
          desc: { value: current.desc.value, isValid: isValidDesc },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }
  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.desc.isValid
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.top}>
        <Input
          style={styles.row}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.row}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "DD-MM-YYYY",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.desc.isValid}
        textInputConfig={{
          multiline: true,
          autoCapitilize: true,
          onChangeText: inputChangeHandler.bind(this, "desc"),
          value: inputs.desc.value,
        }}
      />
      {
        formIsInvalid && <Text style={styles.err} >Invalid inputs! </Text>
      }
      <View style={styles.btnContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flex: 1,
  },
  form: {
    marginTop: 40,
  },
  err: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
