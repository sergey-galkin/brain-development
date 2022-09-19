import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    visible: false,
    header: null,
    childComponentName: null,
    childComponentProps: null,
  },
  reducers: {
    open: openModal,
    close: closeModal,
  },
});

function openModal(state, action) {
  const { header, childComponentName, childComponentProps} = action.payload;
  state.visible = true;
  state.header = header;
  state.childComponentName = childComponentName;
  state.childComponentProps = childComponentProps;
}

function closeModal(state) {
  state.visible = false;
  state.header = null;
  state.childComponentName = null;
  state.childComponentProps = null;
}

export const { open, close } = modalSlice.actions;

export const delayedOpen = (payload) => (dispatch, getState) => {
  const timerId = setInterval(() => {
    const visible = getState().modal.visible;
    if (visible) return;
    clearInterval(timerId);
    dispatch(
      open({
        header: payload.header,
        childComponentName: payload.childComponentName,
        childComponentProps: payload.childComponentProps,
      })
    )
  }, 100);
};

export default modalSlice.reducer;

export const selectModal = state => state.modal
