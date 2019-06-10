import React from 'react';
import PropTypes from 'prop-types';
import { Alert as UIAlert, majorScale } from 'evergreen-ui';

const propTypes = {
  info: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

const defaultProps = {
  info: true,
  success: false,
  warning: false,
  error: false,
};

function Alert({ info, success, warning, error, title, subtitle }) {
  const props = {
    appearance: 'card',
    title,
    marginBottom: majorScale(2),
    ...(subtitle && { children: subtitle }),
    ...(info && { intent: 'none' }),
    ...(success && { intent: 'success' }),
    ...(warning && { intent: 'warning' }),
    ...(error && { intent: 'danger' }),
  };
  return <UIAlert {...props} />;
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
