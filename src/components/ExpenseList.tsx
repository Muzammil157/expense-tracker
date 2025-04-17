import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';

export default function ExpenseList() {
  const { state, dispatch } = useExpense();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredExpenses = state.expenses
    .filter(expense => 
      selectedCategory === 'All' ? true : expense.category === selectedCategory
    )
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'date') {
        return (new Date(a.date).getTime() - new Date(b.date).getTime()) * order;
      }
      return (a.amount - b.amount) * order;
    });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch({ type: 'DELETE_EXPENSE', payload: id });
    }
  };

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input max-w-xs"
          >
            <option value="All">All Categories</option>
            {state.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => toggleSort('date')}
            className={`btn ${sortBy === 'date' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Sort by Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => toggleSort('amount')}
            className={`btn ${sortBy === 'amount' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Sort by Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Expenses</h2>
        
        {filteredExpenses.length > 0 ? (
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg gap-4"
              >
                <div>
                  <p className="font-medium text-gray-800">{expense.description}</p>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-primary">${expense.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No expenses found</p>
        )}
      </div>
    </div>
  );
} 