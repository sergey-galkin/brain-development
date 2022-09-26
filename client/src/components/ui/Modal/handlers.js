import store from "../../../app/store";

export const delayedOpen = (openModal) => {
  const timerID = setInterval(() => {
    // open only if no other modal is opened
    if ( store.getState().modal.anyModal ) return;
    clearInterval(timerID);
    openModal();
  }, 100);
}