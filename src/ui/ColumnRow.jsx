import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

import { Pane } from 'evergreen-ui';

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
});

const defaultProps = {};

function ColumnRow({ children }) {
  return <Pane display="flex">{children}</Pane>;
}

ColumnRow.propTypes = propTypes;
ColumnRow.defaultProps = defaultProps;

export default ColumnRow;
