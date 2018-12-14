import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './AdNav.css'

class AdNav extends Component {
  render() {
    return (
      <div>
        <ul className="sidebar navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/dashboard" activeClassName="active-cus">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span> Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/lesson" activeClassName="active-cus">
              <i className="fas fa-book-reader"></i>
              <span> Bài giảng</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/exam" activeClassName="active-cus">
              <i className="fas fa-fw fa-table"></i>
              <span> Đề thi</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/account" activeClassName="active-cus">
              <i className="fas fa-user-circle"></i>
              <span> Account</span>
            </NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default AdNav;
