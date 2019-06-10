import React from 'react';
import Renderer from '../src/Renderer';

export default {
  name: 'Renderer',
  stories: [
    {
      label: 'default',
      render: () => (
        <Renderer
          components={[
            {
              type: 'Title',
              children: 'Product',
              level: 1,
            },
            {
              type: 'ColumnRow',
              components: [
                {
                  type: 'Column',
                  components: [
                    {
                      type: 'TextRow',
                      label: 'name',
                      title: 'Column1',
                    }
                  ],
                },
                {
                  type: 'Column',
                  components: [
                    {
                      type: 'TextRow',
                      label: 'name',
                      title: 'Column2',
                    }
                  ],
                }
              ],
            },
          ]}
        />
      ),
    },
  ],
};
