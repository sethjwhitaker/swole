import React, { Component }from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {users: []}
  }

  componentDidMount() {
    this.getUsers();
  }

  async getUsers() {
    try {
      const response = await fetch('http://localhost:8080/database');
      const data = await response.json();
      this.setState({users: data.data});
    } catch(e) {
      console.log(e);
    }
  }

  render () {
    const { users } = this.state;
    return (
      <div className="App">
      <header className="App-header">
        <h1>
          This is the Swole Fitness-Tracker App
        </h1>
        <ul>
        {users.map(user => <li key={user.user_id}>
            {user.first_name} {user.last_name}
          </li>
        )}
        </ul>
      </header>
    </div>
    );
    
  }
}

export default App;
