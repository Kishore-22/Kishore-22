import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addExpense } from '../store/slices/expensesSlice';
import { api } from '../services/api';

export default function AddExpense() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { friends } = useSelector(state => state.friends);
  const { user } = useSelector(state => state.auth);

  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    splitWith: [],
    date: new Date().toISOString().split('T')[0],
    category: 'general'
  });

  const categories = [
    'general',
    'food',
    'transportation',
    'rent',
    'utilities',
    'entertainment',
    'shopping',
    'other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExpense = {
        ...expenseData,
        id: Date.now().toString(),
        paidBy: user.id,
        amount: parseFloat(expenseData.amount),
        date: new Date(expenseData.date).toISOString()
      };
      
      await api.createExpense(newExpense);
      dispatch(addExpense(newExpense));
      navigate('/expenses');
    } catch (error) {
      console.error('Failed to create expense:', error);
    }
  };

  const handleFriendToggle = (friendId) => {
    setExpenseData(prev => ({
      ...prev,
      splitWith: prev.splitWith.includes(friendId)
        ? prev.splitWith.filter(id => id !== friendId)
        : [...prev.splitWith, friendId]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Expense</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-expense-primary focus:border-expense-primary"
            value={expenseData.description}
            onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-expense-primary focus:border-expense-primary"
            value={expenseData.amount}
            onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-expense-primary focus:border-expense-primary"
            value={expenseData.category}
            onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-expense-primary focus:border-expense-primary"
            value={expenseData.date}
            onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Split with
          </label>
          <div className="space-y-2">
            {friends.map(friend => (
              <label key={friend.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-expense-primary focus:ring-expense-primary"
                  checked={expenseData.splitWith.includes(friend.id)}
                  onChange={() => handleFriendToggle(friend.id)}
                />
                <span>{friend.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-expense-primary text-white rounded-md hover:bg-expense-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-expense-primary"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}