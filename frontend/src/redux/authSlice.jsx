import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      firstName: '',
      lastName : '',
      userName : '',
    },
    token: null,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.error = null;
    },
    updateUserName: (state, action) => {
      state.user.firstName = action.payload.firstName
      state.user.lastName = action.payload.lastName
      state.user.userName = action.payload.userName
    },
  },
});



export const { loginSuccess, loginFailure, logout, updateUserName } = authSlice.actions;
export default authSlice.reducer;
