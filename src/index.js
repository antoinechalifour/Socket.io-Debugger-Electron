import React from 'react'
import { injectGlobal } from 'styled-components'
import { render } from 'react-dom'
import App from './components/App'

injectGlobal`
  body {
    padding: 0;
    margin: 0;
    background: #f7f7f9;
    font-family: 'Source Sans Pro', sans-serif;
  }
`

render(
  <App name='Universe' />,
  document.querySelector('#app')
)
