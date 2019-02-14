import React, { Component } from 'react';
import UrlShow from './components/UrlShow';
import Table from './components/Table';
import { observer, inject } from 'mobx-react';
import './App.css';

// const { chrome } = window;
@inject("store")
@observer
class App extends Component {

  render() {
    const { keys, ready } = this.props.store;
    if (ready) {
      return (
        <div className="App">
          <UrlShow />
          {
            keys.length > 0 ?
              <Table />
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
