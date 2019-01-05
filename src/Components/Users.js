import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Users extends Component {
  componentWillMount(){ 
    this.props.getUsers(this.pageNumber);
  }
  getUsersDOM() {
    let usersDom = this.props.users.data.map((value, index) => (
      <li key={value.id}>
        <Link to={'/user/' + value.id}><strong>{value.id}</strong> {value.first_name} {value.last_name}</Link>
      </li>
    ));
    return (<ul className="list">{usersDom}</ul>);
  }
  getPagesDOM() {
    if (this.props.users.total_pages !== null) {
      let pages = [];
      for (let pageNumber = 1; pageNumber < this.props.users.total_pages; pageNumber++) {
        pages.push(
          <Link to={'/users/' + pageNumber} key={pageNumber} onClick={ () => this.handleClickPage(pageNumber) }>{pageNumber}</Link>
        );
      }
      return (<div className="pages">{pages}</div>);
    }
    return;
  }
  handleClickPage = (pageNumber) => {
    if(this.props.users.page !== pageNumber){
      this.props.getUsers(pageNumber);
    }
  }
  get pageNumber() {
    let isPageNumber = typeof this.props.match.params.pageNumber !== 'undefined';
    return (isPageNumber?this.props.match.params.pageNumber:1)
  }
  render() {
    const usersDOM = this.getUsersDOM();
    const pagesDOM = this.getPagesDOM();
    return (
      <div className="Users">
        <h1>USERS</h1>
        {usersDOM}
        {pagesDOM}
      </div>
    );
  }
}

export default Users;