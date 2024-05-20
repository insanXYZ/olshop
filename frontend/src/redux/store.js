import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user";
import categoriesReducer from "./reducer/categories";
import productsReducer from "./reducer/product";
import productsCartedReducer from "./reducer/productCarted";

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    products: productsReducer,
    productsCarted: productsCartedReducer,
  },
});

export default store;
