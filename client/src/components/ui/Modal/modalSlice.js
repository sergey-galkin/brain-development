import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    anyModal: false,
  },
  reducers: {
    open: state => {state.anyModal = true},
    close: state => {state.anyModal = false},
  }
})

export const { open, close } = modalSlice.actions;

export const selectModalStatus = state => state.modal.anyModal;

export default modalSlice.reducer;
