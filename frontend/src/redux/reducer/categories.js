import { createSlice } from "@reduxjs/toolkit";

const CategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
  },
  reducers: {
    setCategories(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setCategories } = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
