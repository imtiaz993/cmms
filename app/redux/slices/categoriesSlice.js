import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    updateCategories(state, action) {
      state.categories.push(action.payload);
    },
    editCategories(state, action) {
      const updatedCategory = action.payload;
      state.categories = state.categories.map((category) => {
        if (category._id === updatedCategory._id) {
          return updatedCategory;
        }
        return category;
      });
    },
    setCategoriesLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCategoriesError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setCategories,
  updateCategories,
  editCategories,
  setCategoriesLoading,
  setCategoriesError,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
