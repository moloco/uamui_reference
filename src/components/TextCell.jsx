import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { Table } from 'evergreen-ui';

import Text from '../ui/Text';

const propTypes = forbidExtraProps({
  value: PropTypes.string.isRequired,
});

function TextCell({ value }) {
  return (
    <Table.TextCell>
      <Text size="sm">{value}</Text>
    </Table.TextCell>
  );
}

TextCell.propTypes = propTypes;

export default TextCell;
