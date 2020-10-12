import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import "../setup/setupEnzyme"


import Navigation from "../../Navigation/MainNavigation"


describe('<Navigation />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      
      const getOS = jest.fn().mockImplementationOnce(() => 'android');

      
      const wrapper = shallow(<Navigation />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
