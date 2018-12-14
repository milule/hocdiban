import React, { Component } from 'react';
import './HomeSlide.css'
import HeaderSlide1 from '../../../../assets/images/header-slide1.jpg'
class HomeSlide extends Component {
  render() {
    return (
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={HeaderSlide1} alt="First slide"></img>
            <div className="carousel-caption d-none d-md-block">
              <h1 className="slide-title">LUYỆN THI TIẾNG ANH LỚP 10</h1>
              <p className="slide-content">Ôn luyện chương trình thi Tiếng Anh vào lớp 10, với nhiều đề thi đã được tuyển chọn cùng với kiến thức được tổng hợp một cách đơn giản</p>
              <button className="slide-button" type="button"><i className="fa fa-play"></i>&nbsp; BẮT ĐẦU</button>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={HeaderSlide1} alt="First slide"></img>
            <div className="carousel-caption d-none d-md-block">
              <h1 className="slide-title">LUYỆN THI TIẾNG ANH LỚP 10</h1>
              <p className="slide-content">Ôn luyện chương trình thi Tiếng Anh vào lớp 10, với nhiều đề thi đã được tuyển chọn cùng với kiến thức được tổng hợp một cách đơn giản</p>
              <button className="slide-button" type="button"><i className="fa fa-play"></i>&nbsp; BẮT ĐẦU</button>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

export default HomeSlide;
