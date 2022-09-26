import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import modalSlice from '../components/ui/Modal/modalSlice';

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalSlice,
  },
  middleware: getDefaultMiddleWare => 
    getDefaultMiddleWare().concat(apiSlice.middleware)
});
