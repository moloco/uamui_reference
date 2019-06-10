import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

import { renderContext, defaultState } from './renderConstants';

import RenderComponent from './RenderComponent';

const propTypes = forbidExtraProps({
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
});

const defaultProps = {};

function Renderer({ components }) {
  return (
    <renderContext.Provider value={defaultState}>
      {components.map((props, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <RenderComponent key={`comp_${index}`} {...props} />
      ))}
    </renderContext.Provider>
  );
}

Renderer.propTypes = propTypes;
Renderer.defaultProps = defaultProps;

export default Renderer;
