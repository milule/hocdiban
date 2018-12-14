import React, { Component } from 'react';
import Pronun from '../Question/Pronunciation';

class Step1 extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <h2>Pronunciation</h2>
                <form>
                    <div className="form-group row">
                        <label for="question" className="col-sm-1 col-form-label">Question: </label>
                        <div className="col-sm-10">
                            <input type="text" readonly class="form-control" id="" />
                        </div>
                    </div>

                </form>
                <Pronun index="1" />
                <Pronun index="2" />
                <Pronun index="3" />
                <Pronun index="4" />
                <Pronun index="5" />
            </div>
        )
    }
}
export default Step1;