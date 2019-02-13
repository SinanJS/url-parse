import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
const { chrome } = window;

class UrlShow extends Component {
    static propTypes = {
        url: PropTypes.string,
        // content: PropTypes.string
    }

    static defaultProps = {
        url: ''
    }

    state = {
        url: this.props.url
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            url: nextProps.url
        });
    }

    goto = () => {
        const { url } = this.state;
        chrome.tabs.create({ url });
    }

    update = () => {
        const { url } = this.state;
        chrome.tabs.update({
            url
        });
    }

    onEditeUrl = (e) => {
        // console.log(e.target)
        const newUrl = e.target.innerText;
        console.log(newUrl)
    }

    render() {
        const { url } = this.state;
        return (
            <div className="inputs-container">
                {/* <input className="main-input" value={url} /> */}
                <div className="show-box" contentEditable spellCheck="false" onInput={this.onEditeUrl}>
                    {url}
                </div>
                <div className="btn-update" onClick={this.update}>Update</div>
            </div>
        );
    }
}

export default UrlShow;
