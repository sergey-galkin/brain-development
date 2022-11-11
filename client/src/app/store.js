import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import modalSlice from '../components/features/Modal/modalSlice';
import gamesStatSlice from '../components/Pages/Profile/gamesStatSlice';

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalSlice,
    gamesStat: gamesStatSlice,
  },
  middleware: getDefaultMiddleWare => 
    getDefaultMiddleWare().concat(apiSlice.middleware)
});
