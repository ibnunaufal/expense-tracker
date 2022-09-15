import axios from "axios";

export function storeData(expenseData) {
  axios.post(
    "https://expo-firebase-6aeda-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
    expenseData
  );
}
