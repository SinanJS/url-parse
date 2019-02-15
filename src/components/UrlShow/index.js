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
        host: this.store.host,
        keys: this.store.keys,
        values: this.store.values
    }
    goto = () => {
        const { url } = this.store;
        chrome.tabs.create({ url });
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.editing)
        if (this.editing === false) {
            const { host, keys, values } = nextProps.store;
            this.setState({
                host,
                keys,
                values
            });
        }
    }

    update = () => {
        const { url } = this.store;
        chrome.tabs.update({
            url
        });
    }

    onEditeUrl = (e) => {
        const newUrl = e.target.innerText;
        // console.log(newUrl);
        this.store.setUrl(newUrl);
    }

    onEditeFocus = () => {
        this.editing = true;
    }

    onEditeBlur = () => {
        this.editing = false;
    }

    render() {
        const { host, keys, values } = this.state;
        const { selectedIndex } = this.props;
        return (
            <div className="inputs-container">
                <div
                    className="show-content"
                    contentEditable
                    spellCheck="false"
                    onFocus={this.onEditeFocus}
                    onBlur={this.onEditeBlur}
                    onInput={this.onEditeUrl}
                >
                    <span>{host}</span>
                    {
                        keys.length > 0 && <span>?</span>
                    }
                    {
                        keys.map((key, i) => {
                            if (!values[i].checked) {
                                return null;
                            }
                            return (
                                <>
                                    <span className={i === selectedIndex ? "bold-light key" : "key"}>{key}</span>
                                    <span className={i === selectedIndex ? "bold-light" : ""}>{'='}</span>
                                    <span className={i === selectedIndex ? "bold-light val" : "val"}>{values[i].value}</span>
                                    {(i !== keys.length - 1) && <span>&</span>}
                                </>
                            )
                        })
                    }
                </div>
                <div className="btn-update" onClick={this.update}>Update</div>
            </div>
        );
    }
}

export default UrlShow;
