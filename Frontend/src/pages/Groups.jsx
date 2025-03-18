import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGroup, setGroups } from '../store/slices/groupsSlice';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export default function Groups() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groups } = useSelector(state => state.groups);
  const { friends } = useSelector(state => state.friends);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    members: []
  });

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await api.getGroups();
        dispatch(setGroups(data));
      } catch (error) {
        console.error('Failed to fetch groups:', error);
        toast.error('Failed to load groups');
      }
    };

    fetchGroups();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const group = await api.createGroup(newGroup);
      dispatch(addGroup(group));
      setNewGroup({ name: '', description: '', members: [] });
      setShowAddForm(false);
      toast.success('Group created successfully!');
    } catch (error) {
      console.error('Failed to create group:', error);
      toast.error('Failed to create group');
    }
  };

  const handleMemberToggle = (friendId) => {
    setNewGroup(prev => ({
      ...prev,
      members: prev.members.includes(friendId)
        ? prev.members.filter(id => id !== friendId)
        : [...prev.members, friendId]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-expense-primary text-white rounded-md hover:bg-expense-primary/90"
        >
          Create Group
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-expense-primary focus:border-expense-primary"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-expense-primary focus:border-expense-primary"
                value={newGroup.description}
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Members
              </label>
              <div className="space-y-2">
                {friends.map(friend => (
                  <label key={friend.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded text-expense-primary focus:ring-expense-primary"
                      checked={newGroup.members.includes(friend.id)}
                      onChange={() => handleMemberToggle(friend.id)}
                    />
                    <span>{friend.name}</span>
                  </label>
                ))}
              </div>
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
                Create Group
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(group => (
          <div
            key={group.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/groups/${group.id}`)}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{group.name}</h3>
            <p className="text-gray-600 mb-4">{group.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {group.members.length} members
              </span>
              <span className="text-sm text-gray-500">
                {group.expenses?.length || 0} expenses
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}