import React, { Component }from 'react';
import './App.css';

// TODO: Make form a controlled component
// TODO: Separate current code into a Register component
// TODO: Create a Login component
// TODO: Work on formatting

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
      await fetch(`http://localhost:8080/users/add?first_name=${user.first_name}&last_name=${user.last_name}&email_address=${user.email}&password=${user.password}`);
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
          Register
        </h1>
        <ul>
        {users.map(u => <li key={u.user_id}>
            Name: {u.first_name} {u.last_name} | Email: {u.email_address}
          </li>
        )}
        </ul>
        <form onSubmit={e=> this.addUser()}>
          <label>
            First Name: 
            <input 
              type="text"
              value={user.first_name}
              onChange={e => this.setState({user: {...user, first_name: e.target.value}})}
            ></input>
          </label>
          
          <label>
            Last Name: 
            <input 
              type="text"
              value={user.last_name}
              onChange={e => this.setState({user: {...user, last_name: e.target.value}})}
          ></input>
          </label>
          

          <label>
            Email:
            <input 
              type="email"
              value={user.email}
              onChange={e => this.setState({user: {...user, email: e.target.value}})}
            ></input>
          </label>
           

          <label>
            Password:
            <input 
              type="password"
              value={user.password}
              onChange={e => this.setState({user: {...user, password: e.target.value}})}
            ></input>
          </label>
          

          <input type="submit" value="Register"></input>
        </form>
        
      </header>
    </div>
    );
    
  }
}

export default App;
