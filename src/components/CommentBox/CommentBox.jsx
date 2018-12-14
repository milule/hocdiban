import React from 'react';
import MockDB from '../../ultities/MockDB';
import './CommentBox.css';

import Comment from './Comment/Comment';
import CommentInput from './CommentInput/CommentInput';
import WebService from '../../ultities/WebServices';

const initialState = {
    comments: [],
    questionId: null
}

export default class CommentBox extends React.Component {

    mockDB = MockDB;
    webService = new WebService();

    constructor(props) {
        super(props);

        this.state = initialState;

        this.generateComments = this.generateComments.bind(this);
        this.postComment = this.postComment.bind(this);
        this.fetchComments = this.fetchComments.bind(this);
    }

    componentWillMount() {
        this.fetchComments();
    }

    fetchComments() {
        const generatePromise = () => {
            if (this.props.testId) {
                return this.webService.getComments(1000, 0, this.props.testId)
            }
            return this.webService.getComments(1000, 0, undefined, this.props.lessonId);
        }

        generatePromise().then(res => {
            if (res.returnCode === 1) {
                this.setState({
                    comments: res.data
                });
            } else {
                console.log(res.returnMessage);
            }
        })
    }

    generateComments(comments) {
        let result = [];

        for (let i = 0; i < comments.length; i++) {
            result.push(
                <Comment
                    key={i}
                    comment={comments[i]}
                    postComment={this.postComment}
                    username={this.props.username}
                />
            );
        }

        return result;
    }

    postComment(username, content, replyToCommentId, questionId) {
        if (content) {

            this.mockDB.POSTComment(username, this.props.testlessonId, content, replyToCommentId, questionId);

            const generatePromise = () => {
                if (replyToCommentId) {
                    return this.webService.insertComment(undefined, undefined, replyToCommentId, content);
                } else if (this.props.lessonId) {
                    return this.webService.insertComment(undefined, this.props.lessonId, undefined, content);
                }
                else {
                    return this.webService.insertComment(this.props.testId, undefined, undefined, content);
                }
            }

            generatePromise().then(res => {
                if (res.returnCode === 1) {
                    this.fetchComments();

                } else {
                    console.log(res.returnMessage);
                }
            });

        }
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="comment-box">
                        <div className="comment-input">
                            <CommentInput
                                username={this.props.username}
                                postComment={this.postComment}
                                commentId={null}
                                testlessonId={this.props.testlessonId}
                                questionId={this.state.questionId}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="comment-list">
                        {this.generateComments(this.state.comments)}
                    </div>
                </div>
            </div>
        );
    }
}
