import { configureStore } from "@reduxjs/toolkit";
// import productSlice from "../redux/reducers/ProductReducer";
import productSlice from "../redux/reducers/ProductReducer"

export default configureStore({
  reducer: {
    products: productSlice,
  },
});
