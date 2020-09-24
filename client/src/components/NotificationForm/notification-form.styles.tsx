import styled from 'styled-components';
import {Select, Button} from '@material-ui/core';


export const FormContainer  = styled.form`
margin-top: 50px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 95%;
max-width: 600px;
>.description {
    margin-top: 5px;
    color: white;
} 
`

export const CustomSelect = styled(Select)`
margin-top:15px;
background-color: white;
padding: 5px 20px 5px 5px;
border-radius: 4px;
width: 253px;
`

export const CustomButton = styled(Button)`
margin-top: 25px!important;
`