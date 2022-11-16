import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import gamesStatSlice from '../components/Pages/Profile/gamesStatSlice';

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    gamesStat: gamesStatSlice,
  },
  middleware: getDefaultMiddleWare => 
    getDefaultMiddleWare().concat(apiSlice.middleware)
});
