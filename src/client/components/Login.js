import React, { Component } from 'react'
import { Paper, TextField, RaisedButton } from 'material-ui'
import { cyan500, blue500 } from 'material-ui/styles/colors'
import PropTypes from 'prop-types'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: localStorage.getItem('username') || '',
            errors: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.input.select()
    }

    handleSubmit(e) {
        e.preventDefault()

        //Validate username, if it is not valid store the errors
        const errors = this.validate(this.state.username)
        if(errors.length) {
            this.setState({
                errors
            })
            return
        }

        this.props.socket.emit('username exists', this.state.username, (isUsernameTaken) => {
            if(isUsernameTaken) {
                this.setState({
                    errors: ['Username is already taken']
                })
                return
            }
    
            //If the username is not taken then:
            //- send the username to the parent component
            //- save it to the localStorage
            this.props.setUsername(this.state.username)
            localStorage.setItem('username', this.state.username)
        })
    }

    handleChange(e) {
        this.setState({
            username: e.target.value,
            errors: this.validate(e.target.value)
        })
    } 

    validate(username) {
        const errors = []
        
        if(username.length === 0) {
            errors.push('Username cannot be blank')
        }

        if(username.length < 3) {
            errors.push('Username should be at least 3 character long')
        }

        return errors
    }

    render() {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `linear-gradient(to right, ${blue500}, ${cyan500})`
            }}>
                <Paper style={{padding: 20, maxWidth: '100%', width: 372}} zDepth={3}>
                    <form onSubmit={this.handleSubmit}>
                        <div style={{textAlign: 'center', fontSize: 24}}>Simple chat</div>
                        <TextField 
                            hintText="Enter your username"
                            floatingLabelText="Username"
                            floatingLabelFixed={true}
                            fullWidth={true}
                            autoComplete="off"
                            defaultValue={this.state.username}
                            errorText={this.state.errors[0]}
                            onChange={this.handleChange}
                            ref={i => this.input = i}
                        />
                        <RaisedButton 
                            label="Login"
                            type="submit"
                            primary={true}
                            style={{float: 'right'}}/>
                    </form>
                </Paper>
            </div>
        )
    }
}

Login.propTypes = {
    setUsername: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired
}

export default Login