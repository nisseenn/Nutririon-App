import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import GenderScreen from '../../screens/GenderScreen'

//Icon results in error, mock it out
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    MaterialIcons: View,
    Ionicons: View,
  };
});


it('GenderScreen renders correctly', () => {

  const tree = renderer.create(<GenderScreen />);
  expect(tree).toMatchSnapshot();
});



// Pass wihtout error