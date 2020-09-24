import React, {useState} from 'react';
import {MenuItem} from '@material-ui/core'

import {FormContainer, CustomSelect, CustomButton} from './notification-form.styles';
import FormInput from '../FormInput/form-input.component';
import {API_URL} from '../../config'

export type PriceTypes = 'fast'|'fastest'|'safeLow'|'average'

interface IDescription {
    [type:string]: string
}

const descriptions:IDescription = {
    'fast': 'expected to be mined in < 2 minutes',
    'fastest': 'expected to be mined in < 30 seconds',
    'average': 'expected to be mined in < 5 minutes',
    'safeLow': 'expected to be mined in < 30 minutes'
}


interface NotificationProps {
    toggleAlert: (message: string, success:boolean) => void
}


const NotificationForm:React.FC<NotificationProps> = ({toggleAlert}) => {
    const [email, setEmail] = useState('')
    const [threshold, setThreshold] = useState('')
    const [type, setType] = useState<PriceTypes|"">("")

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleClear = () => {
        setEmail('')
    }

    const handleThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThreshold(event.target.value)
    }

    const handleTypeChange = (event:React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        setType(event.target.value as PriceTypes)
    }

    const handleSumbit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        fetch(`${API_URL}update-or-create-user`,{
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, threshold, type})
        })
        .then(response => response.json())
        .then(data=> {
            if(data.user) {
                toggleAlert('You successfully subscribed', true)
            } else {
                toggleAlert('There was an unexpected error', false)
            }
        })
        .catch(err => {
            toggleAlert('There was an unexpected error', false)
        })
        .finally(() => {
            setEmail('')
            setThreshold('')
            setType('')
        })
    }

    return (
        <FormContainer onSubmit={handleSumbit}>
            <FormInput 
            type='email'
            value={email}
            name='email'
            label='Email'
            handleChange={handleEmailChange}
            clear={handleClear}
            required
            />
            <FormInput
            type='number'
            min={0}
            step={0.000001}
            value={threshold}
            name='threshold'
            label='Price threshold (USD)'
            handleChange={handleThresholdChange}
            required
            />
            <CustomSelect
            onChange={handleTypeChange}
            displayEmpty
            value={type}
            required
            >   
                <MenuItem value="" disabled>
                    Price Type
                </MenuItem>
                <MenuItem value='fastest'>Fastest</MenuItem>
                <MenuItem value='fast'>Fast</MenuItem>
                <MenuItem value='average'>Average</MenuItem>
                <MenuItem value='safeLow'>Safe Low</MenuItem>
            </CustomSelect>
            {
                type.length>0?
                <span className='description'>{descriptions[type]}</span>
                :null
            }
            <CustomButton
            variant='contained'
            type='submit'
            >
                Subscribe
            </CustomButton>
        </FormContainer>
    )
}

export default NotificationForm;