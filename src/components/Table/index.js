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
        dataFormated: {}
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


    render() {
        const { dataFormated } = this.state;
        if (Object.keys(dataFormated).length === 0) {
            return null;
        }
        return (
            <div className="table-container">
                <table className="params-table">
                    <tr className="title-line">
                        <th></th>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    {
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
                                        <input className="val-input" type="text" value={dataFormated[key].value} />
                                    </td>
                                </tr>
                            );
                        })
                    }
                </table>
            </div>
        );
    }
}
