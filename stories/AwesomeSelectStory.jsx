import React from 'react';
import faker from 'faker';

import AwesomeSelect from '../src/ui/AwesomeSelect';

const options = [
  {
    label: 'AFG - Afghanistan',
    value: 'AFG',
  },
  {
    label: 'ALB - Albania',
    value: 'ALB',
  },
  {
    label: 'ASM - American Samoa',
    value: 'ASM',
  },
  {
    label: 'CAD - Canada',
    value: 'CAD',
  },
  {
    label: 'DOR - Dominican Republic',
    value: 'DOR',
  },
  {
    label: 'FIN - Finland',
    value: 'FIN',
  },
  {
    label: 'GEO - Georgia',
    value: 'GEO',
  },
  {
    label: 'GER - Germany',
    value: 'GER',
  },
  {
    label: 'IND - India',
    value: 'IND',
  },
  {
    label: 'KOR - South Korea',
    value: 'KOR',
  },
  {
    label: 'USA - Unite States',
    value: 'USA',
  },
];

const bigOptions = Array(2000)
  .fill('')
  .map((_, index) => ({
    label: faker.name.findName(),
    value: `${index}`,
  }));

const unsortedOptions = [...options.slice(5), ...options.slice(0, 5)];

export default {
  name: 'AwesomeSelect',
  stories: [
    {
      label: 'default',
      render: () => <AwesomeSelect options={options} />,
    },
    {
      label: 'label & placeholder',
      render: () => (
        <AwesomeSelect options={options} label="Countries" placeholder="Select countries..." />
      ),
    },
    {
      label: 'with initial value',
      render: () => (
        <AwesomeSelect
          options={options}
          label="Countries"
          max={5}
          placeholder="Select countries..."
          value={['AFG', 'DOR']}
        />
      ),
    },
    {
      label: 'with unsorted options',
      render: () => <AwesomeSelect options={unsortedOptions} />,
    },
    {
      label: 'max(5)',
      render: () => (
        <AwesomeSelect
          options={options}
          label="Countries"
          max={5}
          placeholder="Select countries..."
        />
      ),
    },
    {
      label: 'max(unlimited)',
      render: () => (
        <AwesomeSelect
          options={options}
          label="Countries"
          max={0}
          placeholder="Select countries..."
        />
      ),
    },
    {
      label: 'hideCatalog',
      render: () => (
        <AwesomeSelect
          options={options}
          label="Countries"
          placeholder="Select countries..."
          hideCatalog
        />
      ),
    },
    {
      label: 'disableCatalog',
      render: () => (
        <AwesomeSelect
          options={options}
          label="Countries"
          placeholder="Select countries..."
          disableCatalog
        />
      ),
    },
    {
      label: 'Big size',
      render: () => (
        <AwesomeSelect options={bigOptions} label="Users" max={5} placeholder="Select users..." />
      ),
    },
  ],
};
