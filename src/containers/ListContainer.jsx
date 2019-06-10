import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { useDispatch, useSelector } from 'react-redux';

import createActions from '../api-redux-pack/createActions';
import createSelectors from '../api-redux-pack/createSelectors';
import { resources } from '../metadata';

import ListView from '../components/ListView';

const propTypes = forbidExtraProps({
  resource: PropTypes.oneOf(Object.keys(resources)),
});

const defaultProps = {
  resource: 'base',
};

function ListContainer({ resource }) {
  const dispatch = useDispatch();
  const fetch = useMemo(() => {
    const { apiResource } = resources[resource];
    const { collection } = createActions(apiResource);
    return () =>
      dispatch(
        collection(
          {},
          {
            notification: {
              error: 'Something went wrong',
            },
          },
        ),
      );
  }, [resource]);
  const { collectionSelector, collectionLoadingStateSelector } = useMemo(
    () => createSelectors(resource),
    [resource],
  );
  const isLoading = useSelector(collectionLoadingStateSelector);
  const collection = useSelector(collectionSelector);

  useEffect(() => {
    fetch();
    setTimeout(fetch, 1000);
    setTimeout(fetch, 1500);
    setTimeout(fetch, 2000);
  }, []);

  return <ListView resource={resource} collection={collection} isLoading={isLoading} />;
}

ListContainer.propTypes = propTypes;
ListContainer.defaultProps = defaultProps;

export default ListContainer;
