import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  materialTransfer: [],
  isLoading: false,
  error: null,
};

const materialTransferSlice = createSlice({
  name: "materialTransfer",
  initialState,
  reducers: {
    setMaterialTransfer(state, action) {
      state.materialTransfer = action.payload;
    },
    updateMaterialTransfer(state, action) {
      state.materialTransfer.push(action.payload);
    },
    editMaterialTransfer(state, action) {
      const updatedMaterialTransfer = action.payload;
      state.materialTransfer = state.materialTransfer.map((asset) => {
        if (asset._id === updatedAsset._id) {
          return updatedMaterialTransfer;
        }
        return asset;
      });
    },
    setMaterialTransferLoading(state, action) {
      state.isLoading = action.payload;
    },
    setMaterialTransferError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setMaterialTransfer,
  updateMaterialTransfer,
  editMaterialTransfer,
  setMaterialTransferLoading,
  setMaterialTransferError,
} = materialTransferSlice.actions;
export default materialTransferSlice.reducer;
