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
      <div className="user">
        <h1>USER #{this.props.user.id}</h1>
        <div className="card">
          <div className="card-img">
            <img src={this.props.user.avatar} alt={this.props.user.first_name + ' ' + this.props.user.last_name} />
          </div>
          <div className="card-label">
            <strong>ID</strong> <span>{this.props.user.id}</span>
          </div>
          <div className="card-label">
            <strong>First name</strong> <span>{this.props.user.first_name}</span>
          </div>
          <div className="card-label">
            <strong>Last name</strong> <span>{this.props.user.last_name}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default User;