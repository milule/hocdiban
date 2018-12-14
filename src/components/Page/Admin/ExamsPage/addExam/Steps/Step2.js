import React, { Component } from 'react';
import Multible from '../Question/MultibleChoice';

class Step2 extends Component {
    render() {
        return (
            <div>
                <h2>Multible Choice</h2>
                <form>
                    <div className="form-group row">
                        <label for="question" className="col-sm-1 col-form-label">Question: </label>
                        <div className="col-sm-10">
                            <input type="text" readonly class="form-control" id="" />
                        </div>
                    </div>
                </form>
                <Multible index="1" />
                <Multible index="2" />
                <Multible index="3" />
                <Multible index="4" />
                <Multible index="5" />
            </div>
        )
    }
}
export default Step2;