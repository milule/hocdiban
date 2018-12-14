import React from 'react';
import './CommentInput.css';

const initialState = {
    comment: '',
}

export default class CommentInput extends React.Component {
    constructor(props) {
        super(props);

        this.mockDB = props.MockDB;

        this.state = initialState;


        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSendClick = this.handleSendClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleFormChange(e) {
        this.setState({
            comment: e.target.value
        });
    }

    handleSendClick() {
        this.props.postComment(this.props.username, this.state.comment, this.props.commentId, this.props.questionId);
        // MockDB.POSTComment

        this.setState({
            comment: ''
        });
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.handleSendClick();
        }
    }

    render() {
        return (
            <div className="row">
                {/* <div className="col-md-2">
                    <div className="comment-avatar">
                        <img src="https://kissmegoodnight.com/m/photos/get_image/file/824ce5740f9d63ce2f04af11d00e61ed.jpg" alt="" />
                    </div>
                </div> */}
                <div className="col-md-3">
                    <div className="comment-username-container text-center user-info">
                        <div className="comment-username">{this.props.username}</div>
                        {
                            this.props.questionId &&
                            <button className="btn btn-warning">Trả lời câu #{this.props.questionId}</button>
                        }
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="comment-input-container">
                        <input type="text" className="form-control"
                            onChange={(e) => { this.handleFormChange(e) }}
                            value={this.state.comment}
                            onKeyDown={this.handleKeyDown}
                            placeholder="Nhập bình luận..."
                        />
                        {/* <div className="comment-button-container"> */}
                            <button className="comment-button btn btn-primary"
                                onClick={this.handleSendClick}
                            >Post</button>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        );
    }
}