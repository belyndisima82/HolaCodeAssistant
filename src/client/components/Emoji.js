import React, { Component } from 'react'
import { IconButton, Popover } from 'material-ui'
import MoodIcon from 'material-ui/svg-icons/social/mood'
import { cyan500 } from 'material-ui/styles/colors'
import { StyleRoot } from 'radium'
import emojis from '../emojis'
import PropTypes from 'prop-types'

class Emoji extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleRequestClose = this.handleRequestClose.bind(this)
        this.handleEmojiClick = this.handleEmojiClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault()
        this.setState({
            isOpen: true,
            anchorEl: e.currentTarget
        })
    }

    handleRequestClose() {
        this.setState({
            isOpen: false
        })
    }

    handleEmojiClick(e) {
        this.setState({
            isOpen: false
        })
        this.props.addEmoji(e.target.innerHTML)
    }

    render() {
        return (
            <div>
                <IconButton style={{width: 24, height: 36, padding: 0}} onClick={this.handleClick}>
                    <MoodIcon />
                </IconButton>
                <Popover
                    open={this.state.isOpen}
                    anchorEl={this.state.anchorEl}
                    onRequestClose={this.handleRequestClose}>
                    <StyleRoot style={{
                        width: 132, 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        overflow: 'hidden'
                    }}>
                        {emojis.map((value, index) => 
                            <div title={value.name} key={index} style={{
                                cursor: 'default',
                                width: 20,
                                height: 20,
                                padding: 10,
                                borderWidth: 2,
                                borderStyle: 'solid',
                                borderColor: 'transparent',
                                ':hover': {
                                    borderColor: cyan500
                                }
                            }} onClick={this.handleEmojiClick}>{value.emoji}</div>
                        )}
                    </StyleRoot>
                </Popover>
            </div>
        )
    }
}

Emoji.propTypes = {
    addEmoji: PropTypes.func.isRequired
}

export default Emoji