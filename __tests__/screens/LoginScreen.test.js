import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../../screens/LoginScreen'





it('renders correctly', () => {
  
  getOS = jest.fn().mockImplementationOnce(() => 'android');

  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});