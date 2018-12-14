import React, { Component } from 'react';
import './ContactPage.css';

class ContactPage extends Component {
  render() {
    return (
      <div className="contact-page">
        <div className="topbar topbar-over  lay">
          <div className="topbar-gray">
            <div className="topbar-text container">
              <h1>Liên hệ</h1>
              <p>Liên lạc với chúng tôi qua số điện thoại: +84123456789</p>
              <p>hoặc qua form sau</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content">
            <div className="container-contact100">
              <div className="wrap-contact100">
                <form className="contact100-form validate-form">
                  <div className="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Name is required">
                    <span className="label-input100">Họ và tên *</span>
                    <input className="input100" type="text" name="name" placeholder="Nhập tên" />
                  </div>

                  <div className="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Email phải có dạng: ex@abc.xyz" >
                    <span className="label-input100">Email *</span>
                    <input className="input100" type="text" name="email" placeholder="Nhập email" />
                  </div>

                  <div className="wrap-input100">
                    <span className="label-input100">Số điện thoại</span>
                    <input className="input100" type="text" name="web" placeholder="+84" />
                  </div>

                  <div className="wrap-input100 validate-input" data-validate="Tin nhắn là bắt buộc">
                    <span className="label-input100">Tin nhắn</span>
                    <textarea className="input100" name="message" placeholder="Nhập thông điệp của bạn..."></textarea>
                  </div>

                  <div className="container-contact100-form-btn">
                    <div className="wrap-contact100-form-btn">
                      <div className="contact100-form-bgbtn"></div>
                      <button className="contact100-form-btn">
                        Gửi
					          	</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactPage;
