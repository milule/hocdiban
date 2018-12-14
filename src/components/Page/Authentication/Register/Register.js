import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import DatePicker from 'react-datepicker';
import './Register.css'
import 'react-datepicker/dist/react-datepicker.css';
import WebService from '../../../../ultities/WebServices';
import SystemHelper from '../../../../ultities/System.helper'
import IconRegister from '../../../../assets/images/icon-login.svg'
class Register extends Component {
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
      <div className="register">
        <RegisterForm popup={this.props.popup} history={this.props.history} webService={this.webService} />
      </div>
    );
  }
}

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.helper = new SystemHelper();
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleFormRegisterSubmit = this.handleFormRegisterSubmit.bind(this);
    this.state = {
      errTitle: 'Đăng nhập thất bại',
      validate: {
        err: false,
        mess: ''
      },
      date: null,
    }
  }
  handleChangeDate(date) {
    this.setState({ date: date })
  }
  handleFormRegisterSubmit(e) {
    e.preventDefault();
    const valid = this.helper.checkValidaRegister(e);
    if (valid && valid.err === true) {
      this.props.popup({ title: this.state.errTitle, mess: valid.errMess });
    } else {
      this.props.webService.register(e.target.username.value, e.target.password.value, e.target.name.value,
        e.target.dob.value.replace(/\//g, "-"), e.target.sex.value, e.target.address.value, e.target.school.value)
        .then(res => {
          if (res.returnCode === 1) {
            this.props.popup({ title: res.returnMessage, mess: 'Bạn đã đăng kí thành công' });
            this.props.history.replace('/');
          } else {
            this.props.popup({ title: this.state.errTitle, mess: res.returnMessage });
          }
        })
        .catch(err => {
          this.props.popup({ title: this.state.errTitle, mess: 'timeout' });
        })
    }
  }

  render() {
    return (
      <div className="register-form wrapper fadeInDown">
        <div id="formContentRegister">
          <div className="form-title">
            <h2 className="active"> Đăng kí </h2>
          </div>
          <div className="fadeIn first">
          </div>
          <div className="fadeIn first">
            <img src={IconRegister} id="icon-register" alt="User Icon" />
          </div>
          <form onSubmit={this.handleFormRegisterSubmit} className="form-input">
            <div className="form-display">
              <input type="text" id="username" className="fadeIn second" name="register" placeholder="Tài khoản" maxLength="20"></input>
              <input type="text" id="password" className="fadeIn third pass" name="register" placeholder="Mật khẩu" autoComplete="off" maxLength="20"></input>
            </div>
            <div className="form-display">
              <input type="text" id="name" className="fadeIn third" name="register" placeholder="Tên" maxLength="50"></input>
              <DatePicker
                selected={this.state.date}
                className="fadeIn third"
                id="dob"
                onChange={this.handleChangeDate}
                placeholderText="Ngày sinh" />
            </div>
            <div className="form-display">
              <input type="text" id="sex" className="fadeIn third" name="register" placeholder="Giới tính"></input>
              <input type="text" id="address" className="fadeIn third" name="register" placeholder="Địa chỉ"></input>
            </div>
            <div>
              <input type="text" id="school" className="fadeIn third" name="register" placeholder="Trường"></input>
            </div>
            <div className="register-submit">
              <input type="submit" className="fadeIn fourth" value="Đăng kí"></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default withRouter(Register);
