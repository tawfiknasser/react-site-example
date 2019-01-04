import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('isLogged') === 'true') {
      this.props.history.push('/');
    }
    this.state = {
      email: '',
      password: ''
    }
  }
  render() {
    return (
      <form className="login" onSubmit={this.onSubmitLogin}>
        <h1>Login:</h1>
        <p>email: peter@klaven<br />password: cityslicka</p>
        <label htmlFor="email">Email:</label> <input id="email" value={this.state.email} onChange={this.onChangeEmail} type="text" placeholder="Email" /><br />
        <label htmlFor="password">Password:</label> <input id="password" autoComplete="on" value={this.state.password} onChange={this.onChangePassword} type="password" placeholder="Password" /><br />
        <input type="submit" value="Login" />
      </form>
    );
  }
  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }
  onSubmitLogin = (e) => {
    e.preventDefault();
    let body = {
      email: this.state.email,
      password: this.state.password
    }
    window.fetch('https://reqres.in/api/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((response) => {
      return response.json();
    }).then((myJson) => {
      if (myJson.token) {
        localStorage.setItem('isLogged', true);
        this.props.history.push('/');
      } else {
        if (myJson.error) {
          alert(myJson.error);
          return false;
        }
        alert('email or password wrong!');
      }
    });
  }
}

export default Login;