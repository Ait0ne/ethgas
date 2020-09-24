import styled from 'styled-components';

interface AlertProps {
    success?:boolean
}


export const AlertContainer = styled.div<AlertProps>`
display: flex;
margin: 15px 0;
justify-content: space-between;
align-items: center;
background-color: ${props => props.success? 'rgba(237, 247, 237, 0.9)': 'rgba(253, 236, 234, 0.9)' };
border-radius: 4px;
text-align:center;
padding: 10px 20px;
width: 90%;
max-width: 600px;
align-self:center;
>.close-button {
    cursor: pointer;
}
`