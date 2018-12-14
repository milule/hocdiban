import React, { Component } from 'react';
import '../css/sb-admin.css'
import '../css/sb-admin.min.css'
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import './AccManagerPage.css'

class AccManagerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {
        id: 1,
        username: '',
        name: '',
        dateString: '',
        gender: 'Nam',
        email: '',
        address: '',
        school: ''
      },
      isEdit: false,
      indexUserEdit: '',
      search: '',
      temp: [],
      isSearch: false
    }
  }

  onHandleChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }
  onHandleSelectChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        gender: e.target.value
      }
    })
  }
  onHandleSearchChange = (e) => {
    this.setState({
      search: e.target.value,
    })
  }
  onHandleSubmit = () => {
    let { users, user, isEdit, indexUserEdit } = this.state
    if (isEdit) {
      users[indexUserEdit].name = this.refs.name.value
      users[indexUserEdit].email = this.refs.email.value
      users[indexUserEdit].gender = this.refs.gender.value
      users[indexUserEdit].username = this.refs.username.value
      users[indexUserEdit].address = this.refs.address.value
      users[indexUserEdit].school = this.refs.school.value
      console.log(users)
      this.setState({
        users: users
      })
    } else {
      let id = this.state.user.id
      users.push(user)
      this.setState({
        users: users,
        user: {
          ...this.state.user,
          id: id + 1,
          username: '',
          name: '',
          dateString: '',
          gender: 'Nam',
          email: '',
          adress: '',
          school: ''
        },
      })
    }
    this.refs.name.value = ''
    this.refs.email.value = ''
    this.refs.gender.value = 'Nam'
    this.refs.username.value = ''
    this.refs.address.value = ''
    this.refs.school.value = ''
  }

  onRemove = (index) => {
    let users = this.state.users
    users = users.filter((user) => {
      return user.id !== index
    })
    this.setState({
      users: users
    })
  }

  onEdit = (index) => {
    let { users } = this.state
    let indexUserEdit = users.map(user => user.id).indexOf(index)
    this.setState({
      isEdit: true,
      indexUserEdit: indexUserEdit
    })
    this.refs.name.value = users[indexUserEdit].name
    this.refs.email.value = users[indexUserEdit].email
    this.refs.gender.value = users[indexUserEdit].gender
    this.refs.username.value = users[indexUserEdit].username
    this.refs.address.value = users[indexUserEdit].address
    this.refs.school.value = users[indexUserEdit].school
  }
  onSearch = () => {
    let { search, temp, users } = this.state
    temp = [...users]
    users = users.filter(user => user.email.toLowerCase().indexOf(search) !== -1)
    this.setState({
      users: users,
      temp: temp,
      isSearch: true
    })
  }
  resetData = () => {
    let { temp } = this.state
    this.setState({
      users: [...temp],
      isSearch: false
    })
    this.refs.search.value = ''
  }

  handleChangeDate = (date) => {
    this.convertDateString(date)
  }
  convertDateString = (date) => {
    let strDate
    if (date != null) {
      strDate = date.date() + '/' + (+date.month() + 1) + '/' + date.year();
    } else {
      strDate = ''
    }
    console.log(strDate)
    this.setState({
      user: {
        ...this.state.user,
        dateString: strDate
      }
    });
  }
  render() {
    const { users, isSearch, user } = this.state
    console.log(user)
    return (
      <div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active">Account</li>
        </ol>

        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Tìm kiếm..." aria-label="Search" aria-describedby="basic-addon2" name="search" onChange={this.onHandleSearchChange} ref="search" />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </form>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.resetForm}>
          Thêm User
        </button>
        <br></br>
        {(isSearch) ? <button type="button" className="btn btn-primary" onClick={this.resetData}>
          Quay về
        </button> : ''}
        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Sửa thông tin account</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Username</label>
                    <input className="form-control" name="username" onChange={this.onHandleChange} ref="username" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" onChange={this.onHandleChange} ref="email" />
                  </div>
                  <div className="form-group">
                    <label>Họ tên</label>
                    <input className="form-control" name="name" onChange={this.onHandleChange} ref="name" />
                  </div>
                  <div className="form-group">
                    <label>Ngày sinh</label>
                    <DatePicker
                      selected={this.state.date}
                      className="fadeIn third"
                      onChange={this.handleChangeDate}
                    />
                  </div>
                  <div className="form-group">
                    <label>Giới tính</label>
                    <select className="form-control" onChange={this.onHandleSelectChange} ref="gender">
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Địa chỉ</label>
                    <input className="form-control" name="address" onChange={this.onHandleChange} ref="address" />
                  </div>
                  <div className="form-group">
                    <label>Trường học</label>
                    <input className="form-control" name="school" onChange={this.onHandleChange} ref="school" />
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
        <div className="card mb-3 mt-5">
          <div className="card-header">
            <i className="fas fa-table" />
            <span> Danh sách người dùng</span>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered custom">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">Username</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Họ tên</th>
                    <th className="text-center">Ngày sinh</th>
                    <th className="text-center">Giới tính</th>
                    <th className="text-center">Địa chỉ</th>
                    <th className="text-center">Trường học</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    users.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>{user.id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.name}</td>
                          <td>{user.dateString}</td>
                          <td>{user.gender}</td>
                          <td>{user.address}</td>
                          <td>{user.school}</td>

                          <td className="text-center">
                            <button className="btn btn-info" data-toggle="modal" data-target="#exampleModal" onClick={() => this.onEdit(user.id)}><i className="fas fa-edit"></i> Edit</button>
                            &nbsp;
                           <button className="btn btn-danger" onClick={() => this.onRemove(user.id)}><i className="fas fa-trash-alt"></i> Remove</button>
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

export default AccManagerPage;
