import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const propTypes = forbidExtraProps({});

const defaultProps = {};

function InputRow(props) {
  return <div>Content</div>;
}

InputRow.propTypes = propTypes;
InputRow.defaultProps = defaultProps;

export default InputRow;
