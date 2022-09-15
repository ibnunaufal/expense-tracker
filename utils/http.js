import axios from "axios";

const API_URL =
  "https://expo-firebase-6aeda-default-rtdb.asia-southeast1.firebasedatabase.app/";

export async function storeData(expenseData) {
  const response = await axios.post(API_URL + "expenses.json", expenseData);
  const id = response.data.name
  return id
}
export async function getData() {
  const response = await axios.get(API_URL + "expenses.json");

  const expenses = []

  for(const key in response.data){
    const expObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      desc: response.data[key].desc
    }
    expenses.push(expObj)
  }
  return expenses
}

export function updateData(id, data){
  console.log(data)
  return axios.put(API_URL + "expenses/"+id,+".json", data)
}

export function deleteData(){
  return axios.delete(API_URL + "expenses/"+id,+".json")
}