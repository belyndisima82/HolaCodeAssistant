import React from 'react'
import { List, ListItem, Avatar } from 'material-ui'
import PropTypes from 'prop-types'

const Users = ({ data }) => 
    <List>
        {Object.keys(data).map((key, index) =>
            <ListItem
                key={index}
                primaryText={data[key].username}
                leftAvatar={<Avatar src={`images/${data[key].picture}.jpg`}></Avatar>}
                disabled={true}>
            </ListItem>
        )}
    </List>


Users.propTypes = {
    data: PropTypes.objectOf(
        PropTypes.shape({
            username: PropTypes.string.isRequired,
            picture: PropTypes.number.isRequired
        })
    ).isRequired
}

export default Users