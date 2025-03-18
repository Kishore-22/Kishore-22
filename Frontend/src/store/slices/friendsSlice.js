import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friends: [],
  loading: false,
  error: null
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter(friend => friend.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  addFriend, 
  setFriends, 
  removeFriend,
  setLoading,
  setError
} = friendsSlice.actions;

export default friendsSlice.reducer;