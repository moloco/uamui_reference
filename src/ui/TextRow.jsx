import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

import { Paragraph } from 'evergreen-ui';

import Spacing from './Spacing';
import Text from './Text';

const propTypes = forbidExtraProps({
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
});

const defaultProps = {
  label: '',
  subtitle: '',
};

function TextRow({ label, title, subtitle }) {
  return (
    <Spacing spacing={2}>
      {label && <Text size="sm">{label}</Text>}
      <Paragraph>
        <Text bold size="lg">
          {title}
        </Text>
      </Paragraph>
      <Paragraph>
        <Text light>{subtitle}</Text>
      </Paragraph>
    </Spacing>
  );
}

TextRow.propTypes = propTypes;
TextRow.defaultProps = defaultProps;

export default TextRow;
