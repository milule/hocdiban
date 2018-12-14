import React from 'react';
import './Comment.css';

import MockDB from '../../../ultities/MockDB';

import CommentInput from '../CommentInput/CommentInput';
import WebService from '../../../ultities/WebServices';


// const props = {
//     isReply: false
// }

const inititalState = {
    replies: [],
    showReplyBox: false
}

export default class Comment extends React.Component {

    mockDb = MockDB;
    webService = new WebService();

    constructor(props) {
        super(props);

        this.state = inititalState;

        !this.props.comment.username && (this.props.comment.username = 'User');

        this.fetchReplies = this.fetchReplies.bind(this);
    }

    generateReplies() {
        let R = [];

        this.state.replies.forEach((reply, index) => {
            R.push(
                <div className="row" key={index}>
                    <div className="col-md-2"></div>
                    <div className="col-md-10">
                        <Comment
                            comment={reply}
                            lockReply={true}
                        />
                    </div>
                </div>
            )
        });

        return R;
    }

    fetchReplies() {
        console.log('called')
        this.setState({
            showReplyBox: true
        })
        // this.mockDb.GETReplies(this.props.comment.id).then(replies => {
        //     this.setState({
        //         replies,
        //         replyTo: this.props.comment.id
        //     })
        // })

        this.webService.getComments(1000, 0, undefined, undefined, this.props.comment.id).then(res => {

            if (res.returnCode === 1) {
                this.setState({
                    replies: res.data,
                    replyTo: this.props.comment.id
                })
            } else {
                console.log(res.returnMessage);
            }
        })
    }

    render() {
        return (
            <div className="row comment-container">
                {/* <div className="col-md-2">
                    <div className="comment-avatar">
                        <img src="https://kissmegoodnight.com/m/photos/get_image/file/824ce5740f9d63ce2f04af11d00e61ed.jpg" alt="" />
                    </div>
                </div> */}
                <div className="col-md-4">
                    <div className="comment-username-container text-center">
                        <div className="comment-username">
                            {this.props.comment.user}
                        </div>
                        <div style={{
                            display: 'flex'
                        }}>

                            <div className="comment-questionid">
                                {
                                    this.props.comment.questionId &&
                                    <a href={'#' + this.props.comment.questionId} className="btn btn-warning">Câu #{this.props.comment.questionId}</a>
                                }
                            </div>
                            <div className="comment-reply-button">
                                {
                                    !this.props.lockReply ?
                                        <span className="reply-link"
                                            onClick={this.fetchReplies}
                                        >Trả lời ({this.props.comment.rep})</span>
                                        :
                                        ''

                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="comment-content">
                        {this.props.comment.content}
                    </div>
                </div>
                {
                    this.state.showReplyBox &&
                    <div className="col-md-12">
                        <div className="row">
                            {
                                <div className="col-md-12">
                                    <div>
                                        {
                                            this.state.replies.length > 0 ?
                                                this.generateReplies()
                                                : ''
                                        }
                                        <div className="row">
                                            <div className="col-md-2">
                                            </div>
                                            <div className="col-md-10">
                                                <CommentInput
                                                    commentId={this.props.comment.id}
                                                    postComment={this.props.postComment}
                                                    username={this.props.username}
                                                /></div>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                }
            </div>
        );
    }
}
