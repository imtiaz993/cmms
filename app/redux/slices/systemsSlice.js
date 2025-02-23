import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  system: [], // Array to store inventory items
  isLoading: false, // Boolean to track loading state
  error: null, // Store any error that occurs during inventory fetching
};

const systemsSlice = createSlice({
  name: "systems",
  initialState,
  reducers: {
    // Action to set all locations
    setSystem(state, action) {
      state.system = action.payload;
    },
    // Action to add a single inventory item to the list
    updateSystem(state, action) {
      state.system.push(action.payload);
    },
    // Action to set the loading state
    setSystemLoading(state, action) {
      state.isLoading = action.payload;
    },
    // Action to set any error state
    setSystemError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export the actions for dispatching
export const { setSystem, updateSystem, setSystemLoading, setSystemError } =
  systemsSlice.actions;

// Export the reducer for integration into the store
export default systemsSlice.reducer;
