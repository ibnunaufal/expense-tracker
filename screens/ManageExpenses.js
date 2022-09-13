import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

export default function ManageExpenses({ route, navigation }) {
  const expId = route.params?.expId
  const isEdit = !!expId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Edit Expense' : 'Add Expense'
   })
  }, [navigation, isEdit])

  return (
    <View>
      <Text>ManageExpenses</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
