import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatedData, cleanData } from '../../lib';
import './index.css';

export default class Table extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        dataChange: PropTypes.func
    }

    static defaultProps = {
        dataChange: () => { }
    }

    state = {
        dataFormated: {},
        newKey: '',
        newVal: ''
    }

    handleCheck(key) {
        const { dataFormated } = this.state;
        const { dataChange } = this.props;
        dataFormated[key].checked = !dataFormated[key].checked;
        dataChange(cleanData(dataFormated));
        this.setState({
            dataFormated
        });
    }

    handleInputChange = (key, e) => {
        const { dataFormated } = this.state;
        const { dataChange } = this.props;
        dataFormated[key].value = e.target.value;
        dataChange(cleanData(dataFormated));
        this.setState({ dataFormated });
    }

    componentDidMount() {
        const { data } = this.props;
        if (Object.keys(data).length === 0) {
            return;
        }
        const dataFormated = formatedData(data);
        this.setState({
            dataFormated
        });
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

    handleAddNewParam = () => {
        const { dataFormated, newKey, newVal } = this.state;
        const { dataChange } = this.props;
        if (newKey && newVal) {
            dataFormated[newKey] = {
                checked: true,
                value: newVal
            }
            dataChange(cleanData(dataFormated))
            this.setState({
                dataFormated,
                newKey: '',
                newVal: ''
            });
        }
    }

    render() {
        const { dataFormated, newKey, newVal } = this.state;
        return (
            <div className="table-container">
                <table className="params-table">
                    <tr className="title-line">
                        <th></th>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    {
                        Object.keys(dataFormated).length > 0
                        &&
                        Object.keys(dataFormated).map(key => {
                            return (
                                <tr className="param-line">
                                    <td className="check-td">
                                        {
                                            dataFormated[key].checked ?
                                                <input type='checkbox' checked onChange={this.handleCheck.bind(this, key)} />
                                                :
                                                <input type='checkbox' onChange={this.handleCheck.bind(this, key)} />
                                        }
                                    </td>
                                    <td className="key-td">{key}</td>
                                    <td className="val-td">
                                        <input className="val-input" type="text" value={dataFormated[key].value} onChange={this.handleInputChange.bind(this, key)} />
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
                            <input className="key-input" type="text" onChange={this.addNewKey} value={newKey} onBlur={this.handleAddNewParam} placeholder="New key" />
                        </td>
                        <td className="val-td">
                            <input className="val-input" type="text" onChange={this.addNewVal} value={newVal} onBlur={this.handleAddNewParam} placeholder="New value" />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}
