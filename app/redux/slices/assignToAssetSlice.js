import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inventories: [], // Array to store inventory items which will be assigned to asset
  isLoading: false, // Boolean to track loading state
  error: null, // Store any error that occurs during fetching Shipping Cart
};

const assignToAssetSlice = createSlice({
  name: "assignToAsset",
  initialState,
  reducers: {
    // Action to set all
    setAssignToAsset(state, action) {
      state.inventories = action.payload;
    },
    // Action to add a single inventory item to the list
    updateAssignToAsset(state, action) {
      const exists = state.inventories.some(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.inventories.push(action.payload);
      }
    },
    // Action to set the loading state
    setAssignToAssetLoading(state, action) {
      state.isLoading = action.payload;
    },
    // Action to set any error state
    setAssignToAssetError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export the actions for dispatching
export const {
  setAssignToAsset,
  updateAssignToAsset,
  setAssignToAssetLoading,
  setAssignToAssetError,
} = assignToAssetSlice.actions;

// Export the reducer for integration into the store
export default assignToAssetSlice.reducer;
