import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'nav-link-active' : 'nav-link-inactive';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary hover:text-primary/90 transition-colors">
            ExpenseTracker
          </Link>
          
          <div className="flex space-x-2">
            <Link
              to="/"
              className={`nav-link ${isActive('/')}`}
            >
              Dashboard
            </Link>
            <Link
              to="/add"
              className={`nav-link ${isActive('/add')}`}
            >
              Add Expense
            </Link>
            <Link
              to="/expenses"
              className={`nav-link ${isActive('/expenses')}`}
            >
              Expenses
            </Link>
            <Link
              to="/reports"
              className={`nav-link ${isActive('/reports')}`}
            >
              Reports
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 