import React, { Component } from 'react'
import { AppBar, Drawer } from 'material-ui'
import Users from './Users'
import Messages from './Messages'
import MessageForm from './MessageForm'
import messageAudio from '../audio/message.mp3'
import PropTypes from 'prop-types'

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: {},
            messages: [],
            isOpen: true
        }

        //Stores data for the 'unread messages' feature
        this.unreadMessage = {
            count: 0,
            windowActive: true,
            originalTitle: document.title
        }

        this.handleToggle = this.handleToggle.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    componentDidMount() {
        const socket = this.props.socket
        
        //Sends the current user name to the server
        socket.emit('user joined', this.props.username)

        //Listeners
        socket.on('users list', users => this.updateUsers(users))
        socket.on('message', message => this.addMessage(message))
        socket.on('play audio', () => this.playAudio())

        this.messagesContainer = document.getElementById('messages')

        //Event listeners
        window.addEventListener('focus', this.handleFocus)
        window.addEventListener('blur', this.handleBlur)
    }

    componentWillUnmount() {
        //Remove event listeners
        window.removeEventListener('focus', this.handleFocus)
        window.removeEventListener('blur', this.handleBlur)
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

        //Checks if the browser window is not active
        if(!this.unreadMessage.windowActive) {
            //If not active then it increase the counter and updates the title
            this.unreadMessage.count++
            document.title = `${this.unreadMessage.count} unread message - ${this.unreadMessage.originalTitle}`
        }
    }

    sendMessage(body) {
        //It sends the message to the server
        this.props.socket.emit('message', body)
    }

    playAudio() {
        //Play audio when new message is added
        const audio = new Audio(messageAudio)
        audio.currentTime = 0
        audio.play()
    }

    handleFocus() {
        //Executes when the user revisit this tab
        this.unreadMessage.windowActive = true
        this.unreadMessage.count = 0
        document.title = this.unreadMessage.originalTitle
    }

    handleBlur() {
        //Executes when the user leaves this tab
        this.unreadMessage.windowActive = false
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
    username: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired
}

export default Chat