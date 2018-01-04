import React from 'react'
import { Avatar } from 'material-ui'
import { cyan500, white, green500, red500 } from 'material-ui/styles/colors'
import PropTypes from 'prop-types'

const Messages = (props) =>
    <div style={props.style} id={props.id}>
        {props.data.map((message, index) => {
            if(message.isSystemMessage) return <SystemMessage key={index} type={message.systemMessageType}>{message.createdAt} {message.body}</SystemMessage>
            
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
            picture: PropTypes.number.isRequired,
            body: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            isSystemMessage: PropTypes.bool.isRequired,
            systemMessageType: PropTypes.string
        })
    ).isRequired
}

export default Messages

const SystemMessage = (props) => 
    <div style={{padding: 10, color: white, backgroundColor: props.type === 'login' ? green500 : red500}}>{props.children}</div>

SystemMessage.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

const Message = ({ data }) => 
    <div style={{
        display: 'flex',
        padding: '10px 20px',
        borderBottom: `1px solid ${cyan500}`
    }}>
        <Avatar src={`images/${data.picture}.jpg`}></Avatar>
        <div style={{padding: '0 10px 10px 10px'}}>
            <div>
                {data.author}
                <span style={{color: '#99aab5', fontSize: 12, marginLeft: 5}}>{data.createdAt}</span>
            </div>
            <div style={{lineHeight: '20px'}}>{data.body}</div>
        </div>
    </div>
    
Message.propTypes = {
    data: PropTypes.shape({
        author: PropTypes.string.isRequired,
        picture: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired
    }).isRequired
}