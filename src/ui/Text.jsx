import React from 'react';
import PropTypes from 'prop-types';
import { Text as UIText, Heading as UIHeading } from 'evergreen-ui';

import { SIZES, SIZE_TO_TEXT_SIZE } from './constants';

const propTypes = {
  size: PropTypes.oneOf(Object.values(SIZES)),
  bold: PropTypes.bool,
  light: PropTypes.bool,
  children: PropTypes.string.isRequired,
  primary: PropTypes.bool,
};

const defaultProps = {
  bold: false,
  light: false,
  size: SIZES.MEDIUM,
  primary: false,
};

function Text({ bold, size, children, light, primary }) {
  const textSize = SIZE_TO_TEXT_SIZE[size];
  const props = {
    size: textSize,
    fontWeight: 400,
    ...(light && { fontWeight: 200 }),
    ...(bold && { fontWeight: 600 }),
    ...(primary && { color: '#1070CA' }),
  };
  const Component = textSize > 600 ? UIHeading : UIText;

  return (
    <Component is={bold ? 'strong' : 'span'} {...props}>
      {children}
    </Component>
  );
}

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
