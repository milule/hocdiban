import React, { Component } from 'react';
import ExamBox from './ExamBox/ExamBox';
import './ExamsPage.css';

import WebService from '../../../ultities/WebServices';

class ExamsPage extends Component {
  examsList = [
    {
      name: 'Vào lớp 10 trường THPT chuyên Trần Đại Nghĩa'
    },
    {
      name: 'Vào lớp 10 trường THPT chuyên Trưng Vương'
    },
    {
      name: 'Vào lớp 10 trường THPT chuyên Marie Curie'
    },
    {
      name: 'Vào lớp 10 trường THPT chuyên Lê Hồng Phong'
    },
    {
      name: 'Vào lớp 10 trường THPT chuyên Quang Trung'
    },
    {
      name: 'Vào lớp 10 trường THPT chuyên Trần Đại Nghĩa'
    },
    {
      name: 'Vào lớp 10 trường THPT chuyên Trần Đại Nghĩa'
    },
  ]

  cssStyle = {
    wrapper: {
      marginLeft: 20,
      marginRight: 20
    },
  }

  webService = new WebService();

  constructor(props) {
    super(props);

    this.state = {
      pageCount: 10,
      examsList: []
    }
  }
  componentWillMount() {
    if (this.webService.isAdmin()) {
      this.props.history.replace('/admin');
    }
  }
  componentDidMount() {
    this.fetchExams();
  }

  fetchExams() {
    this.webService.getTestList(0, 1000).then((tests) => {

      console.log(tests, '====================')
      let result = [];

      for (let id in tests.data) {
        result.push(<ExamBox key={id} className="md-col-2"
          examName={tests.data[id]}
          id={parseInt(id, 10)}
        />);
      }


      this.setState({
        examsList: result
      });
    });
  }

  handlePageClick(data) {
    console.log(data)
  }

  render() {
    return (
      <div className="exam-page">
        <div className="topbar topbar-over lay">
          <div className="topbar-gray">
            <div className="topbar-text container">
              <h1>Luyện đề</h1>
              <p>Danh sách đề thi chọn lọc đảm bảo giúp bạn có kết quả tốt nhất trong kì thi</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="wrapper" style={this.cssStyle.wrapper}>
              <div className="content">
                <div className="row">
                  <div className="col-md-2">
                    <h2>Tìm kiếm</h2>
                  </div>
                  <div className="col-md-10">
                    <h2>Danh sách đề thi</h2>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="exams-list">
                            {this.state.examsList}
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-md-12">
                        <div id="react-paginate">
                          <nav aria-label="text-center">
                            <ReactPaginate
                              containerClassName="pagination"
                              previousLabel={"Trước"}
                              nextLabel={"Sau"}
                              breakLabel={<a href="">...</a>}
                              breakClassName={"break-me"}
                              pageCount={16}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={this.handlePageClick}
                              activeClassName={"active"}
                            />
                          </nav>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* <h4>Comments</h4>
          <div className="col-md-8 offset-md-2 comment-box-wrapper">
            <CommentBox
              testlessonId={1}
              questionId={1}
              username={"cvdat2097"}
            />
          </div> */}
        </div>
      </div>
    );
  }
}

export default ExamsPage;
