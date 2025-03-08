import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assetsShippingCart: [], // Array to store asset Shipping Cart items
  isLoading: false, // Boolean to track loading state
  error: null, // Store any error that occurs during fetching asset Shipping Cart
};

const assetsShippingCartSlice = createSlice({
  name: "assetsShippingCart",
  initialState,
  reducers: {
    // Action to set all
    setShippingCart(state, action) {
      state.assetsShippingCart = action.payload;
    },
    // Action to add a single asset item to the list
    updateShippingCart(state, action) {
      const exists = state.assetsShippingCart.some(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.assetsShippingCart.push(action.payload);
      }
    },
    // Action to set the loading state
    setShippingCartLoading(state, action) {
      state.isLoading = action.payload;
    },
    // Action to set any error state
    setShippingCartError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export the actions for dispatching
export const {
  setShippingCart,
  updateShippingCart,
  setShippingCartLoading,
  setShippingCartError,
} = assetsShippingCartSlice.actions;

// Export the reducer for integration into the store
export default assetsShippingCartSlice.reducer;
