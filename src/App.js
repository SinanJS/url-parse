import React, { Component } from 'react';
import Inputs from './components/Inputs';
import UrlShow from './components/UrlShow';
import Table from './components/Table';
import { getParamsFormURL, paramsToUrl } from './lib';
import './App.css';

const { chrome } = window;
class App extends Component {
  state = {
    url: '',
    params: {}
  };

  componentDidMount() {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, (tabs) => {
      const { url } = tabs[0];
      const params = getParamsFormURL(url);
      this.host = url.split('?')[0];
      this.setState({
        url,
        params
      });
    });
  }

  handleDataChange = (newData) => {
    const newUrl = paramsToUrl(this.host, newData);
    this.setState({
      url: newUrl
    });
  }

  render() {
    const { url, params } = this.state;
    return (
      <div className="App">
        <UrlShow url={url} />
        {
          Object.keys(params).length > 0 ?
          <Table data={params} dataChange={this.handleDataChange} />
          :
          <div>URL Parser: no params</div>
        }
      </div>
    );
  }
}

export default App;
