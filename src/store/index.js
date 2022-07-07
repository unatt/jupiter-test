import { configureStore } from '@reduxjs/toolkit';

import itemsSLice from './items-slice';

const store = configureStore({
  reducer: { items: itemsSLice.reducer },
});

export default store;
