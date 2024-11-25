import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inventories: [],
};

const inventoriesSlice = createSlice({
  name: 'inventories',
  initialState,
  reducers: {
    setInventories(state, action) {
      state.inventories = action.payload;
    },
    addInventory(state, action) {
      state.inventories.push(action.payload);
    },
  },
});

export const { setInventories, addInventory } = inventoriesSlice.actions;
export default inventoriesSlice.reducer;
