import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './index.css';

const { chrome } = window;

@inject('store')
@observer
class UrlShow extends Component {

    store = this.props.store;

    editing = false;

    state = {
        urlForShow1: '',
        boldPart: '',
        urlForShow2: ''
    }

    componentDidMount() {
        const { selectedIndex } = this.props;
        this.seleted(selectedIndex);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.selectedIndex, this.editing)
        if (!this.editing) {
            const { selectedIndex } = nextProps;
            this.seleted(selectedIndex);
        }
    }

    seleted(index) {
        const { keys, values, host } = this.store;
        let boldPart = '';
        let urlForShow2 = '';
        let query = '?'
        for (let i = 0; i < keys.length; i++) {
            if (values[i].checked === false) {
                return;
            }
            if (i === index) {
                boldPart += `${keys[i]}=${values[i].value}`;
            } else if (!boldPart) {
                query += `${keys[i]}=${values[i].value}&`;
            } else {
                urlForShow2 += `&${keys[i]}=${values[i].value}`;
            }
        }
        this.setState({
            urlForShow1: `${host}${query}`,
            boldPart,
            urlForShow2
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

    onEditeUrl = (e) => {
        this.seleted(-1);
        const newUrl = document.querySelector('#part-1').innerText + document.querySelector('#part-blod').innerText + document.querySelector('#part-2').innerText;
        this.store.setUrl(newUrl);
    }

    onFocus = () => {
        this.editing = true;
        console.log('onFocus')
    }

    onBlur = () => {
        this.editing = false;
        console.log('onBlur')
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
                    onFocus={this.onFocus}
                    spellCheck="false"
                    onInput={this.onEditeUrl}
                >
                    <span id='part-1'>{urlForShow1}</span>
                    <span id='part-blod' className="part-blod">{boldPart}</span>
                    <span id='part-2'>{urlForShow2}</span>
                </div>
                <div className="btn-update" onClick={this.update}>Update</div>
            </div >
        );
    }
}

export default UrlShow;
