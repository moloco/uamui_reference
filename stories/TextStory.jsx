import React from 'react';
import Text from '../src/ui/Text';
import { SIZES } from '../src/ui/constants';

export default {
  name: 'Text',
  stories: [
    {
      label: 'all texts',
      render: () => (
        <React.Fragment>
          <div>
            <Text>Default text:</Text>
          </div>
          {Object.keys(SIZES).map((size) => (
            <Text key={`normal_${size}`} size={SIZES[size]}>{`${size}`}</Text>
          ))}
          <div>
            <Text bold>Bold text:</Text>
          </div>
          {Object.keys(SIZES).map((size) => (
            <Text key={`bold_${size}`} size={SIZES[size]} bold>{`${size}`}</Text>
          ))}
          <div>
            <Text bold>Light text:</Text>
          </div>
          {Object.keys(SIZES).map((size) => (
            <Text key={`light_${size}`} size={SIZES[size]} light>{`${size}`}</Text>
          ))}
          <div>
            <Text bold>Light intl. text:</Text>
          </div>
          {Object.keys(SIZES).map((size) => (
            <Text key={`light_${size}`} size={SIZES[size]} light>{`한글 ${size}`}</Text>
          ))}
        </React.Fragment>
      ),
    },
  ],
};
