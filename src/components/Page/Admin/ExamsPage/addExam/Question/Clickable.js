import React, { Component } from 'react';
import '../../../css/sb-admin.min.css'
import './Pronunciation.css';

class Clickable extends Component {
    handleClick = () => this.props.onClick(this.props.index);
    render() {
        return (
            <button
                type="button"
                className={
                    this.props.isActive ? 'btn btn-success' : 'btn custom'
                }
                onClick={this.handleClick}
            >
                <i className="fas fa-check" />
            </button>
        )
    }
}
export default Clickable;