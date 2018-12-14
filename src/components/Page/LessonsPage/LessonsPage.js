import React, { Component } from 'react';
import './LessonsPage.css'
import { Link } from "react-router-dom";
import SystemHelper from '../../../ultities/System.helper'
import check from '../../../assets/images/LessonPage/icon-check.png'
import tab from '../../../assets/images/LessonPage/tag-next.png'
import WebService from '../../../ultities/WebServices';

class LessonsPage extends Component {
  constructor(props) {
    super(props);
    this.webService = new WebService()
    this.helper = new SystemHelper();
    this.state = {
      lessons: []
    }
  }
  componentWillMount() {
    if (this.webService.isAdmin()) {
      this.props.history.replace('/admin');
    }
    this.webService.getLessonList()
      .then(res => {
        if (res.data) {
          this.setState({
            lessons: res.data,
          })
        }
      })
  }
  renderStar = (star, index) => {
    return (
      <img src={require('../../../assets/images/LessonPage/icon-star-' + star + '.png')} alt={'star-' + star} key={index} />
    )
  }
  renderImLevel = (imLevel) => {
    let numGold = imLevel
    let numGrey = 5 - imLevel
    let star = []
    let count = 0
    while (numGold > 0) {
      star.push(this.renderStar('gold', count))
      numGold = numGold - 1
      count = count + 1
    }
    while (numGrey > 0) {
      star.push(this.renderStar('grey', count))
      numGrey = numGrey - 1
      count = count + 1
    }
    return star
  }

  render() {
    const { lessons } = this.state
    return (
      <div className="lessons-page">
        <div className="topbar topbar-overlay">
          <div className="topbar-gray">
            <div className="topbar-text container">
              <h1>Kiến thức trọng tâm</h1>
              <p>Tổng hợp kiến thức ngữ pháp quang tiếng Anh từ cơ bản tới nâng cao,<br /> đây là những kiến thức quang
                trọng thường gặp nhất khi các bạn học tiếng Anh</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="lesson-list">
            <div className="arrow-tag clearfix">
              <img src={tab} alt="tag-next" />
              <div className="text">
                <p>Hướng dẫn ôn luyện</p>
              </div>
            </div>
            <div className="practice-text">
              <div className="one-line">
                <img src={check} alt="icon-check" />
                <p>Luyện vững những kiến thức có nhiều sao vàng, đó là những kiến thức trọng tâm<br />giúp bạn làm
                  bài tốt hơn trong bài thi của mình</p>
              </div>
              <div className="one-line">
                <img src={check} alt="icon-check" />
                <p>Bạn nên ôn luyện kiến thức theo thứ tự để nắm được đầy đủ ngữ pháp tiếng Anh</p>
              </div>
              <div className="one-line">
                <img src={check} alt="icon-check" />
                <p>Nắm chắc kiến thức và luyện nhiều đề thi để áp dụng những gì đã học thực tế hơn</p>
              </div>
            </div>
            <div className="arrow-tag clearfix">
              <img src={tab} alt="tag-next" />
              <div className="text">
                <p>Các phần kiến thức</p>
              </div>
            </div>
            <div className="lessons">
              {
                lessons.map((lesson, index) => {
                  let star = this.renderImLevel(lesson.importance)
                  let renderElement = star.map(star => {
                    return star
                  })
                  return (
                    <div key={index}>
                      <div className="one-lesson d-flex flex-row align-items-center">
                        <div className="title-lesson p-1">
                          <Link className="link-text" to={'/lessons/' + this.helper.chuyenDoiURL(lesson.name) + '.' + lesson.id}>{lesson.name}</Link>
                        </div>
                        <div className="star-lesson p-1">
                          {renderElement}
                        </div>
                        <div className="button-lesson p-1 mr-auto">
                          <Link className="btn btn-outline-success" to={'/lessons/' + this.helper.chuyenDoiURL(lesson.name) + '.' + lesson.id}>HỌC BÀI</Link>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LessonsPage;
