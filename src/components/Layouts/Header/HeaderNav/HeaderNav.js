import React, { Component } from 'react';
import { withRouter, NavLink, Link } from "react-router-dom";
import WebService from '../../../../ultities/WebServices';
import './HeaderNav.css';
import logo from '../../../../assets/images/logo-hocdiban.png'
class HeaderNav extends Component {

  constructor(props) {
    super(props);
    this.goToLoginPage = this.goToLoginPage.bind(this);
    this.goToRegisterPage = this.goToRegisterPage.bind(this);
    this.logout = this.logout.bind(this);
    this.webService = new WebService();
    this.state = {
      isLogged: false
    }
  }
  componentWillMount() {
    if (this.webService.loggedIn()) {
      this.setState({ isLogged: true })
    }
  }
  goToLoginPage() {
    console.log(this.props.history);
    this.props.history.push('/login')
  }
  goToRegisterPage() {
    this.props.history.push('/register')
  }
  logout(){
    this.webService.logout();
    this.props.history.replace('')
  }
  render() {
    return (
      <div>
        <nav className="navbar-custom navbar navbar-expand-xl">
          <Link to="/">
            <img className="navbar-brand" src={logo} alt=""></img>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
            </ul>
            <ul className="navbar-nav">
              <NavLink to="/lessons">
                <li className="nav-item nav-header">
                  <p className="nav-link" >BÀI GIẢNG</p>
                </li>
              </NavLink>
              <NavLink to="/exams">
                <li className="nav-item nav-header">
                  <p className="nav-link" >LUYỆN THI</p>
                </li>
              </NavLink>
              <NavLink to="/contact">
                <li className="nav-item nav-header">
                  <p className="nav-link">LIÊN HỆ</p>
                </li>
              </NavLink>
              <li className="nav-item nav-header">
                <div hidden={this.state.isLogged} >
                  <button type="button" className="btn" onClick={this.goToLoginPage}>ĐĂNG NHẬP</button>
                  <button type="button" className="btn" onClick={this.goToRegisterPage}>ĐĂNG KÍ</button>
                </div>
                <div className="user-info" hidden={!this.state.isLogged} >
                  <i className="fas fa-user-graduate fa-2x">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {this.webService.getUserName()}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a className="dropdown-item" href="/account"><i className="fas fa-edit fa-custom1"></i>Thông tin cá nhân</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="" onClick={this.logout}><i className="fas fa-sign-out-alt fa-custom2"></i>Đăng xuất</a>
                    </div>
                  </i>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(HeaderNav);
