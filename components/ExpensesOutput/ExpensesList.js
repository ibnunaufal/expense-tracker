import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

function renderItem(itemData) {
  return <Text> {itemData.item.desc} </Text>;
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
