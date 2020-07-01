import React, { Component }from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {}
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  async getUsers() {
    try {
      const response = await fetch('http://localhost:8080/users');
      const data = await response.json();
      this.setState({users: data.data});
    } catch(e) {
      console.log(e);
    }
  }

  async addUser() {
    const { user } = this.state;

    try {
      await fetch(`http://localhost:8080/users/add?first_name='${user.first_name}'&last_name='${user.last_name}'&email_address='${user.email}'&password_hash='password'`);
      await this.getUsers();
    } catch(e) {
      console.log(e);
    }

  }

  render () {
    const { users, user } = this.state;
    return (
      <div className="App">
      <header className="App-header">
        <h1>
          This is the Swole Fitness-Tracker App
        </h1>
        <ul>
        {users.map(u => <li key={u.user_id}>
            {u.first_name} {u.last_name}
          </li>
        )}
        </ul>
        <form> {/*TODO: Change to fully controlled form*/}
          <label htmlFor="user-first-name">First Name: </label>
          <input 
            id="user-first-name"
            value={user.first_name}
            onChange={e => this.setState({user: {...user, first_name: e.target.value}})}
          ></input>

          <label htmlFor="user-last-name">Last Name: </label>
          <input 
            id="user-last-name"
            value={user.last_name}
            onChange={e => this.setState({user: {...user, last_name: e.target.value}})}
          ></input>

          <label htmlFor="user-email">Email: </label>
          <input 
            id="user-email"
            type="user-email"
            value={user.email}
            onChange={e => this.setState({user: {...user, email: e.target.value}})}
          ></input> 
          <button onClick={e => this.addUser()}>Submit</button>
        </form>
        
      </header>
    </div>
    );
    
  }
}

export default App;
