import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Input from "../../components/Input"

describe('Input', ()=>{
    it('renders the component', () => {

        const tree = renderer.create(<Input />);
        expect(tree).toMatchSnapshot();
    });
});