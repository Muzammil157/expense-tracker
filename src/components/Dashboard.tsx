import { useExpense } from '../context/ExpenseContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { state } = useExpense();

  const totalExpenses = state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const expensesByCategory = state.expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-primary">
            ${totalExpenses.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">For {currentMonth}</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/add" className="btn btn-primary block text-center">
              Add New Expense
            </Link>
            <Link to="/expenses" className="btn btn-secondary block text-center">
              View All Expenses
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Categories</h3>
          <div className="space-y-2">
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-gray-600">{category}</span>
                <span className="font-medium">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Expenses</h3>
        {state.expenses.length > 0 ? (
          <div className="space-y-2">
            {state.expenses.slice(-5).reverse().map((expense) => (
              <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${expense.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No expenses recorded yet</p>
        )}
      </div>
    </div>
  );
} 