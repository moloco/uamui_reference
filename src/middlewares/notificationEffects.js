import { KEY, LIFECYCLE } from 'redux-pack';

import { SHOW_NOTIFICATION, showMessage, hideMessage } from '../actions/notificationActions';

export default (store) => (nextRunner) => (action) => {
  const { type, payload, meta } = action;
  const result = nextRunner(action);
  if (meta && meta.notification) {
    const { success, error } = meta.notification;
    if (success && meta[KEY.LIFECYCLE] === LIFECYCLE.SUCCESS) {
      store.dispatch(showMessage(success));
    } else if (error && meta[KEY.LIFECYCLE] === LIFECYCLE.FAILURE) {
      const { errorMessage } = payload.response ? payload.response.data : {};
      store.dispatch(showMessage(errorMessage || error, true));
    }
  } else if (type === SHOW_NOTIFICATION) {
    const { id } = payload;
    const hide = () => store.dispatch(hideMessage(id));
    setTimeout(hide, 4000);
  }
  return result;
};
