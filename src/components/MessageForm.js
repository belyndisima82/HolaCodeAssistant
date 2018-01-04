import React, { Component } from 'react'
import { TextField, RaisedButton } from 'material-ui'
import PropTypes from 'prop-types'

class MessageForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.input.focus()
    }

    handleSubmit(e) {
        e.preventDefault()
        if(this.state.message.trim().length !== 0) {
            //When the message is not empty it sends the message to the parent component
            this.props.sendMessage(this.state.message)
            this.setState({
                message: ''
            })
        }
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={this.props.style} >
                <TextField 
                    onChange={this.handleChange}
                    hintText={'Type your message here.'}
                    value={this.state.message}
                    ref={i => this.input = i}
                    underlineShow={false} 
                    fullWidth={true}
                    style={{flexGrow: 1, height: 36, padding: '0 10px 0 0'}} 
                    hintStyle={{bottom: 6}} />
                <RaisedButton label="Send" primary={true} type="submit" />
            </form>
        )
    }
}

MessageForm.defaultProps = {
    style: {}
}

MessageForm.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    style: PropTypes.object
}

export default MessageForm