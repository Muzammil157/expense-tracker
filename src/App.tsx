import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import AddExpense from './components/AddExpense'
import ExpenseList from './components/ExpenseList'
import MonthlyReport from './components/MonthlyReport'
import { ExpenseProvider } from './context/ExpenseContext'

function App() {
  return (
    <ExpenseProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddExpense />} />
              <Route path="/expenses" element={<ExpenseList />} />
              <Route path="/reports" element={<MonthlyReport />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ExpenseProvider>
  )
}

export default App
