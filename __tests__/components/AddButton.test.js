import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import "../setup/setupEnzyme"


import AddButton from "../../components/AddButton"

describe('<AddButton />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<AddButton />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});

