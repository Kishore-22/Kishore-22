import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './slices/expensesSlice';
import friendsReducer from './slices/friendsSlice';
import authReducer from './slices/authSlice';
import groupsReducer from './slices/groupsSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    friends: friendsReducer,
    auth: authReducer,
    groups: groupsReducer,
  },
});