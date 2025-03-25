import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "./slices/assetsSlice";
import inventoriesReducer from "./slices/inventoriesSlice";
import locationsReducer from "./slices/locationsSlice";
import systemsReducer from "./slices/systemsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import assetsShippingCartReducer from "./slices/assetsShippingCartSlice";
import inventoryShippingCartReducer from "./slices/inventoryShippingCartSlice";
import assignToAssetReducer from "./slices/assignToAssetSlice";

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
    inventory: inventoriesReducer,
    location: locationsReducer,
    system: systemsReducer,
    categories: categoriesReducer,
    assetsShippingCart: assetsShippingCartReducer,
    inventoryShippingCart: inventoryShippingCartReducer,
    assignToAsset: assignToAssetReducer,
  },
});
