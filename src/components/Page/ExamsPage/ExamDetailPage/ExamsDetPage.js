import React, { Component } from 'react';
import './ExamsDetPage.css';
import Countdown from 'react-countdown-now';
import clock from '../../../../assets/images/clock.png';
import WebService from '../../../../ultities/WebServices';

import CommentBox from '../../../CommentBox/CommentBox';

class ExamsDetPage extends Component {
  constructor(props) {
    super(props);
    this.webService = new WebService();
    this.handleDataAPI = this.handleDataAPI.bind(this);
    this.timeOut = this.timeOut.bind(this);
    this.handleFormExamSubmit = this.handleFormExamSubmit.bind(this);
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
      time: Date.now() + 3600000,
      timeout: false
    }
    this.idExam = this.props.match.params.id
  }
  componentWillMount() {
    if (this.webService.isAdmin()) {
      this.props.history.replace('/admin');
      return;
    } else if (!this.webService.isUser()) {
      this.props.history.replace('/login');
      return;
    }
    this.handleDataAPI();
  }
  handleDataAPI() {
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
          const data = res.data
          examName = data.name;
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
          self.setState({ examName: examName, examQues: examQues })
        }
      }
    })
  }
  createChooseAns(numQues, answerData, content) {
    return (
      <div key={numQues} className="ques">
        <div className="ques-num">
          Câu {numQues}: {content}
        </div>
        <div className="form-check">
          <input disabled={this.state.timeout} className="form-check-input" type="radio" name={numQues} id={numQues} value="A"></input>
          <label className="form-check-label">
            A. {answerData.A}
          </label>
        </div>
        <div className="form-check">
          <input disabled={this.state.timeout} className="form-check-input" type="radio" name={numQues} id={numQues} value="B"></input>
          <label className="form-check-label">
            B. {answerData.B}
          </label>
        </div>
        <div className="form-check">
          <input disabled={this.state.timeout} className="form-check-input" type="radio" name={numQues} id={numQues} value="C"></input>
          <label className="form-check-label">
            C. {answerData.C}
          </label>
        </div>
        <div className="form-check">
          <input disabled={this.state.timeout} className="form-check-input" type="radio" name={numQues} id={numQues} value="D"></input>
          <label className="form-check-label">
            D. {answerData.D}
          </label>
        </div>
      </div>
    )
  }
  createTypeAns(numQues, content, startWith) {
    return (
      <div key={numQues} className="ques">
        <div className="ques-num">
          Câu {numQues}: {content}
        </div>
        <div className="form-input">
          {startWith ? <div className="rewrite-2-sw">Start With: <b>{startWith}</b></div> : null}
          <input disabled={this.state.timeout} type="text" className="form-control" id={numQues} name={numQues} placeholder="Vui lòng nhập câu trả lời tại đây ..."></input>
        </div>
      </div>
    )
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
  getNumQues() {
    let num1 = this.state.examQues.I_arr.length + this.state.examQues.II_arr.length + this.state.examQues.III_arr.length
      + this.state.examQues.V_arr.type1.length + this.state.examQues.V_arr.type2.length
    let num2 = 0
    this.state.examQues.IV_arr.map((res) => {
      return num2 = num2 + res.content.questions.length
    })
    return (num1 + num2)
  }
  timeOut() {
    this.setState({ timeout: true }, () => {
      this.props.popup({ title: 'Bạn đã hết thời gian làm bài', mess: 'Vui lòng Nộp Bài để xem kết quả' });
    });
  }
  handleFormExamSubmit(e) {
    e.preventDefault();
    let answer = [];
    let form = e.target.elements;
    for (let i = 1; i < e.target.elements.length; i++) {
      if (form[i].checked) {
        answer.push(form[i].value)
        i = (+form[i].name * 4);
      } else if (i === (+form[i].name * 4)) {
        answer.push("")
      } else if (form[i].type === "text") {
        answer.push(form[i].value)
      }
    }
    this.setState({
      answer: answer
    }, () => this.props.history.push({
      pathname: '/exam/result/' + this.idExam,
      state: {
        examName: this.state.examName,
        examQues: this.state.examQues,
        examAns: this.state.examAns.slice(0, answer.length),
        answer: this.state.answer,
        type: 'exam'
      }
    }));
  }
  render() {
    const examsQues = this.state.examQues;
    const examName = this.state.examName;
    let numQues = 0;
    let numQuesRe = this.getNumQues()
    return (
      <div className="exam-detail">
        <div className="row">
          <div className="col-sm-3 col-md-3">
            <div className="tutorial">
              <div className="tut-box">
                <p><i className="far fa-check-square"></i>Thi trắc nghiệm Online</p>
                <br></br>
                <div className="clock">
                  <img src={clock} width="50" alt=""></img>
                  <Countdown date={this.state.time} onComplete={this.timeOut} controlled={this.state.timeout}
                    renderer={props => <time className="clock-countdown">{props.hours}:{props.minutes}:{props.seconds}</time>}>
                  </Countdown>
                </div>
                <div className="exam-tut">
                  <h5>Hướng dẫn làm bài</h5>
                  <ol className="ol-list">
                    <li>Tất cả các đề thi và kiểm tra trắc nghiệm Online đều có hướng dẫn giải chi tiết.</li>
                    <li>Các em lựa chọn đáp án đúng nhất.</li>
                    <li>Mỗi đáp án có thể lựa chọn lại nhiêu lần.</li>
                    <li>Đáp án chỉ được tính khi các em nhấn váo nút <b>"Nộp bài"</b>.</li>
                    <li>Bảng xếp hạng chỉ tính cho những thành viên thi lần 1, không tính thi lại.</li>
                    <li>Bạn có thể làm lại nhiều lần nhưng điểm không tính vào bảng thành tích cũng như bảng xếp hạng.</li>
                    <p className="exam-tut-notice">Lưu ý: Thời gian làm bài là 60 phút. Hãy tính toán đưa ra chiến thuật hơp lí để hoàn thành tốt bài làm của mình</p>
                  </ol>
                  <div className="exam-submit">
                    <input ref="submit" form="exam-form" type="submit" className="btn exam-submit-btn" value="Nộp bài"></input>
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
                  <h5><i className="far fa-question-circle num-ques"></i> Số câu hỏi: {numQuesRe} câu</h5>
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
                          this.state.examAns.push(pronuData.correctAnswer);
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
                          this.state.examAns.push(wordData.correctAnswer);
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
                          this.state.examAns.push(mistakeData.correctAnswer);
                          return (
                            this.createChooseAns(numQues, this.convertToAns(mistakeData.content.content), mistakeData.content.content, mistakeData.type)
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
                                  this.state.examAns.push(passageQues.correctAnswer);
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
                            this.state.examAns.push(rewrite1Data.correctAnswer);
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
          <div className="col-md-8 offset-md-2 comment-box-wrapper">
            <CommentBox
              testId={this.idExam}
              questionId={null}
              username={this.webService.getUserName()}
            />
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

export default ExamsDetPage;
