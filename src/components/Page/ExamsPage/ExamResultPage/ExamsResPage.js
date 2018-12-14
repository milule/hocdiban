import React, { Component } from 'react';
import WebService from '../../../../ultities/WebServices';
import './ExamsResPage.css'
class ExamsResPage extends Component {
  constructor(props) {
    super(props);
    this.webService = new WebService();
    this.handleDataAPI = this.handleDataAPI.bind(this);
    this.handleSubDataAPI = this.handleSubDataAPI.bind(this);
    this.popToExams = this.popToExams.bind(this);
    this.state = {
      examName: '',
      examQues: {
        I_arr: [],
        II_arr: [],
        III_arr: [],
        IV_arr: [],
        V_arr: {
          type1: [],
          type2: []
        }
      },
      examAns: [],
      answer: [],
    }
    this.state = this.props.location.state && this.props.location.state.type === 'exam' ? this.props.location.state : this.state;
    this.idExam = this.props.match.params.id;
  }
  componentWillMount() {
    if (!this.props.location.state) {
      this.props.history.replace('/exams');
      return
    } else if (this.webService.isAdmin()) {
      this.props.history.replace('/admin');
      return;
    } else if (!this.webService.isUser()) {
      this.props.history.replace('/login');
      return;
    }
    if (this.props.location.state.type === 'history') {
      this.handleSubDataAPI()
    } else {
      this.setState({
        score: 0,
        rightAns: 0,
        wrongAns: 0
      }, () => {
        this.getPoint();
      })
    }
  }
  handleSubDataAPI() {
    const self = this;
    let examName = '';
    let examQues = {
      I_arr: [],
      II_arr: [],
      III_arr: [],
      IV_arr: [],
      V_arr: {
        type1: [],
        type2: []
      }
    }
    let examAns = []
    this.webService.getTest(this.idExam).then(res => {
      if (res.returnCode === -6) {
        this.webService.logout();
        this.props.popup({ title: 'Phiên của bạn đã hết hạn', mess: '' });
        this.props.history.push('');
      } else if (res.returnCode !== 1) {
        this.props.history.replace('/exams');
        this.props.popup({ title: 'Không tìm thấy bài kiểm tra', mess: '' });
        return;

      } else {
        if (res && res.data) {
          const examAnsTemp = res.data.answer
          const data = res.data
          examName = data.name;
          for (let j = 0; j < examAnsTemp.length; j++) {
            if (examAnsTemp[j].length < 2) {
              examAns.push(examAnsTemp[j])
            } else if (this.checkObject(examAnsTemp[j]) === true) {
              let testTemp = JSON.parse(examAnsTemp[j])
              for (let k = 0; k < testTemp.length; k++) {
                examAns.push(testTemp[k])
              }
            }
          }
          for (let i = 0; i < data.content.length; i++) {
            if (data.content[i].type === QUES_TYPE.PRONUN) {
              examQues.I_arr.push(data.content[i]);
            } else if (data.content[i].type === QUES_TYPE.WORD) {
              examQues.II_arr.push(data.content[i]);
            } else if (data.content[i].type === QUES_TYPE.MISTAKE) {
              examQues.III_arr.push(data.content[i]);
            } else if (data.content[i].type === QUES_TYPE.PASS) {
              examQues.IV_arr.push(data.content[i]);
            } else if (data.content[i].type === QUES_TYPE.REWRITE1) {
              examQues.V_arr.type1.push(data.content[i]);
            } else {
              examQues.V_arr.type2.push(data.content[i]);
            }
          }
          self.setState({ examName: examName, examQues: examQues, examAns: examAns, answer: self.props.location.state.answer }
            , () => {
              self.setState({
                score: 0,
                rightAns: 0,
                wrongAns: 0
              }, () => {
                self.getPointHistory()
              })
            })
        }
      }
    })
  }
  handleDataAPI(idExam, score, answer) {
    answer = JSON.stringify(answer)
    this.webService.insertResult(idExam, score, answer)
      .then(res => {

      });
  }
  checkObject(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  getPoint() {
    let rightAns = 0;
    let wrongAns = 0;
    let score = 0;
    for (let i = 0; i < this.state.answer.length; i++) {
      if (this.state.answer[i] === this.state.examAns[i]) {
        rightAns = rightAns + 1;
      } else {
        wrongAns = wrongAns + 1;
      }
    }
    score = rightAns / (rightAns + wrongAns) * 10;
    score = score.toFixed(1);
    this.setState({
      score: score,
      rightAns: rightAns,
      wrongAns: wrongAns
    }, () => {
      this.handleDataAPI(this.idExam, this.state.score, this.state.answer);
    })
  }
  getPointHistory() {
    let rightAns = 0;
    let wrongAns = 0;
    for (let i = 0; i < this.state.answer.length; i++) {
      if (this.state.answer[i] === this.state.examAns[i]) {
        rightAns = rightAns + 1;
      } else {
        wrongAns = wrongAns + 1;
      }
    }
    this.setState({
      score: this.props.location.state.examPoint,
      rightAns: rightAns,
      wrongAns: wrongAns
    })
  }
  createChooseAns(numQues, answerData, content) {
    const answer = this.state.answer[numQues - 1];
    const answerExam = this.state.examAns[numQues - 1];
    const answerBool = answer === answerExam ? true : false;
    const correctAnsContent = this.getAnsContent(answerExam, answerData);
    return (
      <div key={numQues} className="ques">
        <div className="ques-num">
          Câu {numQues}: {content}
        </div>
        <div className="form-check">
          <input disabled className="form-check-input" type="radio" name={numQues} id={numQues} value="A"
            checked={answer === "A" ? true : false}></input>
          <label className="form-check-label">
            A. {answerData.A}
          </label>
        </div>
        <div className="form-check">
          <input disabled className="form-check-input" type="radio" name={numQues} id={numQues} value="B"
            checked={answer === "B" ? true : false}></input>
          <label className="form-check-label">
            B. {answerData.B}
          </label>
        </div>
        <div className="form-check">
          <input disabled className="form-check-input" type="radio" name={numQues} id={numQues} value="C"
            checked={answer === "C" ? true : false}></input>
          <label className="form-check-label">
            C. {answerData.C}
          </label>
        </div>
        <div className="form-check">
          <input disabled className="form-check-input" type="radio" name={numQues} id={numQues} value="D"
            checked={answer === "D" ? true : false}></input>
          <label className="form-check-label">
            D. {answerData.D}
          </label>
        </div>
        {this.createCorrectAns(numQues, answerBool, correctAnsContent)}
      </div>
    )
  }
  createTypeAns(numQues, content, startWith) {
    const answer = this.state.answer[numQues - 1];
    const answerExam = this.state.examAns[numQues - 1];
    const answerBool = answer === answerExam ? true : false;
    return (
      <div key={numQues} className="ques">
        <div className="ques-num">
          Câu {numQues}: {content}
        </div>
        <div className="form-input">
          {startWith ? <div className="rewrite-2-sw">Start With: <b>{startWith}</b></div> : null}
          <input disabled type="text" className="form-control" id={numQues} name={numQues} placeholder="Vui lòng nhập câu trả lời tại đây ..."></input>
        </div>
        {this.createCorrectAns(numQues, answerBool, answerExam)}
      </div>
    )
  }
  createCorrectAns(numQues, answerBool, correctAnsContent) {
    return (
      <div className="exam-reuslt">
        <p>
          <button disabled className={"btn " + (answerBool ? "btn-notifiT" : "btn-notifiF")}>{answerBool ? 'Đúng' : 'Sai'}</button>
          <button className="btn btn-success" type="button" data-toggle="collapse" data-target={"#controlcollapse" + numQues} aria-expanded="false" aria-controls={"#controlcollapse" + numQues}>Xem đáp án</button>
        </p>
        <div className="collapse-result">
          <div className="collapse multi-collapse" id={"controlcollapse" + numQues}>
            <div className="card card-body">
              {correctAnsContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
  convertToAns(str) {
    let answerJson = {
      A: '',
      B: '',
      C: '',
      D: ''
    }
    let answerArr = str.match(/\(.*?\)/g);
    answerArr = answerArr.map(function (match) { return match.slice(1, -1); });
    answerJson.A = answerArr[0];
    answerJson.B = answerArr[1];
    answerJson.C = answerArr[2];
    answerJson.D = answerArr[3];
    return answerJson;
  }
  getAnsContent(ans, ansContent) {
    let ansTem = '';
    if (ans === 'A') {
      ansTem = ansContent.A;
    } else if (ans === 'B') {
      ansTem = ansContent.B;
    } else if (ans === 'C') {
      ansTem = ansContent.C;
    } else if (ans === 'D') {
      ansTem = ansContent.D;
    }
    return ansTem;
  }
  popToExams() {
    if (this.props.location.state.type === 'exam') {
      this.props.history.push('/exams');
    } else {
      this.props.history.push('/account/history');
    }
  }
  render() {
    const examsQues = this.state.examQues;
    const examName = this.state.examName;
    const score = this.state.score;
    const rightAns = this.state.rightAns;
    const wrongAns = this.state.wrongAns;
    let numQues = 0;
    return (
      <div className="exam-detail">
        <div className="row">
          <div className="col-sm-3 col-md-3">
            <div className="tutorial">
              <div className="tut-box">
                <h5>KẾT QUẢ THI</h5>
                <div className="exam-tut">
                  <div className="exam-score">
                    <h2>{score} điểm</h2>
                  </div>
                  <div className="exam-score-detail">
                    <h5><i className="fas fa-question ico-1"></i>&nbsp;Tổng số câu hỏi: {rightAns + wrongAns}</h5>
                    <h5 className="ico-2"><i className="fas fa-check"></i>Số câu đúng: {rightAns}</h5>
                    <h5 className="ico-3"><i className="fas fa-times"></i>&nbsp;Số câu sai: {wrongAns}</h5>
                  </div>
                  <div className="exam-submit">
                    <button className="btn exam-submit-btn" onClick={this.popToExams}>Quay về</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-9 col-md-9">
            <div className="exam-content-info">
              <div className="exam-content-title">
                <h4>Nội dung đề thi trắc nghiệm</h4>
              </div>
              <div className="exam-content-info">
                <h5>Đề thi trắc nghiệm "Thi online đề thi thử môn tiếng Anh vào lớp 10 THPT Quốc Gia 2018 của bộ có cấu trúc 60% kiến thức cơ bản và 40% kiến thức nâng cao
              và độ khó tăng dần theo từng câu hỏi. Cấu trúc ra đề được biên soạn theo định hướng mới của bộ GD & ĐT giúp các em có những trải nghiệm thực tế"</h5>
                <br></br>
                <div className="d-flex flex-row flex-wrap exam-content-info-custom">
                  <h5><i className="far fa-clock time"></i> Thời gian: 60 phút</h5>
                  <h5><i className="far fa-question-circle num-ques"></i> Số câu hỏi: 50 câu</h5>
                </div>
              </div>
            </div>
            <div className="exam-question box">
              <div className="content">
                <div className="exam-question-title">
                  <h3>{examName}</h3>
                </div>
                <div className="exam-question-content">
                  <form ref="test" id="exam-form" onSubmit={(e) => this.handleFormExamSubmit(e)}>
                    <div className="exam-part-1">
                      <h4>I. Choose the word whose underlined part is pronounced differently from the others.</h4>
                      {
                        examsQues.I_arr.map((pronuData) => {
                          numQues += 1;
                          return (
                            this.createChooseAns(numQues, pronuData.content.answer)
                          )
                        })
                      }
                    </div>
                    <div className="exam-part-2">
                      <h4>II. Choose the best answer from the four options given (marked A, B, C, or D) to complete each sentence.</h4>
                      {
                        examsQues.II_arr.map((wordData) => {
                          numQues += 1;
                          return (
                            this.createChooseAns(numQues, wordData.content.answer, wordData.content.content)
                          )
                        })
                      }
                    </div>
                    <div className="exam-part-3">
                      <h4>III. Identify the underlined word/ phrase (A or B, C, D) that needs correcting to become an exact one. </h4>
                      {
                        examsQues.III_arr.map((mistakeData) => {
                          numQues += 1;
                          return (
                            this.createChooseAns(numQues, this.convertToAns(mistakeData.content.content), mistakeData.content.content)
                          )
                        })
                      }
                    </div>
                    <div className="exam-part-4">
                      <h4>IV. Read the following passage, then choose the correct answer to question. </h4>
                      {
                        examsQues.IV_arr.map((passageData, index) => {
                          return (
                            <div key={"passage" + index}>
                              <div className="exam-passage">
                                {passageData.content.passage}
                              </div>
                              {
                                passageData.content.questions.map((passageQues) => {
                                  numQues += 1;
                                  return (
                                    this.createChooseAns(numQues, passageQues.answer, passageQues.content)
                                  )
                                })
                              }
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="exam-part-5">
                      <h4>V. Complete the second sentence so that it has a similar meaning to the first one. </h4>
                      <div className="rewrite-1">
                        {
                          examsQues.V_arr.type1.map((rewrite1Data) => {
                            numQues += 1;
                            return (
                              this.createTypeAns(numQues, rewrite1Data.content.content)
                            )
                          })
                        }
                      </div>
                      <div className="rewrite-2">
                        {
                          examsQues.V_arr.type2.map((rewrite2Data) => {
                            numQues += 1;
                            this.state.examAns.push(rewrite2Data.correctAnswer);
                            return (
                              this.createTypeAns(numQues, rewrite2Data.content.content, rewrite2Data.content.startWith)
                            )
                          })
                        }
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const QUES_TYPE = {
  WORD: "CHOOSE_WORD",
  PASS: "CHOOSE_PASSAGE",
  PRONUN: "PRONUNCIATION",
  MISTAKE: "FIND_MISTAKE",
  REWRITE1: "REWRITE_1",
  REWRITE2: "REWRITE_2",
}

export default ExamsResPage;
