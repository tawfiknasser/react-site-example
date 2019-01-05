import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Home from './Components/Home';
import Users from './Components/Users';
import User from './Components/User';
import Login from './Components/Login';

const PrivateRoute = ({ path, component: Component, ...rest }) => {
    const isLogged = localStorage.getItem('isLogged')
    return (
        <Route path={path} {...rest} render={props => {
            if (isLogged) {
                return <Component {...props} {...rest} />
            }
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }} />
    )
}

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: {
                data: [],
                page: null,
                perPage: null,
                total: null,
                totalPage: null
            },
            user: {
                id: null,
                firstName: null,
                lastName: null,
                avatar: null
            }
        }
    }
    handleLogout = () => {
        window.localStorage.removeItem('isLogged');
    }
    getUsers = async (pageNumber = 1) => {
        let users = await window.fetch(`https://reqres.in/api/users?page=${pageNumber}`);
        users = await users.json();
        this.setState({ users })
    }
    getUser = async (userID) => {
        let response = await window.fetch(`https://reqres.in/api/users/${userID}`);
        let data = await response.json();
        this.setState({
            user: data.data
        })
    }
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
                            <li><Link to="/login" onClick={this.handleLogout}>Logout</Link></li>
                        </ul>
                    </nav>

                    <PrivateRoute path="/" exact component={Home} />
                    <PrivateRoute path="/users/:pageNumber?" component={Users} getUsers={this.getUsers} users={this.state.users} />
                    <PrivateRoute path="/user/:userID"  component={User} getUser={this.getUser} user={this.state.user} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        );
    }
}
