import styled from 'styled-components';

export const Container = styled.div`
position: relative;
margin: 20px 0px 15px 0px;
width:253px;

>input {
    background: none;
    background-color: white;
    color: grey;
    font-size: 18px;
    padding: 10px 30px 10px 5px;
    display: block;
    border: none;
    border-radius: 4px;
    width:253px;
    position: relative;
    &:focus ~ label {
        top: -26px;
        font-size: 18px;
        color: #fafafa;
    }    
}
>label {
    color: grey;
    font-size: 16px;
    top: 10px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    transition: 300ms ease all;
    &.shrink {
        top: -26px;
        font-size: 18px;
        color: #fafafa;
    }
}
>span {
    cursor: pointer;
    position: absolute;
    right: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    top: calc(50% - 0.6rem - 5px)

}
`