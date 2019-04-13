import React from 'react';
import UserCard from './UserCard.js';

const UserList = props => {
    
    return (
        <div>
            {props.users.map(user => (
                <UserCard user={user} key={user.username} />
            ))}
        </div>
    )
}

export default UserList;