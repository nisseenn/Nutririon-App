import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Carousel from "../../components/Carousel"


//Mock Icon causing rendering error
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    MaterialIcons: View,
    Ionicons: View,
    FontAwesome: View,
    FontAwesome5: View,
    Feather: View,
  };
});

describe('Carousel', () => {
  it('renders the component', () => {

      const tree = renderer.create(<Carousel />);
      expect(tree).toMatchSnapshot();
  });

});
