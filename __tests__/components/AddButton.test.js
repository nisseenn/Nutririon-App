import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import AddButton from "../../components/AddButton"

it('renders the component', () => {

    const tree = renderer.create(<AddButton />);
    expect(tree).toMatchSnapshot();
});
