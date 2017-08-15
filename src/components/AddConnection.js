import React, { Component } from 'react'
import url from 'url'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SocketIo from 'socket.io-client/lib/index'
import { v4 as uuid } from 'uuid'
import Input from './Input'
import Button from './Button'

const Container = styled.form`
  display: flex;
  max-width: 350px;
  margin: auto;
  flex-direction: column;
  justify-content: center;

  input {
    margin: 12px 0;
  }

  input, button {
    width: 100%;
  }
`

class AddConnection extends Component {
  constructor (props) {
    super(props)

    this.state = { host: '' }
    this.onHostChange = this.onHostChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onHostChange (e) {
    this.setState({ host: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()
    const { protocol, host, path } = url.parse(this.state.host)
    const socketUrl = `${protocol}//${host}${path}`
    const socket = SocketIo(socketUrl)
    // const socket = SocketIo(, {
    //   path: path === '/' ? undefined : path
    // })
    socket.internal_id = uuid()
    this.props.onConnection(socket)
    // this.setState({ host: '' })
  }

  render () {
    return (
      <Container onSubmit={this.onSubmit}>
        <Input
          type='text'
          placeholder='e.g. http://localhost:8080'
          value={this.state.host}
          onChange={this.onHostChange}
          />
        <Button type='submit'>Connect to <b>{this.state.host}</b></Button>
      </Container>
    )
  }
}

AddConnection.propTypes = {
  onConnection: PropTypes.func.isRequired
}

export default AddConnection
