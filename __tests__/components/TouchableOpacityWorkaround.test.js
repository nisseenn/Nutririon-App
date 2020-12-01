import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import TouchableWorkaround from '../../components/TouchableOpacityWorkaround'

describe('TouchableWorkaround', ()=>{
    it('renders the component', () => {

        const tree = renderer.create(<TouchableWorkaround />);
        expect(tree).toMatchSnapshot();
    });
});