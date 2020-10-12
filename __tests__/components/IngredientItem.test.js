import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import "../setup/setupEnzyme"


import IngredientItem from "../../components/IngredientItem"

describe('<IngredientItem />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<IngredientItem />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
