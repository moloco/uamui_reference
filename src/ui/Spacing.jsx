import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Pane as UIPane, majorScale } from 'evergreen-ui';

const SPACING_PROPS = {
  spacing: 'margin',
  top: 'marginTop',
  bottom: 'marginBottom',
  left: 'marginLeft',
  right: 'marginRight',
  horizontal: 'marginX',
  vertical: 'marginY',
};

const propTypes = {
  children: PropTypes.node.isRequired,
  ...Object.fromEntries(Object.keys(SPACING_PROPS).map((key) => [key, PropTypes.number])),
};

function Spacing({ children, ...spacingProps }) {
  const props = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(spacingProps).map(([key, value]) => [SPACING_PROPS[key], majorScale(value)]),
      ),
    Object.values(spacingProps),
  );

  return <UIPane {...props}>{children}</UIPane>;
}

Spacing.propTypes = propTypes;

export default Spacing;
