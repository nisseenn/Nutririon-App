import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import ListButton from "../../components/ListButton"

describe('ListButton', ()=>{
    it('renders the component', () => {

        const tree = renderer.create(<ListButton />);
        expect(tree).toMatchSnapshot();
    });
});