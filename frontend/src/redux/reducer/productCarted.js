import { createSlice } from "@reduxjs/toolkit";

const ProductsCartedSlice = createSlice({
  name: "productsCarted",
  initialState: {
    data: [],
  },
  reducers: {
    setProductsCarted(state, action) {
      state.data = action.payload;
    },
    setQty(state, action) {
      let data = state.data.find((x) => {
        return x.id == action.payload.id;
      });

      if (data) {
        data.qty = action.payload.qty;
      }
    },
  },
});

export const { setProductsCarted, setQty } = ProductsCartedSlice.actions;
export default ProductsCartedSlice.reducer;
