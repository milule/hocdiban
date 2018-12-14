import React, { Component } from 'react';
import '../css/sb-admin.css'
import '../css/sb-admin.min.css'
import { Link } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import WebService from '../../../../ultities/WebServices';
import './LessManagerPage.css'

class LessManagerPage extends Component {
  constructor() {
    super();
    this.state = {
      update: false,
      lessons: [],
      lesson: {
        id: 1,
        name: null,
        type: 'Ngữ pháp',
        importance: '1',
        content: null
      },
      isEdit: false,
      editLesson: '',
      typeLesson: null,
      typeLessons: []
    };
    this.webService = new WebService();
  }

  componentDidMount = () => {
    this.webService.getLessonList()
      .then(res => {
        if (res.data) {
          this.setState({
            lessons: res.data,
          })
        }
      })
    this.webService.getTypeLessonList()
      .then(res => {
        if (res.data) {
          this.setState({
            typeLessons: res.data,
          })
        }
      })
  }
  onHandleChange = (e) => {
    this.setState({
      lesson: {
        ...this.state.lesson,
        [e.target.name]: e.target.value
      }
    })
  }
  handleEditorChange = (e) => {
    this.setState({
      lesson: {
        ...this.state.lesson,
        content: e.target.getContent()
      }
    })
  }
  onHandleSelectChange = (e) => {
    this.setState({
      lesson: {
        ...this.state.lesson,
        [e.target.name]: e.target.value
      }
    })
  }
  onHandleSubmit = () => {
    let { lessons, lesson } = this.state
    if (lesson.name && lesson.content) {
      let id = this.state.lesson.id
      this.webService.insertLesson(lesson.type, lesson.name, lesson.content, lesson.importance)
        .then(() => {
          lessons = this.state.lessons
          lessons.push(lesson)
          this.setState({
            lessons: lessons
          })
        })
      this.setState({
        lessons: lessons,
        lesson: {
          ...this.state.lesson,
          id: id,
          name: null,
          type: 'Ngữ pháp',
          content: null,
          importance: '1'
        }
      })
    }
    // if (isEdit) {
    //   let index = lessons.map(lesson => lesson.id).indexOf(editLesson.id)
    //   let arr = {
    //     title: this.refs.title.value,
    //     type: this.refs.type.value,
    //     content: this.refs.content.editor.getContent()
    //   }
    //   lessons[index].title = arr.title
    //   lessons[index].type = arr.type
    //   lessons[index].content = arr.content
    //   this.setState({
    //     lessons: lessons
    //   })
    // } else {

    // }
    // this.setState({
    //   isEdit: false
    // })
    let empty = ''
    this.refs.name.value = empty
    this.refs.type.value = empty
    this.refs.importance.value = '1'
    this.refs.content.editor.setContent(empty)
  }
  onRemove = (index) => {
    let lessons = this.state.lessons
    lessons = lessons.filter((lesson) => {
      return lesson.id !== index
    })
    this.setState({
      lessons: lessons
    })
  }

  onEdit = (index) => {
    let { editLesson, lessons } = this.state
    let indexLessonEdit = lessons.map(lesson => lesson.id).indexOf(index)
    editLesson = lessons[indexLessonEdit]
    this.setState({
      isEdit: true,
      editLesson: editLesson
    })
    this.refs.name.value = editLesson.name
    this.refs.type.value = editLesson.type
    this.refs.importance.value = editLesson.importance
    this.refs.content.editor.setContent(editLesson.content)
  }
  // resetForm = () => {
  //   let empty = ''
  //   this.refs.title.value = empty
  //   this.refs.type.value = empty
  //   this.refs.importance.value = '1'
  //   this.refs.content.editor.setContent(empty)
  //   this.setState({
  //     isEdit: false
  //   })
  // }
  onHandleTypeChange = (e) => {
    this.setState({
      typeLesson: e.target.value
    })
  }
  submitTypeLesson = () => {
    let { typeLesson } = this.state
    if (typeLesson) {
      this.webService.insertTypeLesson(typeLesson)
        .then(() => {
          let typeLessons = this.state.typeLessons
          typeLessons.push(typeLesson)
          this.setState({
            typeLessons: typeLessons
          })
        })
      this.refs.typeLesson.value = ''
    }
  }
  render() {
    const { lessons, isEdit, typeLessons } = this.state
    return (
      <div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active">Lesson</li>
        </ol>

        <div>
          <div className="row">
            <div className="col-md-4">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Thêm bài giảng
              </button>
            </div>
            <div className="col-md-4">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">
                Thêm loại bài giảng
              </button>
            </div>
            <div className="col-md-4">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal3">
                Danh sách loại bài giảng
              </button>
            </div>
          </div>

          {/* Them bai giang */}
          <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog custom-modal" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{isEdit ? 'Sửa bài giảng' : 'Thêm bài giảng'}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Tiêu đề</label>
                      <input className="form-control" name="name" onChange={this.onHandleChange} ref="name" />
                    </div>
                    <div className="form-group">
                      <label>Loại</label>
                      <select className="form-control" value={this.state.lesson.type} onChange={this.onHandleSelectChange} ref="type" name="type">
                        {typeLessons.map((type, index) => {
                          return <option value={type} key={index}>{type}</option>
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Độ quan trọng</label>
                      <select className="form-control" onChange={this.onHandleSelectChange} ref="importance" name="importance">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Nội dung</label>
                      <Editor
                        init={{
                          plugins: 'link image code textcolor table',
                          toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | forecolor backcolor | code | table',
                          indent: false,
                          textcolor_rows: "4",
                          height: "300"
                        }}
                        onChange={this.handleEditorChange}
                        ref="content"
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onHandleSubmit}>Save changes</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Them loai bai giang */}
        <div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Thêm loại bài giảng</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <input className="form-control" name="type" onChange={this.onHandleTypeChange} ref="typeLesson" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.submitTypeLesson}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
        {/* Danh sach loai bai giang */}
        <div className="modal fade" id="exampleModal3" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel3" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Thêm loại bài giảng</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <ol>
                  {typeLessons.map((type, index) => {
                    return (
                      <li key={index}>{type}</li>
                    )
                  })}
                </ol>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sach bai giang */}
        <div className="card mb-3 mt-5">
          <div className="card-header">
            <i className="fas fa-table" />
            <span> Danh sách bài học</span>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered custom">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">Tiêu đề</th>
                    <th className="text-center">Loại</th>
                    <th className="text-center">Độ quan trọng</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    lessons.map((lesson, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">{lesson.id}</td>
                          <td className="text-center">{lesson.name}</td>
                          <td className="text-center">{lesson.type}</td>
                          <td className="text-center">{lesson.importance}</td>
                          <td className="text-center">
                            <button className="btn btn-info" disabled data-toggle="modal" data-target="#exampleModal" onClick={() => this.onEdit(lesson.id)}><i className="fas fa-edit"></i> Edit</button>
                            &nbsp;
                           <button className="btn btn-danger" disabled onClick={() => this.onRemove(lesson.id)}><i className="fas fa-trash-alt"></i> Remove</button>
                          </td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LessManagerPage;