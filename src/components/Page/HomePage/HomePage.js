import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import WebService from '../../../ultities/WebServices';
import HomeSlide from './HomeSlide'
import './HomePage.css'
import homepage from '../../../assets/images/about.png'
import learn1 from '../../../assets/images/learn.png'
import learn2 from '../../../assets/images/learn1.png'
import learn3 from '../../../assets/images/learn2.png'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.webService = new WebService();
  }
  componentWillMount() {
    if (this.webService.loggedIn() && this.webService.isAdmin()) {
      this.props.history.replace('/admin');
    }
  }
  render() {
    return (
      <div className="home-page">
        <HomeSlide />
        <HomeBody1 />
        <HomeBody2 />
      </div>
    );
  }
}

class HomeBody1 extends Component {
  render() {
    return (
      <div className="homebody1">
        <div className="container">
          <div className="row row0">
            <div className="text-col1-custom">
              <h2>Chào mừng bạn!</h2>
              <p>Hãy đồng hành cùng chúng tôi để vượt qua kì thi tuyển vào lớp 10 môn Tiếng Anh với khả năng của chúng tôi.</p>
              <div className="row-intro">
                <div className="row icon">
                  <div className="ico-homepage">
                    <i className="fas fa-graduation-cap fa-4x fas-custom"></i>
                  </div>
                  <div className="text-homepage">
                    <h3>Luyện thi online</h3>
                    <p>Ôn tập kiến thức, luyện các đề thi chấy lượng và đề thi của các năm. Theo sau đó là kết quả giảng giải sinh động.</p>
                  </div>
                </div>
                <div className="row icon">
                  <div className="ico-homepage">
                    <i className="fas fa-chalkboard-teacher fa-4x fas-custom"></i>
                  </div>
                  <div className="text-homepage">
                    <h3>Học từ giáo viên</h3>
                    <p>Được hướng dẫn chi tiết về kiến thức một cách dễ hiểu trực quan của những giao viên giỏi nhiều năm kinh nghiệm trong nghề giáo.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="img-homepage">
              <img className="img-custom" src={homepage} alt=""></img>
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  }
}

class HomeBody2 extends Component {
  render() {
    return (
      <div className="homebody2">
        <div className="title-content container">
          <h2>4 bước học hiệu quả</h2>
          <p>Thực hành luyện thi online vào lớp 10 môn tiếng anh hiệu qủa với 4 bước</p>
        </div>
        <div className="row row1">
          <div className="col-sm-4 col-md-4">
            <img className="img-learn" src={learn1} alt=""></img>
            <h3>Ôn luyện kiến thức</h3>
            <p>Thực hành, luyện tập kiến thức cơ bản, nắm kiến thức</p>
          </div>
          <div className="col-sm-4 col-md-4">
            <img className="img-learn" src={learn2} alt=""></img>
            <h3>Luyện bộ đề thi</h3>
            <p>Luyện giáo trình luyện thi chuyên nghiệp, đạt tiêu chuẩn quốc gia</p>
          </div>
          <div className="col-sm-4 col-md-4">
            <img className="img-learn" src={learn3} alt=""></img>
            <h3>Luyện đề thi các năm</h3>
            <p>Luyện đề thi của các năm, đưa ra đánh giá khả quan về năng lực</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
