import React, { useState } from 'react';

import {FormContainer, CustomButton} from '../NotificationForm/notification-form.styles';
import FormInput from '../FormInput/form-input.component';
import {API_URL} from '../../config';

interface CancelationProps {
    toggleAlert: (message:string, success:boolean) => void
}


const CancelationForm: React.FC<CancelationProps> = ({toggleAlert}) => {
    const [email, setEmail] = useState('')
    
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        fetch(`${API_URL}delete`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                toggleAlert('You successfully unsubscribed', true)
            } else {
                toggleAlert('There was an unexpected error', false)
            }
        })
        .catch(err => {
            toggleAlert('There was an unexpected error', false)
        })
        .finally(() => {
            setEmail('')
        })
    }

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormInput
            value={email}
            name='email'
            type='email'
            handleChange={handleEmailChange}
            label='Email'
            />
            <CustomButton 
            variant='contained'
            type='submit'
            >
                Unsubscribe
            </CustomButton>
        </FormContainer>
    )
}

export default CancelationForm;
