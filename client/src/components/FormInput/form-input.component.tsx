import React, {InputHTMLAttributes} from 'react';
import {Container} from './form-input.styles';


interface InputProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    clear?: () => void
}



const FormInput: React.FC<InputProps&InputHTMLAttributes<HTMLInputElement>> = ({handleChange, label, clear, ...otherProps}) => {
    return (
    <Container>
        <input onChange={handleChange} {...otherProps}/>
        {clear&&otherProps.value?.toString().length&&otherProps.value?.toString().length>0?
            <span onClick={clear}>&#x2716;</span>
            :null
            }
        {label ?
        (<label
        className={`${otherProps.value?.toString()&&otherProps.value?.toString().length>0 ? 'shrink': ''}`}
        >
            {label}
        </label> )
        : null
        }
    </Container>
    )
}

export default FormInput;