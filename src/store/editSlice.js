// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const editSlice = createSlice({
  name: 'edituser',
  initialState: {
    user: null,
    updatedUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.updatedUser = action.payload;
    },
    updateUser: (state, action) => {
      state.updatedUser = { ...state.updatedUser, ...action.payload };
    },
  },
});

export const { setUser, updateUser } = editSlice.actions;

export default editSlice.reducer;
