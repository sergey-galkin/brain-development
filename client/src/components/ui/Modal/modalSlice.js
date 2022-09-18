import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    visible: false,
    header: null,
    childComponentName: null,
  },
  reducers: {
    open: openModal,
    close: closeModal,
  },
});

function openModal(state, action) {
  const { header, childComponentName } = action.payload;
  state.visible = true;
  state.header = header;
  state.childComponentName = childComponentName;
}

function closeModal(state) {
  state.visible = false;
  state.header = null;
  state.childComponentName = null;
}

export const { open, close } = modalSlice.actions;

export const delayedOpen = (payload) => (dispatch, getState) => {
  const timerId = setInterval(() => {
    const {visible, header, childComponentName} = getState().modal;
    if (visible) return;
    clearInterval(timerId);
    dispatch(
      open({
        header: payload.header || header,
        childComponentName: payload.childComponentName || childComponentName,
      })
    )
  }, 100);
};

export default modalSlice.reducer;

export const selectModal = state => state.modal
