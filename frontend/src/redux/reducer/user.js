import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    auth: false,
    data: null,
  },
  reducers: {
    setUser(state, action) {
      state.auth = action.payload.auth;
      state.data = action.payload.data;
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
