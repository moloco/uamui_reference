import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actions/notificationActions';

const initState = {
  messages: {},
  ids: [],
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_NOTIFICATION: {
      const { id, message, warning } = payload;
      return {
        ...state,
        messages: {
          ...state.messages,
          [id]: { id, message, warning, showMessage: true },
        },
        ids: [id, ...state.ids],
      };
    }
    case HIDE_NOTIFICATION: {
      const { id } = payload;

      return id
        ? {
            ...state,
            messages: {
              ...state.messages,
              [id]: { showMessage: false },
            },
          }
        : initState;
    }
    default:
      return state;
  }
};
