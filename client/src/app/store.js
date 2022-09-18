import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../components/ui/Modal/modalSlice';
import { apiSlice } from '../api/apiSlice';

export default configureStore({
  reducer: {
    modal: modalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleWare => 
    getDefaultMiddleWare().concat(apiSlice.middleware)
});
