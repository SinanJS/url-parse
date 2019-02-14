import { observable, flow, action } from "mobx";
import { exch, getArrFromURL, paramsToUrl, arrToUrl } from './lib';

const { chrome } = window;

class Store {
    constructor() {
        this.init();
    }

    @observable
    ready = false;

    @observable
    url = null;

    // @observable
    // params = null;

    @observable
    keys = [];

    @observable
    values = [];

    @observable
    host = null;

    @observable
    showUrl = false;

    @action
    init = () => {
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, (tabs) => {
            const { url } = tabs[0];
            this.url = decodeURIComponent(url);
            // this.params = getParamsFromURL(url);
            this.host = url.split('?')[0];
            const { keys, values } = getArrFromURL(url);
            this.keys = keys;
            this.values = values;
            this.ready = true;
        });
    }

    @action
    setUrl(url) {
        this.url = url;
        // this.params = getParamsFromURL(url);
        const { keys, values } = getArrFromURL(url);
        this.keys = keys;
        this.values = values;
    }

    // @action
    // setParams(params) {
    //     this.params = params;
    //     this.url = `${paramsToUrl(params, this.host)}`;
    // }

    @action
    setKVarr(keys, values) {
        this.keys = keys;
        this.values = values;
        this.url = `${arrToUrl(keys, values, this.host)}`;
    }

    @action
    setShowUrl(boolval) {
        this.showUrl = !!boolval;
    }

    @action
    exchParam = (i, j) => {
        const { keys, values } = this;
        exch(keys, i, j);
        exch(values, i, j);
        // console.log(values);
        this.url = `${arrToUrl(keys, values, this.host)}`;
    }

}

const store = new Store();
export default store;
