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
  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }
  onSubmitLogin = (e) => {
    e.preventDefault();
    this.props.handleLogin(this.state.email,this.state.password,this.redirectAfterLogin);
  }
  get redirectAfterLogin() {
    const isStateExist = typeof this.props.location.state !== 'undefined';

    let redirect  = '/';
    if(isStateExist && this.props.location.state.from.pathname){
      redirect = this.props.location.state.from.pathname;
    }

    return redirect;
  }
  render() {
    return (
      <form className="login form" onSubmit={this.onSubmitLogin}>
        <h1>LOGIN</h1>
        <p>Please enter email and password (it does not matter which)</p>
        <div className="form-row"><label htmlFor="email">Email:</label> <input id="email" value={this.state.email} onChange={this.onChangeEmail} type="email" placeholder="Email (it does not matter which)" required /></div>
        <div className="form-row"><label htmlFor="password">Password:</label> <input id="password" autoComplete="on" value={this.state.password} onChange={this.onChangePassword} type="password" placeholder="Password (it does not matter which)" required /></div>
        <div className="form-row"><input type="submit" value="Login" /></div>
      </form>
    );
  }
}

export default Login;