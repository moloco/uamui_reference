import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { Table } from 'evergreen-ui';

import Text from '../ui/Text';

const propTypes = forbidExtraProps({
  label: PropTypes.string,
});

function TextHeaderCell({ label }) {
  return (
    <Table.HeaderCell>
      {label && (
        <Text size="sm" bold>
          {label}
        </Text>
      )}
    </Table.HeaderCell>
  );
}

TextHeaderCell.propTypes = propTypes;

export default TextHeaderCell;
