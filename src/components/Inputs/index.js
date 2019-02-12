import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
const { chrome } = window;
class Inputs extends Component {
    static propTypes = {
        url: PropTypes.string,
        // content: PropTypes.string
    }

    static defaultProps = {
        url: ''
    }

    goto = () => {
        const { url } = this.props;
        chrome.tabs.create({ url });
    }

    render() {
        const { url } = this.props;
        return (
            <div className="inputs-container">
                <input className="main-input" value={url} />
                <button className="goto" onClick={this.goto}>转到</button>
            </div>
        );
    }
}

export default Inputs;
