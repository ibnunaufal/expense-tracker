import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constant/styles";

export default function Input({ label, style, textInputConfig }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={textInputConfig.multiline ? [styles.multiline, styles.textInput] : styles.textInput} {...textInputConfig} placeholderTextColor={'white'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:4,
    marginVertical: 8,
  },
  label: {
    color: 'white',
    fontSize: 12,
    marginBottom: 4
  },
  textInput: {
    height: 40,
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: 'white',
    marginBottom: 4
  },
  multiline: {
    // minHeight: 100,
    // textAlignVertical: 'top',
  }
});
