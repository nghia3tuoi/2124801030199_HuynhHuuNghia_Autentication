import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  user: {
    uid: string;
    email: string | null;
    displayName?: string | null;
    emailVerified: boolean;
    photoURL:any;
  } | null;
  error: string | null;
  isLoading: boolean;
}
const initialState: UserState = {
  user: null,
  error: null,
  isLoading: false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      LoginStart: (state) => {
        state.isLoading = true;
        state.user = null;
        state.error = null;
      },
      LoginSuccess: (state, action : PayloadAction<{ uid: string; email: string | null; displayName?: string | null; emailVerified: boolean, photoURL:any}>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      },
      LoginError: (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload
      },
    },
  });
  export default authSlice;
  export const {LoginStart, LoginSuccess, LoginError} = authSlice.actions;