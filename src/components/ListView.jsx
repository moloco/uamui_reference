import React, { useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { Card, Table, Pane, Tab, Spinner } from 'evergreen-ui';

import { resources } from '../metadata';
import Text from '../ui/Text';
import Spacing from '../ui/Spacing';
import TextCell from './TextCell';
import TextHeaderCell from './TextHeaderCell';

const propTypes = forbidExtraProps({
  resource: PropTypes.oneOf(Object.keys(resources)),
  collection: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
});

const defaultProps = {
  resource: 'base',
  collection: [],
  isLoading: false,
};

const BODY_COMPONENT_MAP = {
  TextCell,
};
const HEAD_COMPONENT_MAP = {
  TextCell: TextHeaderCell,
};

const { fields: baseFields, list: baseList } = resources.base;

function ListView({ collection, isLoading, resource }) {
  const layouts = useMemo(() => {
    const { list, fields = {} } = resources[resource] || {};
    const { layout = [] } = list || baseList || {};
    return layout
      .map((name) => ({
        type: 'text',
        name,
        ...baseFields[name],
        ...fields[name],
      }))
      .map((field) => ({
        ...field,
        ...baseFields.types[field.type],
        ...(fields.types && fields.types[field.type]),
      }));
  }, [resource]);
  return (
    <React.Fragment>
      <Card elevation={2} background="white" border="default">
        <Spacing spacing={2}>
          <Text>Filter</Text>
        </Spacing>
        <Table>
          <Table.Head height={48}>
            {layouts.map(({ name, label, componentMap }) => {
              const Component = HEAD_COMPONENT_MAP[componentMap.list];
              return <Component key={`${resource}_${name}`} label={label} />;
            })}
          </Table.Head>
          {collection.length > 0 && (
            <Table.Body>
              {collection.map(({ id, ...values }) => (
                <Table.Row key={id} isSelectable>
                  {layouts.map(({ name, componentMap }) => {
                    const Component = BODY_COMPONENT_MAP[componentMap.list];
                    return <Component key={`${resource}_${id}`} value={values[name]} />;
                  })}
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table>

        <Spacing spacing={2}>
          {isLoading && <Spinner size={24} />}
          {!isLoading && collection.length === 0 && <Text>There's no records.</Text>}
        </Spacing>
      </Card>
      <Pane marginTop={16} display="flex" justifyContent="center">
        {Array(10)
          .fill('')
          .map((_, index) => (
            <Tab size={500} is="a" href="#" key={`pagination_${index}`} isSelected={index === 0}>
              {index + 1}
            </Tab>
          ))}
      </Pane>
    </React.Fragment>
  );
}

ListView.propTypes = propTypes;
ListView.defaultProps = defaultProps;

export default ListView;
