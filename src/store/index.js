import { configureStore } from '@reduxjs/toolkit';

import itemsSLice from './items-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: { items: itemsSLice.reducer, ui: uiSlice.reducer },
});

export default store;
