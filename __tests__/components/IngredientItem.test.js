import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import IngredientItem from "../../components/IngredientItem"

it('renders the component', () => {

    const tree = renderer.create(<IngredientItem />);
    expect(tree).toMatchSnapshot();
});
