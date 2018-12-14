import React, { Component } from 'react';
import Reading from '../Question/Reading';

class Step3 extends Component {
    render() {
        return (
            <div>
                <h2>Reading</h2>
                <form>
                    <div className="form-group row">
                        <label for="question" className="col-sm-1 col-form-label">Question: </label>
                        <div className="col-sm-10">
                            <input type="text" readonly class="form-control" id="" />
                        </div>
                    </div>
                </form>
                <Reading index="1" />
                <Reading index="2" />
                <Reading index="3" />
                <Reading index="4" />
                <Reading index="5" />
            </div>
        )
    }
}
export default Step3;