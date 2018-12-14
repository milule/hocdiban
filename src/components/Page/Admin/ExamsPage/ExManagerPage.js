import React, { Component } from 'react';
import '../css/sb-admin.css'
import '../css/sb-admin.min.css'
import { Link } from "react-router-dom";

class ExManagerPage extends Component {
  constructor() {
    super();
    this.state = {
      exams: [],
      exam: {
        id: 1,
        title: '',
        type: '',
        questions: []
      },
      isEdit: false,
      editExam: ''
    };
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active">Exam</li>
        </ol>
        <div>
          <Link to={'/admin/exam/addExam'}>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.resetForm}>
              Thêm bài kiểm tra
          </button>
          </Link>

        </div>
        <div className="card mb-3 mt-5">
          <div className="card-header">
            <i className="fas fa-table" />
            <span> Danh sách bài kiểm tra</span>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered custom">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">Tiêu đề</th>
                    <th className="text-center">Loại</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExManagerPage;
