import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assets: [],
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setAssets(state, action) {
      state.assets = action.payload;
    },
    addAsset(state, action) {
      state.assets.push(action.payload);
    },
  },
});

export const { setAssets, addAsset } = assetsSlice.actions;
export default assetsSlice.reducer;
