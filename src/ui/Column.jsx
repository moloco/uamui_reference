import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

import { Pane } from 'evergreen-ui';

const propTypes = forbidExtraProps({
  flex: PropTypes.number,
  children: PropTypes.node.isRequired,
});

const defaultProps = {
  flex: 1,
};

function ColumnRow({ children, flex }) {
  return <Pane flex={flex}>{children}</Pane>;
}

ColumnRow.propTypes = propTypes;
ColumnRow.defaultProps = defaultProps;

export default ColumnRow;
