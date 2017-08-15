import 'brace'
import 'brace/mode/json'
import 'brace/theme/github'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Ace from 'react-ace'
import Card from './Card'
import Input from './Input'
import Button from './Button'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 8px;
  }
  
  button {
    margin-top: 8px;
  }
`

class SendMessageCard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      eventNameInput: '',
      eventPayloadInput: ''
    }

    this.ACE_ID = Math.random().toString()
    this.onEventNameChange = this.onEventNameChange.bind(this)
    this.onEventPayloadChange = this.onEventPayloadChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onEventNameChange (e) {
    this.setState({ eventNameInput: e.target.value })
  }

  onEventPayloadChange (e) {
    this.setState({ eventPayloadInput: e })
  }

  onSubmit (e) {
    e.preventDefault()

    this.props.onSubmit(this.state.eventNameInput, this.state.eventPayloadInput)
    this.setState({
      eventNameInput: '',
      eventPayloadInput: ''
    })
  }

  render () {
    return (
      <Card className={this.props.className}>
        <Form onSubmit={this.onSubmit}>
          <Input
            type='text'
            placeholder='Event name'
            value={this.state.eventNameInput}
            onChange={this.onEventNameChange}
          />
          <Ace
            mode='json'
            theme='github'
            width='100%'
            height='150px'
            onChange={this.onEventPayloadChange}
            value={this.state.eventPayloadInput}
            name={this.ACE_ID}
            setOptions={{ tabSize: 2 }}
            />
          <Button type='submit'>Send</Button>
        </Form>
      </Card>
    )
  }
}

SendMessageCard.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default SendMessageCard
