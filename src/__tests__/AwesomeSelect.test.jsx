import React from 'react';
import { shallow, mount } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

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
    let mountWrapper;
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
        mountWrapper = mount(<AwesomeSelect options={mockOptions} />);
        mountWrapper.find(Chip).simulate('click');
        paper = mountWrapper.find(Paper);
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

      describe('#Select All', () => {
        it('dispatches onChange with all option values', () => {
          const onChangeStub = jest.fn();
          const wrapper = mount(<AwesomeSelect options={mockOptions} onChange={onChangeStub} />);
          expect(onChangeStub).not.toBeCalled();
          wrapper.find(Chip).simulate('click');
          wrapper
            .find('#select_all_option')
            .find(FormControlLabel)
            .simulate('click', { target: { checked: true } });
          expect(onChangeStub).toBeCalledWith(mockOptions.map(({ value }) => value));
        });
      });

      describe('#Search', () => {
        it('filters the options by search input', () => {
          const input = paper.find(InputBase).find('input');
          expect(input.length).toEqual(1);
          input.simulate('change', { target: { value: 'o' } });
          mountWrapper.find(Chip).simulate('click');
          paper = mountWrapper.find(Paper);
          expect(
            paper
              .find(FormGroup)
              .find(FormControlLabel)
              .map((comp) => comp.prop('label')),
          ).toEqual(['Option A', 'Option B']);
        });

        describe('#Select All', () => {
          it('dispatches onChange with filtered option values', () => {
            const onChangeStub = jest.fn();
            const wrapper = mount(<AwesomeSelect options={mockOptions} onChange={onChangeStub} />);
            wrapper.find(Chip).simulate('click');
            const input = wrapper
              .find(Paper)
              .find(InputBase)
              .find('input');
            input.simulate('change', { target: { value: 'o' } });
            wrapper
              .find('#select_all_option')
              .find(FormControlLabel)
              .simulate('click', { target: { checked: true } });
            expect(onChangeStub).toBeCalledWith(['A', 'B']);
          });
        });
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
