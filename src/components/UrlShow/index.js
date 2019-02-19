import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import UpdateBtn from '../UpdateBtn';
import './index.css';

const { chrome } = window;

@inject('store')
@observer
class UrlShow extends Component {

    store = this.props.store;

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
        const newUrl = e.target.value;
        this.store.setUrl(newUrl);
    }

    render() {
        const { url } = this.store;
        return (
            <div className="inputs-container">
                <textarea className="show-content" spellCheck="false" onChange={this.onEditeUrl} value={url}>
                </textarea>
                <UpdateBtn />
            </div>
        );
    }
}

export default UrlShow;
