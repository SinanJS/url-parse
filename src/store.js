import { observable, flow, action } from "mobx";
import { getParamsFormURL, paramsToUrl } from './lib';

const { chrome } = window;

class Store {
    constructor() {
        this.init();
    }

    @observable
    ready = false;

    @observable
    url = null;

    @observable
    params = null;

    
    @observable
    host = null;

    @observable
    showUrl = false;

    @action
    init = flow(() => {
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, (tabs) => {
            const { url } = tabs[0];
            this.url = url;
            this.params = getParamsFormURL(url);
            this.host = url.split('?')[0];
            this.ready = true;
        });
    })

    @action
    setUrl(url) {
        this.url = url;
        this.params = getParamsFormURL(url);
        console.log('ss',this.params)
    }

    @action
    setParams(params) {
        this.params = params;
        this.url = `${paramsToUrl(this.host, params)}`;
    }

    @action
    setShowUrl(boolval) {
        this.showUrl = !!boolval;
    }
}

const store = new Store();
export default store;
