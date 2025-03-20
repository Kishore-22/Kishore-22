import axios from "axios";

const API_BASE_URL = "http://localhost:5124/api/auth"; // Adjust if needed

// This is a mock API service that will be replaced with real API calls later
export const api = {
  // Auth
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      const Token = response.data.token;
      if (Token) {
        localStorage.setItem("jwtToken", Token); // Store JWT in local storage
        console.log(
          "Token stored in localStorage:",
          localStorage.getItem("jwtToken")
        );
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      const Token = response.data.token;

      if (Token) {
        localStorage.setItem("jwtToken", Token); // Store JWT
        console.log(
          "Token stored in localStorage:",
          localStorage.getItem("jwtToken")
        );
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" };
    }
  },

  // Groups
  getGroups: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            name: "Weekend Trip",
            description: "Expenses for our weekend getaway",
            members: ["1", "2", "3"],
            expenses: [],
          },
          {
            id: "2",
            name: "Roommates",
            description: "Monthly household expenses",
            members: ["1", "2"],
            expenses: [],
          },
        ]);
      }, 1000);
    });
  },

  getGroupDetails: async (groupId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: groupId,
          name: "Weekend Trip",
          description: "Expenses for our weekend getaway",
          members: ["1", "2", "3"],
          expenses: [
            {
              id: "1",
              description: "Hotel",
              amount: 300,
              paidBy: "1",
              splitWith: ["2", "3"],
              date: new Date().toISOString(),
              category: "accommodation",
            },
            {
              id: "2",
              description: "Dinner",
              amount: 150,
              paidBy: "2",
              splitWith: ["1", "3"],
              date: new Date().toISOString(),
              category: "food",
            },
          ],
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
          expenses: [],
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
            id: "1",
            description: "Dinner",
            amount: 100,
            paidBy: "1",
            splitWith: ["2", "3"],
            date: new Date().toISOString(),
            category: "food",
          },
          {
            id: "2",
            description: "Movie tickets",
            amount: 45,
            paidBy: "2",
            splitWith: ["1"],
            date: new Date().toISOString(),
            category: "entertainment",
          },
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
          { id: "2", name: "Jane Smith", email: "jane@example.com" },
          { id: "3", name: "Bob Johnson", email: "bob@example.com" },
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
  },
};
