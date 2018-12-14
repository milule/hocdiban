import React, { Component } from 'react';
import WebService from '../../../../ultities/WebServices';

import CommentBox from '../../../CommentBox/CommentBox';

import './LessonsDetPage.css'

class LessonsDetPage extends Component {
  constructor(props) {
    super(props);
    this.webService = new WebService()
    this.state = {
      id: this.props.match.params.id,
      lesson: ''
    }
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
  componentDidMount = () => {
    const { id } = this.state
    this.webService.getLesson(id)
      .then(res => {
        if (res.data) {
          this.setState({
            lesson: res.data,
          })
        }
      })
  }
  render() {
    const { lesson } = this.state
    let exHTML
    if (lesson) {
      exHTML = lesson.content
    }

    return (
      <div className="container lesson-detail">
        {
          <div className="row">
            <div className="col-md-12">
              <h3>{lesson.name}</h3>
              <div className="lesson-content" dangerouslySetInnerHTML={{ __html: exHTML }}>
              </div>
              <br></br>
              <br></br>
              <br></br>
            </div>
            <div className="col-md-8 offset-md-2 comment-box-wrapper">
              <CommentBox
                lessonId={this.state.id}
                username={this.webService.getUserName()}
              />
            </div>
          </div>
        }
      </div>


    )
  }
}

export default LessonsDetPage;