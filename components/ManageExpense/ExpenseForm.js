import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "../UI/Input";

export default function ExpenseForm() {
  const [input, setInput] = useState({
    amount: '',
    date: '',
    desc: ''
  })  
  function inputChangeHandler(identifier, value) {
    setInput((current) => {
        return {
            ...current,
            [identifier]: value
        }
    })
  }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.top}>
        <Input
          style={styles.row}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: input.amount
          }}
        />
        <Input
          style={styles.row}
          label="Date"
          textInputConfig={{
            placeholder: "DD-MM-YYYY",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: input.date
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCapitilize: true,
          onChangeText: inputChangeHandler.bind(this, 'desc'),
          value: input.desc
        }}
      />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center"
  },
});
