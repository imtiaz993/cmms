import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [],
  isLoading: false,
  error: null,
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setAssets(state, action) {
      state.assets = action.payload;
    },
    updateAsset(state, action) {
      state.assets.push(action.payload);
    },
    setAssetsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setAssetsError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setAssets, updateAsset, setAssetsLoading, setAssetsError } =
  assetsSlice.actions;
export default assetsSlice.reducer;
