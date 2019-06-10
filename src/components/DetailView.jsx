import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

import { Card, Heading } from 'evergreen-ui';
import ColumnRow from '../ui/ColumnRow';
import Column from '../ui/Column';
import TextRow from '../ui/TextRow';
import Button from '../ui/Button';
import ButtonGroup from '../ui/ButtonGroup';

import { resources } from '../metadata';
import Renderer from '../Renderer';

const propTypes = forbidExtraProps({
  resource: PropTypes.oneOf(Object.keys(resources)),
  entity: PropTypes.object,
});

const defaultProps = {
  resource: 'base',
  entity: {},
};

const { fields: baseFields, detail: baseLayout } = resources.base;

function DetailView({ resource, entity }) {
  const components = useMemo(() => {
    const { detail, fields = {} } = resources[resource] || {};
    const { layout = [] } = detail || baseLayout || {};

    return layout
      .map((row) =>
        row.map((name) => ({
          type: 'text',
          name,
          ...baseFields[name],
          ...fields[name],
        })),
      )
      .map((row) =>
        row.map((field) => ({
          ...field,
          ...baseFields.types[field.type],
          ...(fields.types && fields.types[field.type]),
        })),
      )
      .map((row) => ({
        type: 'ColumnRow',
        components: row.map(({ name, label, componentMap }) => ({
          type: 'Column',
          components: [
            {
              id: `${resource}_${name}`,
              type: componentMap.detail,
              label,
              title: entity[name],
            },
          ],
        })),
      }));
  }, [resource]);

  return (
    <React.Fragment>
      <Heading size={700}>Products</Heading>
      <br />
      <Card elevation={2} background="white" border="default">
        <Renderer components={components} />
        <ButtonGroup large>
          <Button primary>Apply</Button>
          <Button secondary>Cancel</Button>
        </ButtonGroup>
      </Card>
      <br />
    </React.Fragment>
  );
}

DetailView.propTypes = propTypes;
DetailView.defaultProps = defaultProps;

export default DetailView;
