import React from 'react';
import PropTypes from 'prop-types';
import { Heading as UIHeading } from 'evergreen-ui';

const propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.string.isRequired,
};

const defaultProps = {
  level: 3,
};

const TEXT_SIZES = [800, 700, 600, 500, 400, 300];
const ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

function Title({ level, children }) {
  const textSize = TEXT_SIZES[level - 1];

  return (
    <UIHeading is={ELEMENTS[level - 1]} size={textSize}>
      {children}
    </UIHeading>
  );
}

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
