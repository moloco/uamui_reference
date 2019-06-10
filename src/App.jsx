import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import PageLayout from './components/PageLayout';
import ListContainer from './containers/ListContainer';
import NotificationContainer from './containers/NotificationContainer';
import DetailView from './components/DetailView';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <NotificationContainer />
        <PageLayout>
          <DetailView />
          <br />
          <ListContainer resource="advertisers" />
        </PageLayout>
      </Provider>
    );
  }
}

export default App;
