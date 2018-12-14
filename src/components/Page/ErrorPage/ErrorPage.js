import React, { Component } from 'react';
import './ErrorPage.css'
import { Link } from "react-router-dom";

// Props: errorCode, errorMessage

class ErrorPage extends Component {
  componentWillMount() {
    this.props.hideLayout(true);
  }
  render() {
    return (
      <div id="notfound">
        <div class="notfound-bg"></div>
        <div class="notfound">
          <div class="notfound-404">
            <h1>{this.props.errorCode || '404'}</h1>
          </div>
          <h2>{this.props.errorMessage || 'Trang không tồn tại'}</h2>
          <Link className="btn btn-success" to="/">Về Trang Chủ </Link>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
