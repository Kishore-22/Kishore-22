import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentGroup } from '../store/slices/groupsSlice';
import { api } from '../services/api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function GroupDetail() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const { currentGroup } = useSelector(state => state.groups);
  const { friends } = useSelector(state => state.friends);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const data = await api.getGroupDetails(groupId);
        dispatch(setCurrentGroup(data));
      } catch (error) {
        console.error('Failed to fetch group details:', error);
        toast.error('Failed to load group details');
      }
    };

    fetchGroupDetails();
  }, [groupId, dispatch]);

  if (!currentGroup) {
    return <div>Loading...</div>;
  }

  const calculateBalances = () => {
    const balances = {};
    currentGroup.members.forEach(memberId => {
      balances[memberId] = 0;
    });

    currentGroup.expenses?.forEach(expense => {
      const share = expense.amount / expense.splitWith.length;
      
      // Add to payer's balance
      balances[expense.paidBy] += expense.amount;
      
      // Subtract shares from members
      expense.splitWith.forEach(memberId => {
        balances[memberId] -= share;
      });
    });

    return balances;
  };

  const balances = calculateBalances();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentGroup.name}</h1>
        <p className="text-gray-600">{currentGroup.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Members</h2>
        <div className="space-y-2">
          {currentGroup.members.map(memberId => {
            const member = friends.find(f => f.id === memberId) || 
                          (memberId === user?.id ? user : { name: 'Unknown' });
            const balance = balances[memberId];
            
            return (
              <div key={memberId} className="flex justify-between items-center py-2">
                <span>{member.name}</span>
                <span className={balance > 0 ? 'text-green-600' : 'text-red-600'}>
                  ${Math.abs(balance).toFixed(2)} {balance > 0 ? 'to receive' : 'to pay'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Expenses</h2>
        {currentGroup.expenses?.length > 0 ? (
          <div className="space-y-4">
            {currentGroup.expenses.map(expense => (
              <div key={expense.id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <p className="text-sm text-gray-500">
                      Paid by {friends.find(f => f.id === expense.paidBy)?.name || 'You'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(expense.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${expense.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No expenses yet</p>
        )}
      </div>
    </div>
  );
}