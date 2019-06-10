import uuid from 'uuid/v1';

export const SHOW_NOTIFICATION = 'notification/SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'notification/HIDE_NOTIFICATION';

export function showMessage(message, warning = false) {
  return {
    type: SHOW_NOTIFICATION,
    payload: { id: uuid(), message, warning },
  };
}

export function hideMessage(id) {
  return {
    type: HIDE_NOTIFICATION,
    payload: { id },
  };
}
