import React, { Component } from 'react';
import UrlShow from './components/UrlShow';
import Table from './components/Table';
import { observer, inject } from 'mobx-react';
import './App.css';

// const { chrome } = window;
@inject("store")
@observer
class App extends Component {

  state = {
    selectedIndex: -1
  }

  onFocus = (index) => {
    this.setState({
      selectedIndex: index
    });
  }

  render() {
    const { keys, ready } = this.props.store;
    const { selectedIndex } = this.state;
    if (ready) {
      return (
        <div className="App">
          <UrlShow selectedIndex={selectedIndex} />
          {
            keys.length > 0 ?
              <Table onFocus={this.onFocus} />
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
