import React from 'react';
import Button from '../src/ui/Button';
import ButtonGroup from '../src/ui/ButtonGroup';
import Text from '../src/ui/Text';
import { SIZES } from '../src/ui/constants';

export default {
  name: 'ButtonGroup',
  stories: [
    {
      label: 'all buttons',
      render: () => (
        <React.Fragment>
          <div>
            <ButtonGroup>
              <Button>Default Button</Button>
              <Button>Default Button</Button>
              <Button>Default Button</Button>
            </ButtonGroup>
          </div>
          <div>
            <Text>Primary:</Text>
          </div>
          {Object.keys(SIZES).map((size) => (
            <ButtonGroup>
              <Button size={SIZES[size]} primary>{`${size}`}</Button>
              <Button size={SIZES[size]}>{`${size}`}</Button>
            </ButtonGroup>
          ))}
        </React.Fragment>
      ),
    },
  ],
};
