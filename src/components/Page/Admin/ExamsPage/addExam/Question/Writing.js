import React, { Component } from 'react';
import '../../../css/sb-admin.min.css'
import './Pronunciation.css';

class Writing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeQuestion: 'Writing',
            question:'',
            correctAnswer: null
        }
    }
    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, ()=>{
            this.props.DataFromChild(this.state);
        })
    }
    render(){
        return (
            <div>
                <div className="form-group row">
                    <label for="question" className="col-sm-1 col-form-label">{"Question " + this.props.index}</label>
                    <div className="col-sm-10">
                        <input type="text" name="question" class="form-control" id="" onChange={this.onHandleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label for="question" className="col-sm-1 col-form-label">Answer</label>
                    <div className="col-sm-10">
                        <input type="text" name="correctAnswer" class="form-control" id="" onChange={this.onHandleChange} />
                    </div>
                </div>                
            </div>
        )
    }    
}

export default Writing;