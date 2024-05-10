import { createSlice } from "@reduxjs/toolkit";

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setProducts } = ProductsSlice.actions;
export default ProductsSlice.reducer;
