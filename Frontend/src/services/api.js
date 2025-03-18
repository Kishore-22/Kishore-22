// This is a mock API service that will be replaced with real API calls later
export const api = {
  // Auth
  login: async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (credentials.email && credentials.password) {
          resolve({ 
            id: '1', 
            name: 'John Doe', 
            email: credentials.email 
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  register: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (userData.email && userData.password && userData.name) {
          resolve({
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email
          });
        } else {
          reject(new Error('Invalid user data'));
        }
      }, 1000);
    });
  },

  // Groups
  getGroups: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Weekend Trip',
            description: 'Expenses for our weekend getaway',
            members: ['1', '2', '3'],
            expenses: []
          },
          {
            id: '2',
            name: 'Roommates',
            description: 'Monthly household expenses',
            members: ['1', '2'],
            expenses: []
          }
        ]);
      }, 1000);
    });
  },

  getGroupDetails: async (groupId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: groupId,
          name: 'Weekend Trip',
          description: 'Expenses for our weekend getaway',
          members: ['1', '2', '3'],
          expenses: [
            {
              id: '1',
              description: 'Hotel',
              amount: 300,
              paidBy: '1',
              splitWith: ['2', '3'],
              date: new Date().toISOString(),
              category: 'accommodation'
            },
            {
              id: '2',
              description: 'Dinner',
              amount: 150,
              paidBy: '2',
              splitWith: ['1', '3'],
              date: new Date().toISOString(),
              category: 'food'
            }
          ]
        });
      }, 1000);
    });
  },

  createGroup: async (group) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          ...group,
          expenses: []
        });
      }, 1000);
    });
  },

  // Expenses
  getExpenses: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            description: 'Dinner',
            amount: 100,
            paidBy: '1',
            splitWith: ['2', '3'],
            date: new Date().toISOString(),
            category: 'food'
          },
          {
            id: '2',
            description: 'Movie tickets',
            amount: 45,
            paidBy: '2',
            splitWith: ['1'],
            date: new Date().toISOString(),
            category: 'entertainment'
          }
        ]);
      }, 1000);
    });
  },

  createExpense: async (expense) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(expense);
      }, 1000);
    });
  },

  // Friends
  getFriends: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
          { id: '3', name: 'Bob Johnson', email: 'bob@example.com' }
        ]);
      }, 1000);
    });
  },

  addFriend: async (friend) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(friend);
      }, 1000);
    });
  },

  removeFriend: async (friendId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  }
};