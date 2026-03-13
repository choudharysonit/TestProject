import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',

  initialState: {
    users: [],

  },

  reducers: {
    setUsers: (state, action) => {
      const newUsers = action.payload.filter(
        newUser => !state.users.some(user => user.id === newUser.id),
      );

      state.users = [...state.users, ...newUsers];
    },
    clearUsers: state => {
      state.users = [];
    },


  },
});

export const { setUsers, clearUsers } = userSlice.actions;

export default userSlice.reducer;
