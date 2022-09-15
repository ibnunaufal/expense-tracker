import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    desc: "Shoes",
    amount: 1000000,
    date: new Date("2022-09-01"),
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
  setExpenses: () => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, { desc, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // const id = new Date().toString() + Math.random().toString;
      return [action.payload, ...state];
    case "SET":
      const t = action.payload.reverse()
      return t;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      console.log(action.payload.data);
      return updatedExpenses;
    case "DELETE":
      // console.log(action.payload)
      // for(let x=0;x<state.length;x++){
      //   if(action.)
      // }
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpenses(expensesData) {
    dispatch({ type: "ADD", payload: expensesData });
  }

  function setExpenses(expensesData) {
    dispatch({ type: "SET", payload: expensesData });
  }

  function deleteExpenses(id) {
    console.log(id);
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpenses(id, expensesData) {
    console.log(expensesData);
    dispatch({ type: "UPDATE", payload: { id: id, data: expensesData } });
  }

  const value = {
    expenses: expensesState,
    addExpenses: addExpenses,
    setExpenses: setExpenses,
    deleteExpenses: deleteExpenses,
    updateExpenses: updateExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
