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
    updateAssets(state, action) {
      state.assets.push(action.payload);
    },
    editAsset(state, action) {
      const updatedAsset = action.payload;
      state.assets = state.assets.map((asset) => {
        if (asset._id === updatedAsset._id) {
          return updatedAsset;
        }
        return asset;
      });
    },
    setAssetsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setAssetsError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setAssets, updateAssets, editAsset, setAssetsLoading, setAssetsError } =
  assetsSlice.actions;
export default assetsSlice.reducer;
