import React, { Component } from 'react'
import Login from './Login'
import Chat from './Chat'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            isLoggedIn: false
        }
        this.setUsername = this.setUsername.bind(this)
    }

    setUsername(username) {
        this.setState({
            username,
            isLoggedIn: true
        })
    }

    render() {
        //User is not logged in, display Login component
        if(!this.state.isLoggedIn) return <Login setUsername={this.setUsername} />
        
        //User is logged in, display Chat component
        return <Chat username={this.state.username} />
    }
}

export default App