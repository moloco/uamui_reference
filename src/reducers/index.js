import createReducers from '../api-redux-pack/createReducers';
import notification from './notificationReducer';
import { resources } from '../metadata';

const resourceReducers = createReducers(...Object.keys(resources));

export default {
  ...resourceReducers,
  notification,
};
