import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from './Card'

const Container = Card.extend`
  padding: 0;
  overflow-y: scroll;
`

const Message = styled.div`
  & + & {
    margin-top: 16px;
  }
`

const Event = styled.div`
  background: #373d3f;
  padding: 8px;
  color: #fff;
`

const Payload = styled.pre`
  padding: 8px;
  margin: 0;
  border-left: 3px solid #373d3f;
  white-space: pre-wrap;
`

class MessagesCard extends Component {
  render () {
    return (
      <Container>
        {this.props.messages.map(({ event, message }) => (
          <Message>
            <Event>{event}</Event>
            <Payload>{JSON.stringify(message, null, 2)}</Payload>
          </Message>
        ))}
      </Container>
    )
  }
}

MessagesCard.propTypes = {
  messages: PropTypes.array.isRequired
}

export default MessagesCard
