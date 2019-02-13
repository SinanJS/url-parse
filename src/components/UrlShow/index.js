import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
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
                <textarea className="show-content" spellCheck="false" onChange={this.onEditeUrl}>
                    {url}
                </textarea>
                <div className="btn-update" onClick={this.update}>Update</div>
            </div>
        );
    }
}

export default UrlShow;
