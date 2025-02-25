import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "./slices/assetsSlice";
import inventoriesReducer from "./slices/inventoriesSlice";
import locationsReducer from "./slices/locationsSlice";
import systemsReducer from "./slices/systemsSlice";
import categoriesReducer from "./slices/categoriesSlice";

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
    inventory: inventoriesReducer,
    location: locationsReducer,
    system: systemsReducer,
    categories: categoriesReducer,
  },
});
