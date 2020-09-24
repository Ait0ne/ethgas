import styled from 'styled-components';

export const AppContainer = styled.div`
padding: 100px 0;
width:100%;
height: 100%;
display: flex;
justify-content: flex-start;
align-items:center;
flex-direction: column;
background-image: url('./bg.jpg');
background-size: cover;
background-repeat: no-repeat;
background-position:center;
opacity: 0.8;
> h1 {
    margin-top: 100px;
    font-size: 2.5rem;
    text-align: center;
    color: white;
    max-width: 40ch;
    padding: 20px;
}

>span {
    cursor: pointer;
    font-size: 0.8rem;
    color: white;
    text-decoration: underline;
    margin-top: 10px;
}

@media (max-width: 600px) {
    >h1 {
        font-size: 1.5rem;
        margin-top: 0;
    }
}
`