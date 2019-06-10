import React from 'react';
import { Pane } from 'evergreen-ui';
import Spacing from '../src/ui/Spacing';
import Text from '../src/ui/Text';

export default {
  name: 'Spacing',
  stories: [
    {
      label: 'spacing',
      render: () =>
        Array(8)
          .fill('')
          .map((_, size) => (
            <React.Fragment>
              <Text>{`Size ${size + 1}`}</Text>
              <Pane border marginBottom={10}>
                <Spacing spacing={size + 1}>
                  <Pane background="tint2" height={100} />
                </Spacing>
              </Pane>
            </React.Fragment>
          )),
    },
    {
      label: 'other props',
      render: () => (
        <React.Fragment>
          <Text>top 2</Text>
          <Pane border marginBottom={10}>
            <Spacing top={2}>
              <Pane background="tint2" height={100} />
            </Spacing>
          </Pane>

          <Text>bottom 2</Text>
          <Pane border marginBottom={10}>
            <Spacing bottom={2}>
              <Pane background="tint2" height={100} />
            </Spacing>
          </Pane>

          <Text>left 2</Text>
          <Pane border marginBottom={10}>
            <Spacing left={2}>
              <Pane background="tint2" height={100} />
            </Spacing>
          </Pane>

          <Text>right 2</Text>
          <Pane border marginBottom={10}>
            <Spacing right={2}>
              <Pane background="tint2" height={100} />
            </Spacing>
          </Pane>

          <Text>horizontal 2</Text>
          <Pane border marginBottom={10}>
            <Spacing horizontal={2}>
              <Pane background="tint2" height={100} />
            </Spacing>
          </Pane>

          <Text>vertical 2</Text>
          <Pane border marginBottom={10}>
            <Spacing vertical={2}>
              <Pane background="tint2" height={100} />
            </Spacing>
          </Pane>
        </React.Fragment>
      ),
    },
  ],
};
