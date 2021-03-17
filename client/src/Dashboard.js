import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        // 1. check if logged in
        //      if not, redirect to login.
    }

    componentDidMount() {
        // Check local storage for necessary data
        // If data is not there, query server
    }

    render() {
        console.log(this.props.location.state);
        if(!this.props.location.state) {
            return <Redirect to="/login" />
        }
        return (
            <div className="Dashboard">
                <h1>Welcome {this.props.location.state.user.first_name} {this.props.location.state.user.last_name}</h1>
            </div>
        );
    }
}

export default Dashboard;