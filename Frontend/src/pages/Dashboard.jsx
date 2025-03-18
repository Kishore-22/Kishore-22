import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses } from '../store/slices/expensesSlice';
import { setFriends } from '../store/slices/friendsSlice';
import { api } from '../services/api';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { expenses } = useSelector(state => state.expenses);
  const { friends } = useSelector(state => state.friends);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesData, friendsData] = await Promise.all([
          api.getExpenses(),
          api.getFriends()
        ]);
        dispatch(setExpenses(expensesData));
        dispatch(setFriends(friendsData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const totalOwed = expenses.reduce((sum, expense) => {
    if (expense.paidBy === user?.id) {
      return sum + (expense.amount / (expense.splitWith.length + 1));
    }
    return sum;
  }, 0);

  const totalOwe = expenses.reduce((sum, expense) => {
    if (expense.splitWith.includes(user?.id)) {
      return sum + (expense.amount / (expense.splitWith.length + 1));
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Balance</h2>
          <p className="text-3xl font-bold text-expense-primary">${(totalOwed - totalOwe).toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">You are owed</h2>
          <p className="text-3xl font-bold text-green-500">${totalOwed.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">You owe</h2>
          <p className="text-3xl font-bold text-red-500">${totalOwe.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
        {expenses.length > 0 ? (
          <ul className="space-y-4">
            {expenses.map(expense => (
              <li key={expense.id} className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <p className="text-sm text-gray-500">
                      Paid by {friends.find(f => f.id === expense.paidBy)?.name || 'You'}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">${expense.amount}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent expenses</p>
        )}
      </div>
    </div>
  );
}