import { createContext, useContext, useReducer, ReactNode } from 'react';

type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

type ExpenseState = {
  expenses: Expense[];
  categories: string[];
};

type ExpenseAction =
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'EDIT_EXPENSE'; payload: Expense }
  | { type: 'ADD_CATEGORY'; payload: string };

const initialState: ExpenseState = {
  expenses: [],
  categories: ['Food', 'Transportation', 'Entertainment', 'Bills', 'Other'],
};

const ExpenseContext = createContext<{
  state: ExpenseState;
  dispatch: React.Dispatch<ExpenseAction>;
} | null>(null);

function expenseReducer(state: ExpenseState, action: ExpenseAction): ExpenseState {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    case 'EDIT_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    default:
      return state;
  }
}

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}

export type { Expense }; 