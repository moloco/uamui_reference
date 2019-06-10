import React from 'react';
import PropTypes from 'prop-types';
import { majorScale } from 'evergreen-ui';

import Spacing from './Spacing';
import Button from './Button';

const propTypes = {
  children: PropTypes.instanceOf(Button).isRequired,
  large: PropTypes.bool,
};

const defaultProps = {
  large: false,
};

function ButtonGroup({ children, large }) {
  const { length } = React.Children.toArray(children);

  return (
    <Spacing spacing={2}>
      {React.Children.map(children, (child, index) => {
        const marginRight = index < length - 1 ? majorScale(1) : 0;

        return React.cloneElement(child, {
          marginRight,
          ...(large && { size: 'lg' }),
        });
      })}
    </Spacing>
  );
}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
