import React, { Component } from 'react'
import './css/sb-admin.css'
import './css/sb-admin.min.css'
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import WebService from '../../../ultities/WebServices';
import LessManagerPage from './LessonsPage/LessManagerPage';
import ExManagerPage from './ExamsPage/ExManagerPage';
import AccManagerPage from './AccountsPage/AccManagerPage';
import AdHeader from './Layouts/Header/AdHeader';
import AdNav from './Layouts/NavBar/AdNav';
import AdFooter from './Layouts/Footer/AdFooter';
import DashboardPage from './DashboardPage/DashboardPage';
import addExam from './ExamsPage/addExam/addExam';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.webService = new WebService();
    }
    componentWillMount() {
        if (!this.webService.isAdmin()) {
            this.props.history.replace('/login');
            return;
        }
        this.props.isAdmin(true);
    }
    componentWillUnmount() {
        this.props.isAdmin(false);
    }
    render() {
        return (
            <div>
                <AdHeader></AdHeader>
                <div id="wrapper">
                    <AdNav></AdNav>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <Switch>
                                <Route exact path="/admin/dashboard" component={DashboardPage} />
                                <Route exact path="/admin/lesson" component={LessManagerPage} />
                                <Route exact path="/admin/exam" component={ExManagerPage} />
                                <Route exact path="/admin/account" component={AccManagerPage} />
                                <Route exact path="/admin/account" component={AccManagerPage} />
                                <Route exact path="/admin/exam/addExam" component={addExam} />
                                {this.webService.isAdmin() ? <Route exact render={() => <Redirect to="/admin/dashboard" />} /> : null}
                            </Switch>
                        </div>
                    </div>
                    <AdFooter></AdFooter>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminPage)

