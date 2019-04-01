import React from 'react';

const UserCard = props => {
    return (
        <div>
            <h1>Name: {props.user.username}</h1>
            <h3>Password: {props.user.password}</h3>
        </div>
    )
}

export default UserCard;