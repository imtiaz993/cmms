import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inventory: [], // Array to store inventory items
  isLoading: false, // Boolean to track loading state
  error: null, // Store any error that occurs during inventory fetching
};

const inventoriesSlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    // Action to set all inventories
    setInventory(state, action) {
      state.inventory = action.payload;
    },
    // Action to add a single inventory item to the list
    updateInventory(state, action) {
      state.inventory.push(action.payload);
    },
    // Action to set the loading state
    setInventoryLoading(state, action) {
      state.isLoading = action.payload;
    },
    // Action to set any error state
    setInventoryError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export the actions for dispatching
export const {
  setInventory,
  updateInventory,
  setInventoryLoading,
  setInventoryError,
} = inventoriesSlice.actions;

// Export the reducer for integration into the store
export default inventoriesSlice.reducer;
