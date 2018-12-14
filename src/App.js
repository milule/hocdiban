import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SweetAlert from 'sweetalert2-react';

import './App.css';

import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import ErrorPage from './components/Page/ErrorPage';
import Login from './components/Page/Authentication/Login';
import Register from './components/Page/Authentication/Register';
import AccPage from './components/Page/AccountInfoPage';
import HomePage from './components/Page/HomePage';
import AdminPage from './components/Page/Admin/AdminPage';
import LessonsDetPage from './components/Page/LessonsPage/LessonDetailPage';
import LessonsPage from './components/Page/LessonsPage';
import ExamsPage from './components/Page/ExamsPage';
import ExamsDetPage from './components/Page/ExamsPage/ExamDetailPage';
import ExamsResPage from './components/Page/ExamsPage/ExamResultPage'
import ContactPage from './components/Page/ContactPage';
import Translate from './components/Translate';


class App extends Component {
    constructor(props) {
        super(props);
        this.hideLayout = this.hideLayout.bind(this);
        this.showPopup = this.showPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.state = {
            isAdmin: false,
            popupInfo: {
                title: '',
                show: false,
                mess: ''
            }
        }
    }
    hideLayout(value) {
        this.setState({ isAdmin: value });
    }
    closePopup() {
        this.setState({
            popupInfo: {
                ...this.state.popupInfo,
                title: '',
                show: false,
                mess: ''
            }
        })
    }
    showPopup(info) {
        this.setState({
            popupInfo: {
                ...this.state.popupInfo,
                title: info.title,
                show: true,
                mess: info.mess
            }
        })
    }

    render() {
        return (
            <Router>
                <div className="App">
                    {this.state.isAdmin ? null : <Header />}

                    <Switch>
                        <Route exact path="/"
                            render={(props) => <HomePage {...props} popup={this.showPopup} />}
                        />
                        <Route exact path="/login"
                            render={(props) => <Login {...props} popup={this.showPopup} />}
                        />
                        <Route exact path="/register"
                            render={(props) => <Register {...props} popup={this.showPopup} />}
                        />
                        <Route exact path="/contact"
                            render={(props) => <ContactPage {...props} />}
                        />
                        <Route path="/account"
                            render={(props) => <AccPage {...props} popup={this.showPopup} />}
                        />
                        <Route path="/admin"
                            render={(props) => <AdminPage {...props} popup={this.showPopup}
                                isAdmin={this.hideLayout} />}
                        />
                        <Route exact path="/exams"
                            render={(props) => <ExamsPage {...props} popup={this.showPopup} />}
                        />
                        <Route exact path="/exam/:id"
                            render={(props) => <ExamsDetPage {...props} popup={this.showPopup} />}
                        />
                        <Route exact path="/exam/result/:id"
                            render={(props) => <ExamsResPage {...props} popup={this.showPopup} />}
                        />
                        <Route exact path="/lessons"
                            render={(props) => <LessonsPage {...props} popup={this.showPopup} />}
                        />
                        <Route exact path="/lessons/:slug.:id"
                            render={(props) => <LessonsDetPage {...props} popup={this.showPopup} />}
                        />
                        <Route exact render={(props) => <ErrorPage hideLayout={this.hideLayout} {...props} />} />
                    </Switch>
                    {this.state.isAdmin ? null : <Footer />}
                    <SweetAlert
                        show={this.state.popupInfo.show}
                        title={this.state.popupInfo.title}
                        text={this.state.popupInfo.mess}
                        onConfirm={this.closePopup}
                    />
                    {(this.state.isAdmin) ? null : <Translate />}
                </div>
            </Router>
        );
    }
}

export default App;
