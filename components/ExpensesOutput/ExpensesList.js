import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

function renderItem(itemData) {
  return <ExpenseItem id={itemData.item.id} desc={itemData.item.desc} amount={itemData.item.amount} date={itemData.item.date} />
}

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({});
