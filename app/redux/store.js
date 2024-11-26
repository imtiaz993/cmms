import { configureStore } from '@reduxjs/toolkit';
import assetsReducer from './slices/assetsSlice';
import inventoriesReducer from './slices/inventoriesSlice';

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
    inventory: inventoriesReducer,
  },
});
