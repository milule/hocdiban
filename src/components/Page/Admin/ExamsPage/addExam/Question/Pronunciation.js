import React, { Component } from 'react';
import Clickable from './Clickable';
import '../../../css/sb-admin.min.css'
import './Pronunciation.css';


class Pronun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeQuestion: 'Pronunciation',
            A: '',
            B: '',
            C: '',
            D: '',
            correctAnswer: null,
            activeIndex: null
        }
    }
    handleClick = (index) => {
        if(index===0){
            this.setState({
                activeIndex: index,
                correctAnswer: 'A'
            }, ()=>{
                this.props.DataFromChild(this.state);
            })            
        }
        else if (index ===1){
            this.setState({
                activeIndex: index,
                correctAnswer: 'B'
            }, ()=>{
                this.props.DataFromChild(this.state);
            })
        }
        else if(index===2){
            this.setState({
                activeIndex: index,
                correctAnswer: 'C'
            }, ()=>{
                this.props.DataFromChild(this.state);
            })
        }
        else{
            this.setState({
                activeIndex: index,
                correctAnswer: 'D'
            }, ()=>{
                this.props.DataFromChild(this.state);
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
                <div className="form-group row">
                    <label for="question" className="col-sm-1 col-form-label">{"Question " + this.props.index}</label>
                </div>
                <div className="form-group row">
                    <label for="question" className="col-sm-1 col-form-label">A: </label>
                    <div className="col-sm-3">
                        <input type="text" name="A" className="form-control" id="" onChange={this.onHandleChange} />
                    </div>
                    <div className="col-sm-1">
                        <Clickable index={0} isActive={this.state.activeIndex === 0} onClick={this.handleClick} />
                    </div>

                    <div className="col-sm-2"></div>

                    <label for="question" className="col-sm-1 col-form-label">B: </label>
                    <div className="col-sm-3">
                        <input type="text" name="B" className="form-control" id="" onChange={this.onHandleChange} />
                    </div>
                    <div className="col-sm-1">
                        <Clickable index={1} isActive={this.state.activeIndex === 1} onClick={this.handleClick} />
                    </div>
                </div>
                <div className="form-group row">
                    <label for="question" className="col-sm-1 col-form-label">C: </label>
                    <div className="col-sm-3">
                        <input type="text" name="C" className="form-control" id="" onChange={this.onHandleChange} />
                    </div>
                    <div className="col-sm-1">
                        <Clickable index={2} isActive={this.state.activeIndex === 2} onClick={this.handleClick} />
                    </div>

                    <div className="col-sm-2"></div>

                    <label for="question" className="col-sm-1 col-form-label">D: </label>
                    <div className="col-sm-3">
                        <input type="text" name="D" className="form-control" id="" onChange={this.onHandleChange} />
                    </div>
                    <div className="col-sm-1">
                        <Clickable index={3} isActive={this.state.activeIndex === 3} onClick={this.handleClick} />
                    </div>
                </div>

            </div>
        )
    }

}

export default Pronun;