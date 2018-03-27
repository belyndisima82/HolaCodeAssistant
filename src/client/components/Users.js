import React from 'react'
import { List, ListItem, Avatar } from 'material-ui'
import PropTypes from 'prop-types'

const Users = ({ data }) => 
    <List>
        {data.map((value, index) =>
            <ListItem
                key={index}
                primaryText={value.username}
                leftAvatar={<Avatar src={`images/${value.picture}.jpg`}></Avatar>}
                disabled={true}>
            </ListItem>
        )}
    </List>


Users.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            username: PropTypes.string.isRequired,
            picture: PropTypes.number.isRequired
        })
    ).isRequired
}

export default Users