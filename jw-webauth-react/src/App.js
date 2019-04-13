import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LogIn from './LogIn/LogIn.js';
import axios from 'axios';
import UserList from './Users/UserList.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userArray: []
    }
  }

componentDidMount() {
  axios
  .get('http://localhost:5000/api/getDb')
  .then(res => {
    console.log('cdm-res', res.data)
    this.setState({ userArray: res.data })
  })
  .catch(err => {
    console.log('Bupkiss!')
  })
}


  render() {
    console.log(this.state.userArray)
    return (
      <div className="App">
        <Route exact path="/" component={LogIn} />
        <Route path="/users" render={props => (
          <UserList 
            {...props}
            users={this.state.userArray}
          />
        )}
        />
      </div>
    );
  }
}

export default App;
