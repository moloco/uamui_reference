import React from 'react';

import InputRow from './ui/InputRow';
import TextRow from './ui/TextRow';
import Text from './ui/Text';
import ColumnRow from './ui/ColumnRow';
import Column from './ui/Column';
import Title from './ui/Title';

export const COMPONENT_MAP = {
  ColumnRow,
  Column,
  InputRow,
  TextRow,
  Text,
  Title,
};
export const defaultState = {
  getComponent: (name) => COMPONENT_MAP[name],
};
export const renderContext = React.createContext(defaultState);
