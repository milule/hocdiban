
import React, { Component } from "react";
import "./AccPage.css";
import { NavLink } from "react-router-dom";
import Testimg from "../../../assets/images/abc.jpg";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import HistoryPage from "./HistoryPage";
import WebService from "../../../ultities/WebServices";

class AccPage extends Component {
  constructor(props) {
    super(props);
    this.webService = new WebService();
  }
  componentWillMount() {
    if (this.webService.isAdmin()) {
      this.props.history.replace('/admin');
      return;
    } else if (!this.webService.isUser()) {
      this.props.history.replace('/login');
      return;
    }
  }
  render() {
    return (
      <div className="account-page">
        <div className="NavBar">
          <Navbar />
        </div>
        <div className="content-account">
          <div className="account">
            <Switch>
              <Route exact path="/account/info" component={Detailinfo} />
              <Route exact path="/account/history" component={HistoryPage} />
              <Route exact render={() => <Redirect to="/account/info" />} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <ul className="sidebar sidebar-account navbar-nav">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/accountinfo"
              activeClassName="active-cus"
            >
              <div className="text-center">
                <img src={Testimg} className="rounded" alt="avatar" />
              </div>
              <h2> TRần Văn Chí Phèo</h2>
            </NavLink>
          </li>
          <div className="nav-item-custom">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/account/info"
                activeClassName="active-cus"
              >
                <i className="fas fa-book-reader" />
                <span> Thông Tin tài Khoản</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/account/history"
                activeClassName="active-cus"
              >
                <i className="fas fa-fw fa-tachometer-alt" />
                <span> Lịch Sử</span>
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    );
  }
}
class Detailinfo extends Component {
  constructor(props) {
    super(props);
    this.webService = new WebService();
  }
  componentWillMount() {
    if (this.webService.isAdmin()) {
      this.props.history.replace('/admin');
      return;
    } else if (!this.webService.isUser()) {
      this.props.history.replace('/login');
      return;
    }
  }
  render() {
    return (
      <div className="form-update">
        <form>
          <div className="form-title">
            <h2>Thông Tin Cá Nhân</h2>
          </div>
          <div className="form-group form-inline col-md-12">
            <div className="form-inline col-md-6">
              <div className="col-md-3">
                <label htmlFor="name">Họ Tên</label>
              </div>
              <div className="col-md-9 input-inf">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value="Trần văn Chí Phèo"
                  require=""
                />
              </div>
            </div>
            <div className="form-inline col-md-6">
              <div className="col-md-3">
                <label htmlFor="dob">Ngày Sinh</label>
              </div>
              <div className="col-md-9 input-inf">
                <input
                  type="text"
                  className="form-control"
                  id="dob"
                  value="22/11/2002"
                />
              </div>
            </div>
          </div>
          <div className="form-group form-inline col-md-12">
            <div className="form-inline col-md-6">
              <div className="col-md-3">
                <label htmlFor="gender">Giới Tính</label>
              </div>
              <div className="col-md-9 input-inf">
                <select className="custom-select" id="gender">
                  <option value="1">Nam</option>
                  <option value="1">Nữ</option>
                </select>
              </div>
            </div>
            <div className="form-inline col-md-6">
              <div className="col-md-3">
                <label htmlFor="school">Trường</label>
              </div>
              <div className="col-md-9 input-inf">
                <input
                  type="text"
                  className="form-control"
                  id="school"
                  value="THPT Nguyễn Du"
                />
              </div>
            </div>
          </div>

          <div className="form-group form-inline col-md-12">
            <div className="form-inline col-md-6">
              <div className="col-md-3">
                <label htmlFor="adress">Địa Chỉ</label>
              </div>
              <div className="col-md-9 input-inf">
                <input
                  type="text"
                  className="form-control"
                  id="adress"
                  value="Thiên đàng"
                  require=""
                />
              </div>
            </div>
            <div className="form-inline col-md-6">
              <div className="col-md-3">
                <label htmlFor="email">Email</label>
              </div>
              <div className="col-md-9 input-inf">
                <input
                  type="text"
                  disabled
                  className="form-control"
                  id="email"
                  value="pheopheo@gmail.com"
                />
              </div>
            </div>
          </div>

          <div className="submit-button">
            <button className="btn btn-success" type="button" id="btnsave">
              Lưu
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AccPage);
