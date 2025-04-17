# Expense Tracker

A modern React application for managing personal expenses and tracking monthly budgets. Built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 Dashboard with expense overview
- ➕ Add and manage expenses
- 🏷️ Categorize expenses
- 📅 Monthly reports and statistics
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Dashboard**: View your expense summary and recent transactions
2. **Add Expense**: Click "Add Expense" to record a new transaction
3. **Expenses**: View and manage all your expenses with filtering and sorting options
4. **Reports**: Access monthly reports and category breakdowns

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Context API for state management

## Project Structure

```
src/
  components/
    Header.tsx         # Navigation and app header
    Dashboard.tsx      # Main dashboard view
    AddExpense.tsx    # Form for adding expenses
    ExpenseList.tsx   # List and management of expenses
    MonthlyReport.tsx # Monthly statistics and reports
  context/
    ExpenseContext.tsx # Global state management
  types/
    index.ts          # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
