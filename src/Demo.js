import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <div>
                <div>
                    <ul className="sidebar navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/demoa">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span> Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/demob">
                                <i className="fas fa-fw fa-chart-area"></i>
                                <span> Bài giảng</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
                    <a className="navbar-brand mr-1" href="index.html">Start Bootstrap</a>
                    <button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
                        <i className="fas fa-bars" />
                    </button>
                    {/* Navbar Search */}
                    <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search" />
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* Navbar */}
                    <ul className="navbar-nav ml-auto ml-md-0">
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-bell fa-fw" />
                                <span className="badge badge-danger">9+</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-envelope fa-fw" />
                                <span className="badge badge-danger">7</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="messagesDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-user-circle fa-fw" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <a className="dropdown-item" href="#">Settings</a>
                                <a className="dropdown-item" href="#">Activity Log</a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="sticky-footer">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright © Your Website 2018</span>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}


class DemoA extends Component {
    onHandleChange = (e) => {
        console.log(e.target.value)
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
        </button>
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input className="form-control" name="title" placeholder="Title" onChange={this.onHandleChange} />
                                <input className="form-control" name="author" placeholder="Author" onChange={this.onHandleChange} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class DemoB extends Component {
    render() {
        return (
            <div>
                Demo B
            </div>
        )
    }
}
class DemoC extends Component {
    render() {
        return (
            <div>
                Demo C
            </div>
        )
    }
}
class DemoD extends Component {
    render() {
        return (
            <div>
                <DieuHuongURL></DieuHuongURL>
            </div>
        )
    }
}
class DieuHuongURL extends Component {
    render() {
        return (
            <div>
                <div>
                    <Header></Header>
                    <div id="wrapper">
                        <Nav></Nav>
                        <div id="content-wrapper">
                            <div className="container-fluid">
                                <Route exact path="/demoa" component={DemoA} />
                                <Route exact path="/demob" component={DemoB} />
                            </div>
                            <Footer></Footer>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/democ" component={DemoC} />
                    <Route exact path="/demod" component={DemoD} />
                </div>
            </Router>
        )
    }
}
