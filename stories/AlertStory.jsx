import React from 'react';
import Alert from '../src/ui/Alert';

export default {
  name: 'Alert',
  stories: [
    {
      label: 'default(info)',
      render: () => <Alert title="There are over 200 integrations available." />,
    },
    {
      label: 'success',
      render: () => <Alert title="The record has been successfully created." success />,
    },
    {
      label: 'warning',
      render: () => <Alert title="This might be a problem." warning />,
    },
    {
      label: 'error',
      render: () => (
        <React.Fragment>
          <Alert title="Something went wrong" error />
          <Alert title="Something went wrong" subtitle="Please retry again" error />
        </React.Fragment>
      ),
    },
  ],
};
