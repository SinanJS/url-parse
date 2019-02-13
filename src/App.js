import React, { Component } from 'react';
import UrlShow from './components/UrlShow';
import Table from './components/Table';
import { observer, inject } from 'mobx-react';
import './App.css';
import Inputs from './components/Inputs';
import { paramsToUrl } from './lib';

// const { chrome } = window;
@inject("store")
@observer
class App extends Component {

  handleDataChange = (newData) => {
    const newUrl = paramsToUrl(this.host, newData);
    const { store } = this.props;
    store.setUrl(newUrl);
  }

  render() {
    const { params, ready } = this.props.store;
    if (ready) {
      return (
        <div className="App">
          <UrlShow />
          {
            Object.keys(params).length > 0 ?
              <Table dataChange={this.handleDataChange} />
              :
              <div>URL Parser: no params</div>
          }
        </div>
      )
    }
    return null;
  }
}

export default App;
