import React, { Component } from 'react'
import styled from 'styled-components'
import AddConnection from './AddConnection'
import SocketPanel from './SocketPanel'

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vh;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  > * {
    width: 450px;
    flex-shrink: 0;
  }
`

class App extends Component {
  constructor (props) {
    super(props)

    this.state = { connections: [] }
    this.onConnection = this.onConnection.bind(this)
    this.onDisconnect = this.onDisconnect.bind(this)
  }

  onConnection (socket) {
    this.setState({ connections: [socket, ...this.state.connections] })
  }

  onDisconnect (socket) {
    socket.disconnect()

    this.setState({ connections: this.state.connections.filter(s => s.internal_id !== socket.internal_id)})
  }

  render () {
    return (
      <Container>
        <AddConnection onConnection={this.onConnection} />
        {this.state.connections.map(socket => (
          <SocketPanel
            key={socket.internal_id}
            socket={socket}
            onDisconnect={this.onDisconnect}
          />
        ))}
      </Container>
    )
  }
}

export default App
