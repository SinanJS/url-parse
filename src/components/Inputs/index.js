import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './index.css';
const { chrome } = window;
@inject('store')
@observer
class Inputs extends Component {
    store = this.props.store;

    onFocus = () => {
        this.store.setShowUrl(true);
    }

    render() {
        const { url } = this.store;
        return (
            <div className="inputs-container">
                <input className="main-input" value={url} onFocus={this.onFocus} />
            </div>
        );
    }
}

export default Inputs;
