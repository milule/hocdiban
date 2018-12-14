import React, { Component } from 'react';
import './ExamBox.css';
import { withRouter } from "react-router-dom";

class ExamBox extends Component {
    constructor(props){
        super(props)
        this.pushExamRes = this.pushExamRes.bind(this)
    }
    pushExamRes(){
        this.props.history.push({
            pathname: '/exam/result/' + this.props.id,
            state: {
              examPoint: this.props.point,
              answer: this.props.answer,
              type: 'history'
            }
          })
    }
    render() {
        return (
            <div className="exam-container">
                <div className="exam-avatar">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR35kvMdY6HKOhIXY5OZwFETSvpzxTxwPHJK_pEERwifsLrpKk1" alt="avatar" />
                </div>
                <div className="exam-info">
                    <h3 className="exam-name">
                        {this.props.examName}
                    </h3>
                    <a hidden={this.props.point >= 0} href={'exam/' + this.props.id} className="btn btn-success">Start</a>
                    {this.props.point >= 0 ?
                        <button type="button" className="btn btn-success" onClick={this.pushExamRes}>Xem lại</button>
                        : null
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(ExamBox);