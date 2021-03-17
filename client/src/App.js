import React, { Component }from 'react';
import {HashRouter, NavLink, Route} from 'react-router-dom';

// Style
import './App.css';

// Components
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';

// TODO: Create back-end for meals and workouts

// TODO: Implement JWT

// TODO: Create Meals Component
// TODO: Create add meal query
// TODO: Create get meals query

// TODO: Create Workouts Component
// TODO: Create add workout query
// TODO: Create get workout query

// TODO: Create homepage

// TODO: Design aesthetic
//       Choose colors
//       Make a mock up in standard html/css/js

// TODO: Plan features in detail and in order
// TODO: Make list of features in priority



// TODO: Add input validation
// TODO: Work on formatting

class App extends Component {

    render () {
        return (
            <HashRouter>
                <div className="App">
                    <header>
                        <nav>
                            <div className="reg-log-nav">
                                <ul>
                                    <li>
                                        <NavLink to="/login">Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/register">Register</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>

                    <Route exact path="/" component={Home} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
    
        );
    }
}

export default App;
