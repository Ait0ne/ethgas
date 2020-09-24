import React from 'react';


import {AlertContainer} from './alert.styles';



interface AlertProps {
    message: string;
    onClose: () => void;
    success: boolean
}

const Alert: React.FC<AlertProps> = ({message, onClose, success}) => {
    return (
        <AlertContainer success={success}>
            <span>{message}</span>
            <span className='close-button' onClick={() => onClose()}>&#x2716;</span>
        </AlertContainer>
    )
}

export default Alert;
