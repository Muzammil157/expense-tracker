import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';

export default function MonthlyReport() {
  const { state } = useExpense();
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const months = [...new Set(state.expenses.map(expense => 
    expense.date.slice(0, 7)
  ))].sort((a, b) => b.localeCompare(a));

  const monthlyExpenses = state.expenses.filter(expense =>
    expense.date.startsWith(selectedMonth)
  );

  const totalAmount = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const expensesByCategory = monthlyExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryPercentages = Object.entries(expensesByCategory).map(([category, amount]) => ({
    category,
    amount,
    percentage: (amount / totalAmount) * 100,
  }));

  const formatMonth = (dateString: string) => {
    const [year, month] = dateString.split('-');
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Monthly Report</h2>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="input max-w-xs"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {formatMonth(month)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Summary</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600">Total Expenses:</span>
                <span className="font-medium">${totalAmount.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Number of Expenses:</span>
                <span className="font-medium">{monthlyExpenses.length}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Average per Expense:</span>
                <span className="font-medium">
                  ${monthlyExpenses.length ? (totalAmount / monthlyExpenses.length).toFixed(2) : '0.00'}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Category Breakdown</h3>
            <div className="space-y-4">
              {categoryPercentages.map(({ category, amount, percentage }) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{category}</span>
                    <span className="font-medium">${amount.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Expense Details</h3>
        <div className="space-y-4">
          {monthlyExpenses.length > 0 ? (
            monthlyExpenses
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((expense) => (
                <div
                  key={expense.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${expense.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500 text-center">No expenses for this month</p>
          )}
        </div>
      </div>
    </div>
  );
} 