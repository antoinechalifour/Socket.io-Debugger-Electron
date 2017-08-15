import styled from 'styled-components'

const Input = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  background: none;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;

  padding: 8px;
  border-bottom: 1px solid #d1d1d3;
  transition: border-bottom .3s ease-in;

  &:focus {
    border-bottom: 1px solid #bcbcbc;
  }
`

export default Input
