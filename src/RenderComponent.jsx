import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

import { renderContext } from './renderConstants';

const propTypes = forbidExtraProps({
  type: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.object),
});

const defaultProps = {
  components: null,
};

function RenderComponent({ type, components, ...otherProps }) {
  const { getComponent } = useContext(renderContext);
  const Component = getComponent(type);
  return (
    <Component
      {...otherProps}
      {...components && { children: components.map((props) => <RenderComponent {...props} />) }}
    />
  );
}

RenderComponent.propTypes = propTypes;
RenderComponent.defaultProps = defaultProps;

export default RenderComponent;
