import React from 'react';
import { configure, storiesOf } from '@storybook/react';
import interopRequireDefault from 'babel-runtime/helpers/interopRequireDefault';
import { ThemeProvider, defaultTheme } from 'evergreen-ui';
import theme from '../src/ui/theme';

function loadStories() {
  const context = require.context('../stories', true, /Story\.jsx$/);

  context.keys().forEach((srcFile) => {
    const Module = interopRequireDefault(context(srcFile));
    const defaultExport = Module.default || Module;
    const { name, stories } = defaultExport;
    const storyModule = storiesOf(name, module);
    stories.forEach(({ label, render: Component }) => {
      storyModule.add(label, () => (
        <ThemeProvider value={theme}>
          <Component />
        </ThemeProvider>
      ));
    });
  });
}

configure(loadStories, module);
