import React from 'react';
import axios from 'axios';



class LogIn extends React.Component {
    constructor() {
        super();
    this.state = {
        userObject: {
            username: '',
            password: ''
        }
    }
}

    changeHandler = e => {
        this.setState({
            userObject: {
                ...this.state.userObject,
                [e.target.name]: e.target.value
            }
        })
    }

    submitHandler = e => {
        e.preventDefault();
        axios
        .post("http://localhost:5000/api/login", { username: this.state.userObject.username, password: this.state.userObject.password})
        .then(res => {
            this.props.history.push('/users');
        })
        .catch(err => {
            console.log('Access denied, bitch!')
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input 
                        type="text"
                        name="username"
                        placeholder="..name.."
                        value={this.state.userObject.username}
                        onChange={this.changeHandler}
                    />
                    <input 
                        type="text"
                        name="password"
                        placeholder="..password.."
                        value={this.state.userObject.password}
                        onChange={this.changeHandler}
                    />
                    <button>Submit</button>
                </form>
        </div>
    )
    }
}

export default LogIn;