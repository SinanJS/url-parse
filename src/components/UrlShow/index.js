import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './index.css';

const { chrome } = window;

@inject('store')
@observer
class UrlShow extends Component {

    store = this.props.store;

    state = {
        urlForShow1: '',
        boldPart: '',
        urlForShow2: ''
    }

    componentDidMount() {
        const { seletedIndex } = this.props;
        this.seleted(seletedIndex);
    }

    componentWillReceiveProps(nextProps) {
        const { seletedIndex } = nextProps;
        this.seleted(seletedIndex);
    }

    seleted(index) {
        const { keys, values, host } = this.store;
        let { urlForShow1, boldPart, urlForShow2 } = this.state;
        let query = '?'
        for (let i = 0; i < keys.length; i++) {
            if (values[i].checked === false) {
                return;
            }
            if (i === index) {
                boldPart += `<b>${keys[i]}=${values[i].value}</b>&`;
            } else if (!boldPart) {
                query += `${keys[i]}=${values[i].value}&`;
            } else {
                urlForShow2 += `${keys[i]}=${values[i].value}&`;
            }
        }
        this.setState({
            urlForShow1: `${host}${query}`,
            boldPart,
            urlForShow2: urlForShow2.substr(0, urlForShow2.length - 1)
        });
    }

    goto = () => {
        const { url } = this.store;
        chrome.tabs.create({ url });
    }

    update = () => {
        const { url } = this.store;
        chrome.tabs.update({
            url
        });
    }

    // onEditeUrl = (e) => {
    //     const newUrl = e.target.value;
    //     this.store.setUrl(newUrl);
    // }

    onEditeUrl = (e) => {
        const newUrl = document.querySelector('#part-1').innerText + document.querySelector('#part-blod').innerText + document.querySelector('#part-2').innerText;
        this.store.setUrl(newUrl);
    }

    render() {
        const { urlForShow1, boldPart, urlForShow2 } = this.state;
        return (
            <div className="inputs-container">
                {/* <textarea className="show-content" spellCheck="false" onChange={this.onEditeUrl} value={urlForShow}>
                </textarea> */}
                <div
                    className="show-content"
                    contentEditable
                    spellCheck="false"
                    onInput={this.onEditeUrl}
                >
                    <span id='part-1'>{urlForShow1}</span>
                    <span id='part-blod'>{boldPart}</span>
                    <span id='part-2'>{urlForShow2}</span>
                </div>
                <div className="btn-update" onClick={this.update}>Update</div>
            </div >
        );
    }
}

export default UrlShow;
