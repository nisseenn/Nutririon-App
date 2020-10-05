import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../screens/LoginScreen'





it('renders correctly', () => {
  
  jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'android', // or 'ios'
    select: () => null
}));

  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});