import React from 'react';
import {mount} from 'enzyme';

import CancelationForm from '../../components/CancelationForm/cancelation-form.component';
import {CustomButton} from '../../components/NotificationForm/notification-form.styles';

describe('cancelation form', () => {
    const toggleAlert = jest.fn()
    const cancelationForm = mount(<CancelationForm toggleAlert={toggleAlert}/>)


    it('renders correctly', () =>{
        expect(cancelationForm).toMatchSnapshot()
    })

    it('renders one input', () => {
        expect(cancelationForm.find('FormInput').length).toEqual(1)
    })

    it('renders one button', () => {
        expect(cancelationForm.find(CustomButton).length).toEqual(1)
    })


    
    global.fetch = jest.fn(():any =>
    Promise.resolve({
      json: () => Promise.resolve({ ok:true }),
    })
    );

    it('calls fetch on form submit', () => {
        const button =cancelationForm.find(CustomButton)
        button.simulate('submit')

        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('calls toggle alert function with correct values ', () => {
        expect(toggleAlert).toHaveBeenCalledWith("You successfully unsubscribed", true)
    })

}
)