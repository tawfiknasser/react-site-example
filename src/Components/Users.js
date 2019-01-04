import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: null,
      perPage: null,
      total: null,
      totalPage: null
    }
    let page = 1;
    if(typeof this.props.match.params.pageNumber !== 'undefined'){
      page = this.props.match.params.pageNumber;
    }
    this.getUsers(page);
  }

  componentWillReceiveProps(nextProps) {
    this.getUsers(nextProps.match.params.pageNumber);
  }
  getUsers(pageNumber=1) {
    window.fetch('https://reqres.in/api/users?page=' + pageNumber).then((response) => {
      return response.json();
    }).then((myJson) => {
      this.setState({
        data: myJson.data,
        page: myJson.data,
        perPage: myJson.per_page,
        total: myJson.total,
        totalPages: myJson.total_pages
      })
    })
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
    if (this.state.data.length > 0) {
      return this.state.data.map((value, index) => (
        <div key={value.id}>
          <Link to={'/user/' + value.id}><strong>{value.id}</strong> {value.first_name} {value.last_name}</Link>
        </div>
      ))
    }
    return [];
  }
  getPagesDOM() {
    if (this.state.totalPages !== null) {
      let pages = [];
      for (let pageNumber = 1; pageNumber < this.state.totalPages; pageNumber++) {
        pages.push(
          <Link to={'/users/' + pageNumber}  key={pageNumber}>{pageNumber}</Link>
        );
      }
      return (<div className="pages">{pages}</div>);
    }
    return;
  }
}

export default Users;