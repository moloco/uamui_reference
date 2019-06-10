import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles, css, withStylesPropTypes } from '../withStyles';
import Notification from '../components/Notification';

const notificationSelector = createSelector(
  [(store) => store.notification],
  (notification) => notification,
);

function NotificationContainer({ styles }) {
  const { messages, ids } = useSelector(notificationSelector);
  const notifications = ids.map((id) => messages[id]).filter(({ showMessage }) => showMessage);
  return (
    notifications.length > 0 && (
      <div {...css(styles.container)}>
        {notifications.map(({ id, message, warning }) => (
          <Notification key={id} message={message} warning={warning} />
        ))}
      </div>
    )
  );
}

NotificationContainer.propTypes = {
  ...withStylesPropTypes,
};

export default withStyles(({ unit }) => ({
  container: {
    position: 'absolute',
    bottom: 0,
    right: unit,
    zIndex: 99,
  },
}))(NotificationContainer);
