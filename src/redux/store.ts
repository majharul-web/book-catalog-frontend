import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';

const store = configureStore({
  reducer: {
    // user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
