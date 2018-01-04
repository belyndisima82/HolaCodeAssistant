import React, { Component } from 'react'
import { AppBar, Drawer } from 'material-ui'
import Users from './Users'
import Messages from './Messages'
import MessageForm from './MessageForm'
import io from 'socket.io-client'
import PropTypes from 'prop-types'

const socket = io.connect()

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: {},
            messages: [],
            isOpen: true
        }
        this.handleToggle = this.handleToggle.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        //Sends the current user name to the server
        socket.emit('user joined', this.props.username)

        //Listeners
        socket.on('users list', users => this.updateUsers(users))
        socket.on('message', message => this.addMessage(message))

        this.messagesContainer = document.getElementById('messages')
    }

    updateUsers(users) {
        //Updates the users object
        this.setState({
            users
        })
    }

    addMessage(message) {
        //Adds a new message to the messages array
        this.setState((prevState) => ({ messages: [...prevState.messages, message] }))
        
        //When a new message is added it scrolls to the bottom of the page
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    }

    sendMessage(body) {
        //It sends the message to the server
        socket.emit('message', body)
    }

    handleToggle() {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }))
    }

    render() {
        return ( 
            <div style={{
                display: 'flex',
                height: '100vh',
                flexDirection: 'column',
                paddingLeft: +this.state.isOpen * 256,
                transition: 'padding-left 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
            }}>
                <Drawer open={this.state.isOpen}>
                    <AppBar
                        showMenuIconButton={false}
                        title="Online users" />
                    <Users data={this.state.users} />
                </Drawer>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '100%'
                }}>
                    <AppBar onLeftIconButtonClick={this.handleToggle} />
                    <Messages data={this.state.messages} id="messages" style={{flex: 1, overflowY: 'scroll'}} />
                    <MessageForm sendMessage={this.sendMessage} style={{display: 'flex', padding: '10px 20px'}} />
                </div>
            </div>
        )
    }
}

Chat.propTypes = {
    username: PropTypes.string.isRequired
}

export default Chat