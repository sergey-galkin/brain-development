import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../api/fakeServer/usersSlice';
import authSlice from '../components/features/Header/DropDownMenu/authSlice';
import gamesStatSlice from '../components/Pages/Profile/gamesStatSlice';

export default configureStore({
  reducer: {
    users: usersSlice,
    gamesStat: gamesStatSlice,
    auth: authSlice,
  },
});
