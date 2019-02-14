import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { formatedData, cleanData } from '../../lib';
import { observer, inject } from 'mobx-react';
import './index.css';

@inject('store')
@observer
class Table extends Component {
    store = this.props.store

    dragStartIndex = 0;

    dragEndIndex = 0;

    dragging = false;

    static propTypes = {
        dataChange: PropTypes.func
    }

    static defaultProps = {
        dataChange: () => { }
    }

    state = {
        newKey: '',
        newVal: ''
    }

    handleCheck(index) {
        const { keys, values } = this.store;
        console.log(values, index)
        values[index].checked = !values[index].checked;
        this.store.setKVarr(keys, values);
    }

    handleInputChange = (index, e) => {
        const { keys, values } = this.store;
        values[index].value = e.target.value;
        this.store.setKVarr(keys, values);
    }

    handleInputKeyChange = (index, e) => {
        const { keys, values } = this.store;
        keys[index] = e.target.value;
        this.store.setKVarr(keys, values);
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
            const { keys, values } = this.store;
            if (newKey && newVal) {
                values.push({
                    checked: true,
                    value: newVal
                });
                keys.push(newKey);
                this.store.setKVarr(keys, values);
                this.setState({
                    newKey: '',
                    newVal: '',
                });
            }
        }
    }



    onDragStart = (index) => {
        this.dragStartIndex = index;
        this.dragging = true;
    }

    onDragEnd = () => {
        const { exchParam } = this.store;
        exchParam(this.dragStartIndex, this.dragEndIndex);
    }

    onDragOver = (index) => {
        this.dragEndIndex = index;
        this[`line${index}`].style.background = '#cdcdcd';
    }

    onDragLeave = (index) => {
        this[`line${index}`].style.background = '#fff';
    }

    render() {
        const { newKey, newVal } = this.state;
        const { keys, values } = this.store;
        return (
            <div className="table-container">
                <table className="params-table">
                    <tr className="title-line">
                        <th></th>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    {
                        keys.length > 0
                        &&
                        keys.map((key, index) => {
                            return (
                                <tr
                                    className="param-line"
                                    key={index}
                                    draggable
                                    onDragStart={this.onDragStart.bind(this, index)}
                                    onDragEnd={this.onDragEnd.bind(this, index)}
                                    onDragOver={this.onDragOver.bind(this, index)}
                                    onDragLeave={this.onDragLeave.bind(this, index)}
                                    ref={(trDom => { this[`line${index}`] = trDom; })}
                                >
                                    <td className="check-td">
                                        <img
                                            src="/images/move.png"
                                            className='move-img'
                                            alt="move"
                                        />
                                        {
                                            <input type='checkbox' checked={values[index].checked} onChange={this.handleCheck.bind(this, index)} />
                                        }
                                    </td>
                                    <td className="key-td">
                                        <input className="val-input" type="text" value={keys[index]} onChange={this.handleInputKeyChange.bind(this, index)} />
                                    </td>
                                    <td className="val-td">
                                        <input className="val-input" type="text" value={values[index].value} onChange={this.handleInputChange.bind(this, index)} />
                                    </td>
                                </tr>
                            );
                        })
                    }
                    <tr className="new-line">
                        <td className="check-td">
                            <img
                                src="/images/move.png"
                                className='move-img'
                                alt="move"
                            />
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