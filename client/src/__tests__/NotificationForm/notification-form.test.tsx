import React from 'react';
import {mount} from 'enzyme';

import NotificationForm from '../../components/NotificationForm/notification-form.component';
import { CustomSelect, CustomButton } from '../../components/NotificationForm/notification-form.styles';



describe('notificationForm', () => {
    const toggleAlert = jest.fn()
    const notificationForm = mount(<NotificationForm toggleAlert={toggleAlert}/>)


    it('renders correctly', () => {
        expect(notificationForm).toMatchSnapshot()
    })

    it('renders 2 inputs', () => {
        expect(notificationForm.find('FormInput').length).toEqual(2)
    })

    it('renders select field', () => {
        expect(notificationForm.find(CustomSelect).length).toEqual(1)
    })

    it('renders a button', () => {
        expect(notificationForm.find(CustomButton).length).toEqual(1)
    })


    global.fetch = jest.fn(():any =>
    Promise.resolve({
      json: () => Promise.resolve({ user: { } }),
    })
    );

    it('calls fetch on form submit', () => {
        const button = notificationForm.find(CustomButton)
        button.simulate('submit')

        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('calls toggle alert function with correct values ', () => {
        expect(toggleAlert).toHaveBeenCalledWith("You successfully subscribed", true)
    })
})