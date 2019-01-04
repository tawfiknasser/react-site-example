import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Home from './Components/Home';
import Users from './Components/Users';
import User from './Components/User';
import Login from './Components/Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('isLogged') === 'true'
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/users">Users</Link></li>
                            <li><Link to="/user/1">User Number 1</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/login" onClick={this.onClickLogout}>Logout</Link></li>
                        </ul>
                    </nav>

                    <PrivateRoute path="/" exact component={Home} />
                    <PrivateRoute path="/users/:pageNumber?" component={Users} />
                    <PrivateRoute path="/user/:userID" component={User} />
                    <Route path="/login" component={Login}/>
                </div>
            </Router>
        );
    }
    onClickLogout = () => {
        localStorage.removeItem('isLogged');
    }
}

export default App;