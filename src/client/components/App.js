import React, { Component } from 'react'
import io from 'socket.io-client'
import Login from './Login'
import Chat from './Chat'

const socket = io.connect()

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            isLoggedIn: false,
            isSmallDevice: this.isSmallDevice()
        }

        this.setUsername = this.setUsername.bind(this)
        this.handleResize = this.handleResize.bind(this)
    }

    componentDidMount() {
        //Event listeners
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        //Remove event listeners
        window.removeEventListener('resize', this.handleResize)
    }

    isSmallDevice() {
        return 768 >= window.innerWidth
    }

    handleResize() {
        const isSmallDevice = this.isSmallDevice()
        if (this.state.isSmallDevice !== isSmallDevice) {
            //Only update if it's necessary
            this.setState({
                isSmallDevice: isSmallDevice
            })
        }
    }

    setUsername(username) {
        this.setState({
            username,
            isLoggedIn: true
        })
    }

    render() {
        //User is not logged in, display Login component
        if (!this.state.isLoggedIn) return <Login setUsername={this.setUsername} socket={socket} />

        //User is logged in, display Chat component
        return <Chat username={this.state.username} socket={socket} isSmallDevice={this.state.isSmallDevice} />
    }
}

export default App