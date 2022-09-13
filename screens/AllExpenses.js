import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'

export default function AllExpenses() {
  return (
    <View style={styles.container}>
      <ExpensesOutput expensesPeriod={'Total'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})