import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from './Card'
import Input from './Input'
import Button from './Button'

const Subscriptions = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, .2);
  padding-bottom: 8px;
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;

  & > span {
    display: block;
    padding: 4px 8px;
    font-family: monospace;
    background: #111;
    color: #fff;
    font-size: 12px;
    margin: 2px;
    border-radius: 4px;
    cursor: pointer;
  }
`

const SubscriptionsForm = styled.form`
  display: flex;

  & > :first-child {
    flex: 8;
  }

  & > :nth-child(2) {
    flex: 3;
  }
`

class SubscriptionsCard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      subscriptions: [],
      subscriptionInput: ''
    }
    this.addEvent = this.addEvent.bind(this)
    this.onSubscriptionInputChange = this.onSubscriptionInputChange.bind(this)
  }

  onSubscriptionInputChange (e) {
    this.setState({ subscriptionInput: e.target.value })
  }

  addEvent (e) {
    e.preventDefault()
    const eventName = this.state.subscriptionInput

    this.props.socket.on(eventName, data => this.props.onMessage(eventName, data))

    this.setState({
      subscriptions: [eventName, ...this.state.subscriptions],
      subscriptionInput: ''
    })
  }

  removeEvent (eventName) {
    this.setState({
      subscriptions: this.state.subscriptions.filter(en => en !== eventName)
    })

    this.props.socket.off(eventName)
  }

  render () {
    return (
      <Card>
        {this.state.subscriptions.length > 0 && (
        <Subscriptions>
            {this.state.subscriptions.map(eventName => (
              <span
                key={eventName}
                onClick={() => this.removeEvent(eventName)}
              >
                {eventName}
              </span>
            ))}
          </Subscriptions>
        )}
        <SubscriptionsForm onSubmit={this.addEvent}>
          <Input
            type='text'
            placeholder='Event name'
            value={this.state.subscriptionInput}
            onChange={this.onSubscriptionInputChange}
          />
          <Button type='submit'>Subscribe</Button>
        </SubscriptionsForm>
      </Card>
    )
  }
}

SubscriptionsCard.propTypes = {
  socket: PropTypes.object.isRequired,
  onMessage: PropTypes.func.isRequired
}

export default SubscriptionsCard
