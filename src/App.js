import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Home from './Components/Home';
import Users from './Components/Users';
import User from './Components/User';
import Login from './Components/Login';

const PrivateRoute = ({ component: Component, render, ...rest }) => (
    <Route {...rest} render={
        render?
        render:
        props => (localStorage.getItem('isLogged') === 'true' ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {
                data: [],
                page: null,
                perPage: null,
                total: null,
                totalPage: null
            }
        }
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
                            <li><Link to="/login" onClick={this.onClickLogout}>Logout</Link></li>
                        </ul>
                    </nav>

                    <PrivateRoute path="/" exact component={Home} />



                    <PrivateRoute path="/users/:pageNumber?" render={(props)=><Users getUsers={this.getUsers} users={this.state.users} {...props} />}/>



                    <PrivateRoute path="/user/:userID" component={User} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        );
    }
    onClickLogout = () => {
        localStorage.removeItem('isLogged');
    }
    getUsers = (pageNumber = 1) => {
        console.error('getUsers');
        window.fetch('https://reqres.in/api/users?page=' + pageNumber).then((response) => {
            return response.json();
        }).then((myJson) => {
            this.setState({
                users: myJson
            })
        })
    }
}

export default App;