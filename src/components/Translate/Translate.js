import React, { Component } from 'react'
import axios from 'axios';

import './Translate.css'

export default class Translate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            translate: {
                word: null,
                fromLang: 'en',
                toLang: 'vi',
                transWord: null
            }
        }
    }

    handleChangeTranslate = (e) => {
        this.setState({
            translate: {
                ...this.state.translate,
                word: e.target.value
            }
        })
    }
    onHandleSelectChange = (e) => {
        let { fromLang } = this.state.translate
        if (e.target.value === 'vi') {
            fromLang = 'en'
        } else {
            fromLang = 'vi'
        }
        this.setState({
            translate: {
                ...this.state.translate,
                fromLang: fromLang,
                toLang: e.target.value
            }
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const { translate } = this.state
        const body = {
            api_key: 'trnsl.1.1.20181110T121025Z.70ff1c615ccb1fea.a6993fad996be2c144cefb58dbcf27c128ed807a',
            text: translate.word,
            lang: translate.fromLang + '-' + translate.toLang
        }
        axios.post('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + body.api_key + '&text=' + body.text + '&lang=' + body.lang)
            .then(res => {
                this.setState({
                    translate: {
                        ...this.state.translate,
                        transWord: res.data.text[0]
                    }
                })
            })
    }
    onReset = () => {
        this.refs.words.value = ''
        this.refs.language.value = 'vi'
        this.setState({
            translate: {
                ...this.state.translate,
                word: null,
                fromLang: 'en',
                toLang: 'vi',
                transWord: null
            }
        })
    }
    render() {
        const { translate } = this.state
        return (
            <div>
                <div className="translate">
                    <button type="button" data-toggle="modal" data-target="#translateModal" className="btn btn-translate" onClick={this.onReset}><i className="fas fa-language"></i></button>
                    <div className="modal fade" id="translateModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Dịch từ</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <label>Ngôn ngữ cần dịch</label>
                                            <select className="form-control" value={translate.toLang} onChange={this.onHandleSelectChange} ref="language">
                                                <option value="en">Tiếng Anh</option>
                                                <option value="vi">Tiếng Việt</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Nhập từ cần dịch vào ô bên dưới</label>
                                            <div className="input-group">
                                                <input className="form-control" name="words" onChange={this.handleChangeTranslate} ref="words" />
                                                <button type="submit" className="btn btn-info">Dịch</button>
                                            </div>
                                        </div>
                                    </form>
                                    <br></br>
                                    {(translate.transWord) ?
                                        <div className="transWord">
                                            <p>Từ được dịch</p>
                                            <p className="transWord">{translate.transWord}</p>
                                        </div>
                                        : ''
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
