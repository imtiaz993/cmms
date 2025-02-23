import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: [], // Array to store inventory items
  isLoading: false, // Boolean to track loading state
  error: null, // Store any error that occurs during inventory fetching
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    // Action to set all locations
    setlocation(state, action) {
      state.location = action.payload;
    },
    // Action to add a single inventory item to the list
    updateLocation(state, action) {
      state.location.push(action.payload);
    },
    // Action to set the loading state
    setLocationLoading(state, action) {
      state.isLoading = action.payload;
    },
    // Action to set any error state
    setLocationError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export the actions for dispatching
export const {
  setlocation,
  updateLocation,
  setLocationLoading,
  setLocationError,
} = locationsSlice.actions;

// Export the reducer for integration into the store
export default locationsSlice.reducer;
