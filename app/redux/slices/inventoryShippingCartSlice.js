import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inventoryShippingCart: [], // Array to store inventory Shipping Cart items
  isLoading: false, // Boolean to track loading state
  error: null, // Store any error that occurs during fetching Shipping Cart
};

const inventoryShippingCartSlice = createSlice({
  name: "inventoryShippingCart",
  initialState,
  reducers: {
    // Action to set all
    setShippingCart(state, action) {
      state.inventoryShippingCart = action.payload;
    },
    // Action to add a single inventory item to the list
    updateShippingCart(state, action) {
      const exists = state.inventoryShippingCart.some(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.inventoryShippingCart.push(action.payload);
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
} = inventoryShippingCartSlice.actions;

// Export the reducer for integration into the store
export default inventoryShippingCartSlice.reducer;
