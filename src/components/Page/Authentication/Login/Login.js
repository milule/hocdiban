import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './Login.css'
import WebService from '../../../../ultities/WebServices';
import IconLogin from '../../../../assets/images/icon-login.svg'

class Login extends Component {
  constructor(props) {
    super(props);
    this.webService = new WebService();

  }
  componentWillMount() {
    if (this.webService.isAdmin()) {
      this.props.history.replace('/admin');
      return;
    } else if (this.webService.isUser()) {
      this.props.history.replace('');
      return;
    }
  }
  render() {
    return (
      <div className="login">
        <LoginForm popup={this.props.popup} history={this.props.history} webService={this.webService} />
      </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormLoginSubmit = this.handleFormLoginSubmit.bind(this);
    this.state = {
      errTitle: 'Đăng nhập thất bại'
    }
  }
  handleFormLoginSubmit(e) {
    e.preventDefault();
    this.props.webService.login(e.target.username.value, e.target.password.value)
      .then(res => {
        if (res.returnCode !== 1) {
          this.props.popup({ title: this.state.errTitle, mess: res.returnMessage });
        } else {
          const data = res.data;
          if (res && res.data) {
            this.props.webService.setInfo(data.token, data.userName, data.permission)
          }
          window.location.reload()
          if (data.permission === 'admin') {
            this.props.history.push('/admin');

          } else {
            this.props.history.push('/');
          }
        }
      })
  }
  render() {
    return (
      <div className="login-form wrapper fadeInDown">
        <div id="formContentLogin">
          <div className="form-title">
            <h2 className="active"> Đăng nhập </h2>
          </div>
          <div className="fadeIn first">
            <img src={IconLogin} id="icon-login" alt="User Icon" />
          </div>
          <form onSubmit={this.handleFormLoginSubmit}>
            <input type="text" id="username" className="fadeIn second" name="login" placeholder="Tài khoản" onChange={this.handleChange}></input>
            <input type="text" id="password" className="fadeIn third pass" name="login" placeholder="Mật khẩu" autoComplete="off" onChange={this.handleChange}></input>
            <input type="submit" className="fadeIn fourth" value="Đăng nhập"></input>
          </form>
          <div id="formFooter">
            <a className="underlineHover" href="">Quên mật khẩu?</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
