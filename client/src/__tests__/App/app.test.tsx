import React from 'react';
import {shallow} from 'enzyme';

import App from '../../App';

describe('app', () => {
    const app = shallow(<App/>)

    it('renders correctly', ()=> {
        expect(app).toMatchSnapshot()
    })

    it('renders notification form', () => {
        expect(app.find('NotificationForm').length).toEqual(1)
    })


    it('renders unsubsribtion text', () => {
        expect(app.find('span').text()).toEqual('Want to cancel subscription?')
    })

    it('shows cancelation form on unsubscription click', () => {
        const unsubscription = app.find('span')
        unsubscription.simulate('click')
        expect(app.find('CancelationForm').length).toEqual(1)
    })

    it('renders subsribtion text', () => {
        expect(app.find('span').text()).toEqual('Want to subscribe?')
    })

    it('doesnt show an alert', () => {
        expect(app.find('Alert').length).toEqual(0)
    })
})