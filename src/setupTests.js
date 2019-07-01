import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.afterEach(() => {
  console.error.mockClear();
});

global.beforeEach(() => {
  // eslint-disable-next-line no-undef
  jest.spyOn(global.console, 'error').mockImplementation((e) => {
    throw new Error(e);
  });
});
