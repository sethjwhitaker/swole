import React, {Component} from 'react';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                first_name: '',
                last_name: '',
                email_address: '',
                password: ''
            }
        }
    }
    
      async addUser(e) {
          e.preventDefault();
        const { user } = this.state;

        // Create request object
        const requestOptions = {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({
            first_name: user.first_name,
            last_name: user.last_name,
            email_address: user.email_address,
            password: user.password
          })
        };

        try {
            // Send request
            const response = await fetch(`http://localhost:8080/users/add`, requestOptions);
            // evealuate response
            const data = await response.json();
            if(data.success) {
                console.log("User successfully added!")
            } else {
                console.log("something went wrong: ");
                console.log(data.error);
            }
        
        } catch(e) {
          console.log(e);
        }
    
      }
    
      render () {
        const { user } = this.state;
        return (
        <div className="Register">

            <h1>Register</h1>
            
            <form onSubmit={(e) => this.addUser(e)}>

                <label>First Name: </label>
                <input 
                    type="text"
                    value={user.first_name}
                    onChange={e => this.setState({user: {...user, first_name: e.target.value}})}
                ></input>
                
                <label>Last Name: </label>
                <input 
                    type="text"
                    value={user.last_name}
                    onChange={e => this.setState({user: {...user, last_name: e.target.value}})}
                ></input>
    
                <label>Email: </label>
                <input 
                    type="email"
                    value={user.email_address}
                    onChange={e => this.setState({user: {...user, email_address: e.target.value}})}
                ></input>

                <label>Password: </label>
                <input 
                    type="password"
                    value={user.password}
                    onChange={e => this.setState({user: {...user, password: e.target.value}})}
                ></input>
            
                <input 
                    type="submit" 
                    value="Register"
                ></input>

            </form>
            
            
        </div>
        );
        
      }

}

export default Register;