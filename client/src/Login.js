import React, {Component} from 'react';

class Login extends Component {

    constructor (props) {
        super(props);
        this.state = {
            user: {
                email_address: '',
                password: ''
            }
        }
    }


    async handleSubmit(e) {
        e.preventDefault();
        const { user } = this.state;

        // Create request object
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Credentials" : "true"
            },
            body: JSON.stringify({
                email_address: user.email_address,
                password: user.password
            })
        };

        try {
            // Send request
            const response = await fetch(`http://localhost:8080/users/login`, requestOptions);

            // evaluate response
            const data = await response.json();

            if(data.success) {
                if(data.passwordAuthenticated) {
                    console.log("Login successful!");
                } else {
                    console.log("Invalid password");
                }
            } else {
                console.log("something went wrong: ");
                console.log(data.error);
            }
        
        } catch(e) {
            console.log(e);
        }
    }

    render () {
        const {user} = this.state;

        return (
        <div className="login-container">
            <h1>Login</h1>

            <form onSubmit={(e) => this.handleSubmit(e)}>

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
                    value="Login"
                ></input>

            </form>
        </div>
        );
    }
}

export default Login;