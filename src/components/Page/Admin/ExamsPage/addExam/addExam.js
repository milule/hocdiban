import React, { Component } from 'react';
import '../../css/sb-admin.css'
import '../../css/sb-admin.min.css'
import { Link } from "react-router-dom";
import WebService from '../../../../../ultities/WebServices';
import './addExam.css';
import Pronun from './Question/Pronunciation';
import Multible from './Question/MultibleChoice';
import Reading from './Question/Reading';
import Writing from './Question/Writing';



class addExam extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            questions: [],
            question: {
                typeQuestion: '',
                ques: '',
                A: '',
                B: '',
                C: '',
                D: '',
                correctAnswer: null
            },
            readingPara: '',
            isEdit: false,
        }
        this.webService = new WebService();
    }
    handlePronunData = (data) => {
        this.setState({
            question: data,
            questions: this.state.questions.concat(data)
        })
    }
    handleWritingData = (data) => {

    }
    handleSubmit = () => {
        let exam = this.state;
        if (exam.questions.length > 0) {
            console.log(exam.questions);
            this.webService.insertTest(exam.name, exam.questions)
                .then((res) => {
                    console.log(res);
                })
            this.setState({
                name: '',
                questions: [],
                question: {
                    typeQuestion: '',
                    ques: '',
                    A: '',
                    B: '',
                    C: '',
                    D: '',
                    correctAnswer: null
                },
                readingPara: '',
                isEdit: false,
            })
        }
    }
    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Exam</li>
                    <li className="breadcrumb-item active">addExam</li>
                </ol>
                <form className='step-progress'>
                    <h2>Tên bài kiểm tra</h2>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <input type="text" name="name" readonly class="form-control" id="" onChange={this.onHandleChange} />
                        </div>
                    </div>
                    <div id="Pronunciation">
                        <h2>Pronunciation</h2>


                        <Pronun index="1" DataFromChild={this.handlePronunData} />
                        <Pronun index="2" DataFromChild={this.handlePronunData} />
                        <Pronun index="3" DataFromChild={this.handlePronunData} />
                        <Pronun index="4" DataFromChild={this.handlePronunData} />
                        <Pronun index="5" DataFromChild={this.handlePronunData} />
                    </div>
                    <div>
                        <h2>Multible Choice</h2>

                        <div className="form-group row">
                            <label for="question" className="col-sm-1 col-form-label">Question: </label>
                            <div className="col-sm-10">
                                <input type="text" readonly class="form-control" id="" />
                            </div>
                        </div>
                        <Multible index="1" DataFromChild={this.handlePronunData} />
                        <Multible index="2" DataFromChild={this.handlePronunData} />
                        <Multible index="3" DataFromChild={this.handlePronunData} />
                        <Multible index="4" DataFromChild={this.handlePronunData} />
                        <Multible index="5" DataFromChild={this.handlePronunData} />
                    </div>

                    <div>
                        <h2>Reading</h2>
                        <div className="form-group row">
                            <label for="question" className="col-sm-1 col-form-label">Question: </label>
                            <div className="col-sm-10">
                                <input type="text" readonly class="form-control" id="" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="question" className="col-sm-1 col-form-label">Paragraph: </label>
                            <div className="col-sm-10">
                                <textarea name="readingPara" cols="140" rows="5" id="paragraph" onChange={this.onHandleChange}></textarea>
                            </div>
                        </div>
                        <Reading index="1" DataFromChild={this.handlePronunData} />
                        <Reading index="2" DataFromChild={this.handlePronunData} />
                        <Reading index="3" DataFromChild={this.handlePronunData} />
                        <Reading index="4" DataFromChild={this.handlePronunData} />
                        <Reading index="5" DataFromChild={this.handlePronunData} />
                    </div>

                    <div>
                        <h2>Writing</h2>
                        <div className="form-group row">
                            <label for="question" className="col-sm-1 col-form-label">Question: </label>
                            <div className="col-sm-10">
                                <input type="text" readonly class="form-control" id="" />
                            </div>
                        </div>
                        <Writing index="1" DataFromChild={this.handlePronunData} />
                        <Writing index="2" DataFromChild={this.handlePronunData} />
                        <Writing index="3" DataFromChild={this.handlePronunData} />
                        <Writing index="4" DataFromChild={this.handlePronunData} />
                        <Writing index="5" DataFromChild={this.handlePronunData} />
                    </div>

                    <div>
                        <h2>Rewriting</h2>
                        <div className="form-group row">
                            <label for="question" className="col-sm-1 col-form-label">Question: </label>
                            <div className="col-sm-10">
                                <input type="text" readonly class="form-control" id="" />
                            </div>
                        </div>
                        <Writing index="1" />
                        <Writing index="2" />
                        <Writing index="3" />
                        <Writing index="4" />
                        <Writing index="5" />
                    </div>
                    <button type="button" id="save-button" className="btn btn-success" onClick={this.handleSubmit}>Save</button>
                </form>
            </div>
        )
    }
}
export default addExam;

