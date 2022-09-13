import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constant/styles";
import getDate from "../../utils/date";
import Rupiah from "../../utils/rupiah";
import { useNavigation } from "@react-navigation/native";

export default function ExpenseItem({ id, desc, amount, date }) {
  const navigation = useNavigation()

  function expensePressHandler() {
    navigation.navigate('ManageExpense', {
      expId: id
    });
  }
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.desc]}>{desc}</Text>
          <Text style={styles.textBase}>{getDate(date)}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.amount}>{Rupiah(amount)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  desc: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
