import React, { Component } from 'react'
import { TextField, RaisedButton } from 'material-ui'
import Emoji from './Emoji'
import PropTypes from 'prop-types'

class MessageForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addEmoji = this.addEmoji.bind(this)
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

    addEmoji(emoji) {
        //selectionStart: index of the beginning of selected text
        //selectionEnd: index of the end of selected text
        const [selectionStart, selectionEnd] = [this.input.input.selectionStart, this.input.input.selectionEnd]
        this.setState(prevState => {
            //before: the part before the selected portion
            //after: the part behind the selected portion
            const [before, after] = [prevState.message.slice(0, selectionStart), prevState.message.slice(selectionEnd)]
            return { message: before + emoji + after }
        }, () => {
            //sets the cursor position behind the inserted emoji
            this.input.focus()
            this.input.input.setSelectionRange(selectionStart + emoji.length, selectionStart + emoji.length)
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={this.props.style}>
                <Emoji addEmoji={this.addEmoji} />
                <TextField
                    onChange={this.handleChange}
                    hintText={'Type your message here.'}
                    value={this.state.message}
                    ref={i => this.input = i}
                    underlineShow={false}
                    fullWidth={true}
                    style={{flexGrow: 1, height: 36, padding: '0 10px'}}
                    hintStyle={{bottom: 6}} />
                  <RaisedButton className="sendButton" label="Send" primary={true} type="submit" />
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
