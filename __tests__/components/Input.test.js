import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import "../setup/setupEnzyme"


import Input from "../../components/Input"

describe('<Input />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Input />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
