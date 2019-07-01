import React from 'react';
import { shallow, mount } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import AwesomeSelect from '../ui/AwesomeSelect';

const getWrapper = (props) => shallow(<AwesomeSelect {...props} />).dive(); // dive for Downshift

describe('<AwesomeSelect>', () => {
  it('renders without crashing', () => {
    expect(() => {
      getWrapper();
    }).not.toThrow();
  });

  describe('#render', () => {
    describe('TextField', () => {
      it('renders TextField without dropdown Paper option', () => {
        const wrapper = getWrapper();
        expect(wrapper.find(TextField)).toHaveLength(1);
        expect(wrapper.find(Paper)).toHaveLength(0);
      });
    });
  });

  describe('on mount', () => {
    describe('Chip for adding options', () => {
      it('renders Chip component that controls the Paper dropdown', () => {
        const wrapper = mount(<AwesomeSelect />);
        const chipButton = wrapper.find(Chip);
        expect(chipButton).toHaveLength(1);
        expect(chipButton.key()).toEqual('add_option_button');
        expect(wrapper.find(Paper)).toHaveLength(0);
        chipButton.simulate('click');
        expect(wrapper.find(Paper)).toHaveLength(1);
      });
    });

    describe('Paper for dropdown option', () => {
      const mockOptions = [
        {
          label: 'Any',
          value: 'any',
        },
        {
          label: 'Option A',
          value: 'A',
        },
        {
          label: 'Option B',
          value: 'B',
        },
      ];
      let paper;

      beforeEach(() => {
        const wrapper = mount(<AwesomeSelect options={mockOptions} />);
        wrapper.find(Chip).simulate('click');
        paper = wrapper.find(Paper);
      });

      it('renders suggestion list by its label', () => {
        expect(paper.find(FormGroup).find(FormControlLabel)).toHaveLength(mockOptions.length);
        expect(
          paper
            .find(FormGroup)
            .find(FormControlLabel)
            .map((comp) => comp.prop('label')),
        ).toEqual(mockOptions.map(({ label }) => label));
      });

      it('renders catalog buttons ', () => {
        expect(paper.find('#catalog_buttons').find(Button)).toHaveLength(26);
      });
    });

    describe('with unsorted options', () => {
      const unsortedOptions = [
        {
          label: 'Option A',
          value: 'A',
        },
        {
          label: 'Option B',
          value: 'B',
        },
        {
          label: 'Any',
          value: 'any',
        },
      ];
      let paper;

      beforeEach(() => {
        const wrapper = mount(<AwesomeSelect options={unsortedOptions} />);
        wrapper.find(Chip).simulate('click');
        paper = wrapper.find(Paper);
      });

      it('renders suggestion list by alphabetical order', () => {
        const sortOptions = [unsortedOptions[2], unsortedOptions[0], unsortedOptions[1]];
        expect(paper.find(FormGroup).find(FormControlLabel)).toHaveLength(unsortedOptions.length);
        expect(
          paper
            .find(FormGroup)
            .find(FormControlLabel)
            .map((comp) => comp.prop('label')),
        ).toEqual(sortOptions.map(({ label }) => label));
      });
    });
  });
});
