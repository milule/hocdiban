import React, { Component } from 'react';
import WebService from '../../../../ultities/WebServices';
import './HistoryPage.css'
import ExamBox from '../../ExamsPage/ExamBox/ExamBox';

class HistoryPage extends Component {
  constructor(props) {
    super(props)
    this.webService = new WebService();
    this.state = {
      testList: []
    }
  }
  componentDidMount() {
    this.webService.getListResult()
      .then(res => {
        if (res.returnCode === 1) {
          this.createExamsBox(res.data)
        }
      })
  }
  createExamsBox(testListTemp) {
    const testList = testListTemp
    let result = []
    for (let i = 0; i < testList.length; i++) {
      result.push(<ExamBox key={i} className="md-col-2"
        examName={testList[i].testId}
        id={testList[i].testId}
        point={testList[i].point}
        answer={testList[i].answer}
      />);
    }
    if (result === []) {
      this.setState({ testList: "Bạn chưa làm bài kiểm tra nào" })
    } else {
      this.setState({ testList: result })
    }
  }
  render() {
    return (
      <div className="history-acc">
        <div className="test-history-title">
          <h1>Danh sách các bài test đã làm</h1>
        </div>
        <div className="test-list-history">
          {this.state.testList}
        </div>
      </div>
    );
  }
}

export default HistoryPage;
