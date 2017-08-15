import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

const Container = Card.extend`
  display: flex;
  justify-content: space-between;
  
  background: ${({ connected }) => connected ? '#AED581' : '#E57373'};

  button {
    border: none;
    background: none;
    font-family: monospace;
    cursor: pointer;
    outline: none;
  }
`

class StatusCard extends Component {
  constructor (props) {
    super(props)

    this.state = { connected: false }
  }

  componentDidMount () {
    this.props.socket.on('connect', () => this.setState({ connected: true }))
    this.props.socket.on('disconnect', () => this.setState({ connected: false }))
  }

  render () {
    return (
      <Container connected={this.state.connected}>
        Socket is currently {this.state.connected ? 'connected' : 'disconnected'}
        <button onClick={() => this.props.onDisconnect(this.props.socket)}>X</button>
      </Container>
    )
  }
}

StatusCard.propTypes = {
  socket: PropTypes.object.isRequired,
  onDisconnect: PropTypes.func.isRequired
}

export default StatusCard
