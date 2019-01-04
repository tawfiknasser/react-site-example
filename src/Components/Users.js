import React, { Component,PureComponent } from 'react';
import { Link } from "react-router-dom";

class Users extends PureComponent {
  componentDidMount() {
    console.log(this);
    console.log(this.props.route);
    console.log(this);
    let page = 1;
    if(typeof this.props.match.params.pageNumber !== 'undefined'){
      page = this.props.match.params.pageNumber;
    }
    this.props.getUsers(page);
  }
  render() {
    const usersDOM = this.getUsersDOM();
    const pagesDOM = this.getPagesDOM();
    return (
      <div className="Users">
        <h1>Users:</h1>
        {usersDOM}
        {pagesDOM}
      </div>
    );
  }
  getUsersDOM() {
    return this.props.users.data.map((value, index) => (
      <div key={value.id}>
        <Link to={'/user/' + value.id}><strong>{value.id}</strong> {value.first_name} {value.last_name}</Link>
      </div>
    ))
  }
  getPagesDOM() {
    if (this.props.users.total_pages !== null) {
      let pages = [];
      for (let pageNumber = 1; pageNumber < this.props.users.total_pages; pageNumber++) {
        pages.push(
          <Link to={'/users/' + pageNumber} key={pageNumber}>{pageNumber}</Link>
        );
      }
      return (<div className="pages">{pages}</div>);
    }
    return;
  }
}

export default Users;