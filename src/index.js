import React from 'react'
import { render } from 'react-dom'

const App = ({ name }) => (
  <div>Hello {name}</div>
)

render(
  <App name='Universe' />,
  document.querySelector('#app')
)
