import React, { Component } from 'react';
import './Footer.css';
import logo from '../../../assets/images/logo-hocdiban.png'
class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer">
          <div className="row">
            <div className="col-sm-6 col-md-6">
              <div className="column">
                <img src={logo} width="350" alt=""></img>
                <p>Nâng cao kiến thức, nâng tầm vóc <br></br> con người bạn mỗi ngày</p>
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <div className="column">
                <h1>TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN</h1>
                <h4>Khoa Công Nghệ Thông Tin</h4>
                <div className="info">
                  <div>Địa chỉ:<span className="info-custom"> 227 Nguyễn Văn Cừ, Q5, Hồ Chí Minh</span></div>
                  <div>Nhóm lớn:<span className="info-custom"> Số 8</span></div>
                  <div>Đề tài:<span className="info-custom"> Website luyện thi vào lớp 10 môn Tiếng Anh</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
