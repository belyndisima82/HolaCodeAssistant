import React from 'react'
import { Avatar } from 'material-ui'
import { cyan500, white, black, deepPurple100, indigo50 } from 'material-ui/styles/colors'
import Radium, { StyleRoot } from 'radium'
import PropTypes from 'prop-types'

const Messages = (props) =>
    <div style={props.style} id={props.id}>
        {props.data.map((message, index) => {
            if (message.isSystemMessage) return <SystemMessage key={index} type={message.type}>{message.createdAt} {message.body}</SystemMessage>

            const data = {
                picture: message.picture,
                author: message.author,
                body: message.body,
                createdAt: message.createdAt
            }

            return <Message key={index} data={data} />
        })}
    </div>

Messages.defaultProps = {
    id: '',
    style: {}
}

Messages.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            author: PropTypes.string.isRequired,
            author_id: PropTypes.string.isRequired,
            picture: PropTypes.number.isRequired,
            body: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['normal', 'login', 'logout']),
            isSystemMessage: PropTypes.bool.isRequired
        })
    ).isRequired
}

export default Messages

const SystemMessage = (props) => {
    const { color, backgroundColor } = getSystemMsgTheme(props.type)
    return <div style={{ padding: 10, color, backgroundColor }}>{props.children}</div>
}

SystemMessage.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

const Message = ({ data }) =>
    <StyleRoot>
        <div style={{
            display: 'flex',
            padding: '10px 20px',
            borderBottom: `1px solid ${cyan500}`,
            animation: 'x 1s forwards',
            animationName: Radium.keyframes({
                'from': { opacity: 0, backgroundColor: indigo50 },
                'to': { opacity: 1 }
            })
        }}>
            <Avatar src={`${data.picture}`}></Avatar>
            <div style={{ padding: '0 10px 10px 10px' }}>
                <div>
                    {data.author}
                    <span style={{ color: '#99aab5', fontSize: 12, marginLeft: 5 }}>{data.createdAt}</span>
                </div>
                <div style={{ lineHeight: '20px' }}>{data.body}</div>
            </div>
        </div>
    </StyleRoot>

Message.propTypes = {
    data: PropTypes.shape({
        author: PropTypes.string.isRequired,
        picture: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired
    }).isRequired
}

const getSystemMsgTheme = (type) => {
    let color = white,
        backgroundColor

    switch (type) {
        case 'login':
            backgroundColor = deepPurple100
            break
        case 'logout':
            backgroundColor = indigo50
            break
        default:
            color = black
            backgroundColor = white
            break
    }

    return { color, backgroundColor }
}
