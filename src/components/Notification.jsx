import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Alert from '../ui/Alert';

const propTypes = {
  warning: PropTypes.bool,
  message: PropTypes.string,
};

const defaultProps = {
  warning: false,
};

function Notification({ message, warning }) {
  return <Alert title={message} error={warning} />;
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default Notification;
