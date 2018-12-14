const COMMENT = [
    {
        id: 1,
        testId: 1,
        questionId: '2',
        rating: 4.5,
        replyTo: null,
        content: 'Hello this is a comment',
        username: 'test',
    },
    {
        id: 2,
        testId: 1,
        questionId: '3',
        rating: 4.5,
        replyTo: null,
        content: 'Hello this is a comment',
        username: 'test'
    },
    {
        id: 3,
        testId: 1,
        questionId: '4',
        rating: 4.5,
        replyTo: null,
        content: 'Hello this is a comment',
        username: 'test'
    },
    {
        id: 4,
        testId: 1,
        questionId: '5',
        rating: 4.5,
        replyTo: null,
        content: 'Hello this is a comment',
        username: 'test'
    },
    {
        id: 5,
        testId: 1,
        questionId: null,
        rating: 4.5,
        replyTo: 1,
        content: 'Hello this is a comment',
        username: 'test'
    },
    {
        id: 6,
        testId: 1,
        questionId: null,
        rating: 4.5,
        replyTo: 1,
        content: 'Hello this is a comment',
        username: 'test'
    },
];

window.comment = COMMENT;

const MOCKDB = {
    POSTComment: function (username, testlessonId, content, commentId, questionId) {
        return new Promise((resolve, reject) => {
            COMMENT.push({
                id: COMMENT.length,
                testId: testlessonId,
                questionId,
                rating: 4.5,
                replyTo: commentId,
                content,
                username
            });
            resolve(true);
        });
    },

    GETComments: function (testlessonId) {
        return new Promise((resolve, reject) => {
            let R = COMMENT.filter(cmt => cmt.testId === testlessonId || !cmt.replyTo);
            R = R.map(cmt => {
                let nReplies = 0;
                for (let i = 0; i < COMMENT.length; i++) {
                    if (COMMENT[i].replyTo === cmt.id) {
                        nReplies++;
                    }
                }

                return Object.assign(cmt, { nReplies });
            });
            resolve(R);
        });
    },


    GETReplies: function (commentId) {
        return new Promise((resolve, reject) => {
            resolve(COMMENT.filter(cmt => cmt.replyTo === commentId));
        });
    }
}


export default MOCKDB;