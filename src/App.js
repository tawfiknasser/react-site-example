import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from "react-router-dom";

import Home from './Components/Home';
import Users from './Components/Users';
import User from './Components/User';
import Login from './Components/Login';
import Loader from './Components/Loader';

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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apiURL: 'https://reqres.in/api/',
            isLoaderActive: false,
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
    handleLogin = async (email,password,redirect) => {
        let body = {
            email: email,
            password: password
          }
          let requestObject = {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }
      
          let response = await window.fetch(`${this.state.apiURL}login`, requestObject);
          let data = await response.json();
      
          if (data.token) {
            localStorage.setItem('isLogged', true);
            this.props.history.push(redirect);
          } else {
            if (data.error) {
              alert(data.error);
              return false;
            }
            alert('email or password wrong!');
          }
    }
    handleLogout = () => {
        window.localStorage.removeItem('isLogged');
    }
    getUsers = async (pageNumber = 1) => {
        this.setState({ isLoaderActive: true })
        let users = await window.fetch(`${this.state.apiURL}users?page=${pageNumber}`);
        users = await users.json();
        this.setState({ users, isLoaderActive: false });
    }
    getUser = async (userID) => {
        this.setState({ isLoaderActive: true })
        let response = await window.fetch(`${this.state.apiURL}users/${userID}`);
        let user = await response.json();
        this.setState({ user: user.data, isLoaderActive: false });
    }
    getLoaderDom() {
        if(this.state.isLoaderActive === true){
            return (<Loader />)
        }
        return false;
    }
    render() {
        const LoaderDOM = this.getLoaderDom();
        return (
            <div className="app">
                <nav className="toolbar">
                    <Link className="logo" to="/">React Site Example</Link>
                    <ul className="menu">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/users">Users</NavLink></li>
                        <li><NavLink to="/user/1">User Number 1</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><Link to="/login" onClick={this.handleLogout}>Logout</Link></li>
                    </ul>
                </nav>

                <main>
                    {LoaderDOM}
                    <PrivateRoute path="/" exact component={Home} />
                    <PrivateRoute path="/users/:pageNumber?" component={Users} getUsers={this.getUsers} users={this.state.users} />
                    <PrivateRoute path="/user/:userID"  component={User} getUser={this.getUser} user={this.state.user} />
                    <Route path="/login" render={(props)=><Login {...props} handleLogin={this.handleLogin} />} />
                </main>
            </div>
        );
    }
}

export default App