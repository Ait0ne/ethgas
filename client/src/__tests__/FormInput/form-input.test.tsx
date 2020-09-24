import React from 'react';
import {shallow} from 'enzyme';
import FormInput from '../../components/FormInput/form-input.component';


describe('formInput', () => {
    const onChange = jest.fn()
    const formInput:any = shallow(<FormInput handleChange={onChange} label='email'/>)

    it('renders correctly', () => {
        expect(formInput).toMatchSnapshot()
    } )

    it('calls change function when typed in', () => {
        const input = formInput.find('input')
        input.simulate('change', {target: {value: 'abc'}})

        formInput.update()
        expect(onChange).toHaveBeenCalledWith({target: {value: 'abc'}})
    })

})
