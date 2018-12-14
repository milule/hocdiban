import decode from 'jwt-decode';
import queryString from 'query-string';
export default class WebService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://207.148.122.212:80/api' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.logout = this.logout.bind(this)
        this.checkUser = this.checkUser.bind(this)
        this.checkPermission = this.checkPermission.bind(this)
        this.insertAdmin = this.insertAdmin.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)
        this.insertTest = this.insertTest.bind(this)
        this.insertLesson = this.insertLesson.bind(this)
        this.insertResult = this.insertResult.bind(this)
        this.getLesson = this.getLesson.bind(this)
        this.getTest = this.getTest.bind(this)
        this.getTestList = this.getTestList.bind(this)
        this.getLessonList = this.getLessonList.bind(this)
        this.getAllAccounts = this.getAllAccounts.bind(this)
        this.getListResult = this.getListResult.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    ///////////////////////////////////////////////          API FUNCTION          //////////////////////////////////////////////////////

    //Function config fetch data from server API -----------------------------------------

    //FOR GUEST
    //#URl: /login
    login(username, password) {
        const action = 'login'
        const param = {
            action: action,
            userName: username,
            password: password
        }
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    checkPermission(token) {
        const action = 'checkPermission'
        const param = {
            action: action,
            token: token
        }
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    register(username, password, name, dob, sexual, address, school) {
        const action = 'createUser'
        const param = {
            action: action,
            userName: username,
            password: password,
            name: name,
            dateOfBirth: dob,
            sexual: sexual,
            address: address,
            school: school
        }
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    checkUser(username) {
        const action = 'checkUser'
        const param = {
            action: action,
            userName: username,
        }
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    //#URl: /test
    getTestList(offset, limit) {
        const action = 'getTestList'
        const param = {
            action: action,
            offset: offset,
            limit: limit
        }
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/test`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    //#URl: /lesson
    getLessonList() {
        const action = 'getLessonList'
        const param = {
            action: action
        }
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/lesson`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    //FOR ADMIN
    //#URl: /admin/account
    insertAdmin(username, password, name, role) {
        const action = 'insertAdmin'
        const param = {
            action: action,
            token: this.getToken(),
            userName: username,
            password: password,
            name: name,
            role: role
        }
        return this.fetch(`${this.domain}/admin/account`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    getAllAccounts() {
        const action = 'getAllAccounts'
        const param = {
            action: action,
            token: this.getToken()
        }
        return this.fetch(`${this.domain}/admin/account`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    deleteAccount(username) {
        const action = 'deleteAccount'
        const param = {
            action: action,
            token: this.getToken(),
            Username: username
        }
        return this.fetch(`${this.domain}/admin/account`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    //#URl: /admin/test
    insertTest(name, content) {
        const action = 'insertTest'
        const param = {
            action: action,
            token: this.getToken(),
            Name: name,
            Content: content
        }
        return this.fetch(`${this.domain}/admin/test`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    //#URl: /admin/lesson
    insertLesson(type, name, content, importance) {
        const action = 'insertLesson'
        const param = {
            action: action,
            token: this.getToken(),
            type: type,
            name: name,
            content: content,
            importance: importance
        }
        return this.fetch(`${this.domain}/admin/lesson`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    //FOR USER
    //#URl: /user/lesson
    getLesson(idLesson) {
        const action = 'getLesson'
        const param = {
            action: action,
            token: this.getToken(),
            id: idLesson
        }
        return this.fetch(`${this.domain}/user/lesson`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }


    //#URl: /admin/typeLesson
    insertTypeLesson(name) {
        const action = 'insertTypeLesson'
        const param = {
            action: action,
            token: this.getToken(),
            name: name
        }
        return this.fetch(`${this.domain}/admin/typeLesson`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }
    getTypeLessonList() {
        const action = 'getTypeLessonList'
        const param = {
            action: action,
            token: this.getToken()
        }
        return this.fetch(`${this.domain}/admin/typeLesson`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }
    deleteLessonType(name) {
        const action = 'deleteLessonType'
        const param = {
            action: action,
            token: this.getToken(),
            name: name
        }
        return this.fetch(`${this.domain}/admin/typeLesson`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }


    //#URl: /user/test
    getTest(idTest) {
        const action = 'getTest'
        const param = {
            action: action,
            token: this.getToken(),
            id: idTest
        }
        return this.fetch(`${this.domain}/user/test`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    //#URl: /user/result
    insertResult(idTest, point, answer) {
        const action = 'insertResult'
        const param = {
            action: action,
            token: this.getToken(),
            testId: idTest,
            point: point,
            answer: answer
        }
        return this.fetch(`${this.domain}/user/result`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    getListResult() {
        const action = 'getListResult'
        const param = {
            action: action,
            token: this.getToken()
        }
        return this.fetch(`${this.domain}/user/result`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        })
    }

    getComments(limit, offset, testId, lessonId, root) {
        const action = 'getComments'
        const param = {
            action: action,
            limit,
            offset,
            ...{
                testId,
                lessonId,
                root
            }
        }

        return this.fetch(`${this.domain}/comment`, {
            method: 'POST',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        });
    }

    insertComment(testId, lessonId, root, content) {
        const action = 'insertComment'
        const param = {
            token: this.getToken(),
            action: action,
            content,
            ...{
                testId,
                lessonId,
                root
            }
        }

        return this.fetch(`${this.domain}/user/comment`, {
            method: 'POSt',
            body: queryString.stringify(param)
        }).then(res => {
            return res;
        });
    }

    ///////////////////////////////////////////////          OTHER FUNCTION          //////////////////////////////////////////////////////
    //Function Authen from login -----------------------------------------
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }
    isUser() {
        return this.loggedIn() && this.getPermission() === 'user';
    }
    isAdmin() {
        return this.loggedIn() && this.getPermission() === 'admin';
    }
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setInfo(idToken, username, permisstion) {
        // Saves user token to localStorage
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('userName', username);
        localStorage.setItem('permiss', permisstion);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('idToken');
    }

    getUserName() {
        return localStorage.getItem('userName');
    }

    getPermission() {
        return localStorage.getItem('permiss');
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('idToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('permiss');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    //Function config fetch data from server API -----------------------------------------
    fetch(url, options) {
        const timeout = 30000;
        // return fetch(url, {
        //     header,
        //     ...options
        // }).then(this.checkStatus).then(response => response.json());
        return new Promise((resolve, reject) => {
            // Set timeout timer
            let timer = setTimeout(
                () => reject(new Error('Request timed out')),
                timeout
            );

            fetch(url, {
                ...options
            }).then(this.checkStatus)
                .then(
                    response => { resolve(response.json()) },
                    err => reject(err)
                )
                .finally(() => clearTimeout(timer));
        })
    }


    checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
