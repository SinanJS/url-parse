import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './index.css';

const { chrome } = window;

@inject('store')
@observer
class UpdateBtn extends Component {

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

    render() {
        return (
            <div className="btn-update" onClick={this.update}>Update</div>
        );
    }
}

export default UpdateBtn;
