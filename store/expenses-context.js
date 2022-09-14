import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    desc: "Shoes",
    amount: 1000000,
    date: new Date("2022-09-22"),
  },
  {
    id: "e2",
    desc: "Shocks",
    amount: 500000,
    date: new Date("2022-09-22"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ desc, amount, date }) => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, { desc, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date.toString() + Math.random().toString;
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const index = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateItem = { ...updateExpense, ...action.payload.data };
      const updatedArr = [...state];
      updatedArr[index] = updateItem;
      return updatedArr;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpenses(expensesData) {
    dispatch({ type: "ADD", payload: expensesData });
  }

  function deleteExpenses(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpenses(id, expensesData) {
    dispatch({ type: "UPDATE", payload: { id: id, payload: expensesData } });
  }

  return <ExpensesContext.Provider>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
