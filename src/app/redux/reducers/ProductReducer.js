import { createSlice, current } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    product: {},
    cartItems: [],
    wishList: [],
    purchaseItem: {},
  },
  reducers: {
    addItemsToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    addItemsToWishList: (state, action) => {
      state.wishList.push(action.payload);
    },
    removeCartItems: (state, action) => {
      let index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems.splice(index, 1);
    },
    removeWishlistItems: (state, action) => {
      let index = state.wishList.findIndex(
        (item) => item.id === action.payload
      );

      state.wishList.splice(index, 1);
    },
    increaseQuantity: (state, action) => {
      let index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );

      let items = [...current(state.cartItems)];
      let item = { ...items[index] };

      if (item.quantity) {
        item.quantity += 1;
        item.increasedPrice = parseInt(item.quantity) * parseInt(item.price);
      } else {
        item.quantity = 2;
        item.increasedPrice = 2 * parseInt(item.price);
      }

      state.cartItems.splice(index, 1, item);
    },
    decreaseQuantity: (state, action) => {
      let index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );

      let items = [...current(state.cartItems)];
      let item = { ...items[index] };

      if (item.quantity) {
        item.quantity -= 1;
        item.increasedPrice = parseInt(item.quantity) * parseInt(item.price);
      } else {
        item.quantity = 0;
        item.increasedPrice = 1 * parseInt(item.price);
      }

      state.cartItems.splice(index, 1, item);
    },
    renderSingleItem: (state, action) => {
      state.product = action.payload;
    },
    reset: (state) => {
      return (state = {
        ...state,
        products: {},
        cartItems: [],
        purchaseItem: {},
      });
    },
  },
});

export const {
  addItemsToCart,
  addItemsToWishList,
  removeCartItems,
  removeWishlistItems,
  increaseQuantity,
  decreaseQuantity,
  renderSingleItem,
  reset,
} = productSlice.actions;

export default productSlice.reducer;
