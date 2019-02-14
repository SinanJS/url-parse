import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { formatedData, cleanData } from '../../lib';
import { observer, inject } from 'mobx-react';
import './index.css';

@inject('store')
@observer
class Table extends Component {
    store = this.props.store

    static propTypes = {
        data: PropTypes.object.isRequired,
        dataChange: PropTypes.func
    }

    static defaultProps = {
        dataChange: () => { }
    }

    state = {
        // params: {},
        newKey: '',
        newVal: ''
    }

    handleCheck(key) {
        const { params } = this.store;
        params[key].checked = !params[key].checked;
        this.store.setParams(params);
    }

    handleInputChange = (key, e) => {
        const { params } = this.store;
        params[key].value = e.target.value;
        this.store.setParams(params);
    }

    addNewKey = (e) => {
        this.setState({
            newKey: e.target.value
        });
    }

    addNewVal = (e) => {
        this.setState({
            newVal: e.target.value
        });
    }

    handleAddNewParam = (e) => {
        if ((e.type === 'blur') || (e.type === 'keypress' && e.key === 'Enter')) {
            const { newKey, newVal } = this.state;
            const { params } = this.store;
            if (newKey && newVal) {
                params[newKey] = {
                    checked: true,
                    value: newVal
                }
                this.store.setParams(params);
                this.setState({
                    newKey: '',
                    newVal: '',
                });
            }
        }
    }

    render() {
        const { newKey, newVal } = this.state;
        const { params } = this.store;
        return (
            <div className="table-container">
                <table className="params-table">
                    <tr className="title-line">
                        <th></th>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    {
                        params
                        &&
                        Object.keys(params).length > 0
                        &&
                        Object.keys(params).map(key => {
                            return (
                                <tr className="param-line">
                                    <td className="check-td">
                                        {
                                            params[key].checked ?
                                                <input type='checkbox' checked onChange={this.handleCheck.bind(this, key)} />
                                                :
                                                <input type='checkbox' onChange={this.handleCheck.bind(this, key)} />
                                        }
                                    </td>
                                    <td className="key-td">{key}</td>
                                    <td className="val-td">
                                        <input className="val-input" type="text" value={params[key].value} onChange={this.handleInputChange.bind(this, key)} />
                                    </td>
                                </tr>
                            );
                        })
                    }
                    <tr className="new-line">
                        <td className="check-td">
                            <input type='checkbox' />
                        </td>
                        <td className="key-td">
                            <input className="key-input" type="text" onChange={this.addNewKey} value={newKey} onBlur={this.handleAddNewParam} onKeyPress={this.handleAddNewParam} placeholder="New key" />
                        </td>
                        <td className="val-td">
                            <input className="val-input" type="text" onChange={this.addNewVal} value={newVal} onBlur={this.handleAddNewParam} onKeyPress={this.handleAddNewParam} placeholder="New value" />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}
export default Table;