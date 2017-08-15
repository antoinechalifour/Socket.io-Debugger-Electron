import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StatusCard from './StatusCard'
import SubscriptionsCard from './SubscriptionsCard'
import MessagesCard from './MessagesCard'
import SendMessageCard from './SendMessageCard'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  border-left: 1px solid #d1d1d3;
  height: 100vh;
  padding: 12px;
  box-sizing: border-box;

  > * {
    margin-bottom: 8px;
    border-radius: 2px;
  }

  > :nth-child(3) {
    flex: 1;
  }

  > :last-child {
    margin-bottom: 0;
  }
`

class SocketPanel extends Component {
  constructor (props) {
    super(props)

    this.state = { messages: [] }

    this.onMessage = this.onMessage.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onMessage (event, message) {
    this.setState({ messages: [{ event, message: message }, ...this.state.messages] })
  }

  onSubmit (event, message) {
    this.setState({ messages: [{ event, message: JSON.parse(message) }, ...this.state.messages] })
    this.props.socket.emit(event, JSON.parse(message))
  }

  render () {
    return (
      <Container>
        <StatusCard
          socket={this.props.socket}
          onDisconnect={this.props.onDisconnect}
        />

        <SubscriptionsCard
          socket={this.props.socket}
          onMessage={this.onMessage}
        />

        <MessagesCard messages={this.state.messages} />

        <SendMessageCard onSubmit={this.onSubmit} />
      </Container>
    )
  }
}

SocketPanel.propTypes = {
  socket: PropTypes.object.isRequired,
  onDisconnect: PropTypes.func.isRequired
}

export default SocketPanel
