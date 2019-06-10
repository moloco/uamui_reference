import React from 'react';
import PropTypes from 'prop-types';
import { Button as UIButton, withTheme } from 'evergreen-ui';
import { SIZES, SIZE_TO_HEIGHT } from './constants';

const propTypes = {
  elevation: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 0]),
  size: PropTypes.oneOf(Object.values(SIZES)),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  children: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

const defaultProps = {
  elevation: 1,
  size: SIZES.MEDIUM,
  primary: false,
  fullWidth: false,
  disabled: false,
};

function Button({
  size,
  children,
  disabled,
  fullWidth,
  theme,
  primary,
  elevation,
  ...buttonProps
}) {
  const elevationStyle = theme.getElevation(elevation);

  return (
    <UIButton
      {...fullWidth && { width: '100%' }}
      {...primary && { appearance: 'primary' }}
      disabled={disabled}
      boxShadow={elevationStyle}
      height={SIZE_TO_HEIGHT[size]}
      alignItems="center"
      {...buttonProps}
    >
      {children}
    </UIButton>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default withTheme(Button);
