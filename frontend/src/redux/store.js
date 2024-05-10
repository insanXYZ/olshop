import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user";
import categoriesReducer from "./reducer/categories";
import productsReducer from "./reducer/product";

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    products: productsReducer,
  },
});

export default store;
