import React from 'react';
import Button from '../src/ui/Button';
import Text from '../src/ui/Text';
import { SIZES } from '../src/ui/constants';

export default {
  name: 'Button',
  stories: [
    {
      label: 'all buttons',
      render: () => (
        <React.Fragment>
          <div>
            <Button>Default Button</Button>
          </div>
          {Object.keys(SIZES).map((size) => (
            <Button size={SIZES[size]}>{`${size}`}</Button>
          ))}
          <div>
            <Text>Primary:</Text>
          </div>
          {Object.keys(SIZES).map((size) => (
            <Button size={SIZES[size]} primary>{`${size}`}</Button>
          ))}
          <div>
            <Text>Disabled:</Text>
          </div>
          {Object.keys(SIZES).map((size) => (
            <Button size={SIZES[size]} disabled>{`${size}`}</Button>
          ))}
        </React.Fragment>
      ),
    },
  ],
};
