import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const propTypes = forbidExtraProps({});

const defaultProps = {};

function DetailContainer(props) {
  return <div>Content</div>;
}

DetailContainer.propTypes = propTypes;
DetailContainer.defaultProps = defaultProps;

export default DetailContainer;
