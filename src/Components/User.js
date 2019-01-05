import React, { Component } from 'react';

class User extends Component {
  componentDidMount() {
    if (this.userID) {
      this.props.getUser(this.userID);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userID !== this.userID) {
      this.props.getUser(this.userID);
    }
  }
  get userID() {
    return this.props.match.params.userID
  }
  render() {
    return (
      <div className="User">
        <h1>User:</h1>
        <strong>ID:</strong> <span>{this.props.user.id}</span><br />
        <strong>First Name:</strong> <span>{this.props.user.first_name}</span><br />
        <strong>Last Name:</strong> <span>{this.props.user.last_name}</span><br />
        <strong>Avatar:</strong> <img src={this.props.user.avatar} alt={this.props.user.first_name + ' ' + this.props.user.last_name} />
      </div>
    );
  }
}

export default User;