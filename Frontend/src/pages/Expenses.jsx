import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setExpenses } from '../store/slices/expensesSlice';
import { api } from '../services/api';
import { format } from 'date-fns';

export default function Expenses() {
  const dispatch = useDispatch();
  const { expenses } = useSelector(state => state.expenses);
  const { friends } = useSelector(state => state.friends);
  const { user } = useSelector(state => state.auth);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await api.getExpenses();
        dispatch(setExpenses(data));
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      }
    };

    fetchExpenses();
  }, [dispatch]);

  const filteredExpenses = expenses.filter(expense => {
    switch (filter) {
      case 'paid':
        return expense.paidBy === user?.id;
      case 'owed':
        return expense.splitWith.includes(user?.id);
      default:
        return true;
    }
  });

  const getExpenseParticipants = (expense) => {
    const participants = expense.splitWith.map(id => 
      friends.find(f => f.id === id)?.name || 'Unknown'
    );
    return participants.join(', ');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
        <Link
          to="/expenses/add"
          className="px-4 py-2 bg-expense-primary text-white rounded-md hover:bg-expense-primary/90"
        >
          Add Expense
        </Link>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-expense-primary text-white' : 'bg-gray-100'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-md ${filter === 'paid' ? 'bg-expense-primary text-white' : 'bg-gray-100'}`}
          onClick={() => setFilter('paid')}
        >
          You paid
        </button>
        <button
          className={`px-4 py-2 rounded-md ${filter === 'owed' ? 'bg-expense-primary text-white' : 'bg-gray-100'}`}
          onClick={() => setFilter('owed')}
        >
          You owe
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <ul className="divide-y divide-gray-200">
          {filteredExpenses.map(expense => (
            <li key={expense.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-lg font-medium text-gray-900">{expense.description}</p>
                  <p className="text-sm text-gray-500">
                    Paid by {expense.paidBy === user?.id ? 'you' : friends.find(f => f.id === expense.paidBy)?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Split with: {getExpenseParticipants(expense)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(expense.date), 'MMM d, yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${expense.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Your share: ${(expense.amount / (expense.splitWith.length + 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}