import React from 'react';
import {shallow} from 'enzyme';

import Alert from '../../components/Alert/alert.component';

describe('alert', () => {
    const close = jest.fn()
    const alert = shallow(<Alert message='error' onClose={close} success={true}/>)
    
    it('renders correctly', () => {
        expect(alert).toMatchSnapshot()
    })

    it('shows message', () => {
        expect(alert.find('span').at(0).text()).toEqual('error')
    })

    describe('close button', () => {
        const button = alert.find('.close-button')
        button.simulate('click')
        it('calls onClose function on click', () => {
            expect(close).toHaveBeenCalled()
        })
    })
})