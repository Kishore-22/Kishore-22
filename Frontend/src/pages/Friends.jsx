import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFriend, removeFriend } from '../store/slices/friendsSlice';
import { api } from '../services/api';

export default function Friends() {
  const dispatch = useDispatch();
  const { friends } = useSelector(state => state.friends);
  const [newFriend, setNewFriend] = useState({ name: '', email: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const friend = {
        id: Date.now().toString(),
        ...newFriend
      };
      await api.addFriend(friend);
      dispatch(addFriend(friend));
      setNewFriend({ name: '', email: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add friend:', error);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      await api.removeFriend(friendId);
      dispatch(removeFriend(friendId));
    } catch (error) {
      console.error('Failed to remove friend:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-expense-primary text-white rounded-md hover:bg-expense-primary/90"
        >
          Add Friend
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-expense-primary focus:border-expense-primary"
                value={newFriend.name}
                onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-expense-primary focus:border-expense-primary"
                value={newFriend.email}
                onChange={(e) => setNewFriend({ ...newFriend, email: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-expense-primary text-white rounded-md hover:bg-expense-primary/90"
              >
                Add Friend
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <ul className="divide-y divide-gray-200">
          {friends.map(friend => (
            <li key={friend.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{friend.name}</h3>
                  <p className="text-sm text-gray-500">{friend.email}</p>
                </div>
                <button
                  onClick={() => handleRemoveFriend(friend.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}