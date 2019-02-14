export const getParamsFromURL = (URL) => {
    const params = {};
    if (!URL || typeof URL !== 'string') {
        return params;
    }
    const query = URL.split('?').length > 1 ? URL.split('?')[1] : '';
    if (query) {
        query.split('&').forEach(item => {
            const arr = item.split('=');
            params[arr[0]] = {
                checked: true,
                value: arr[1] || ''
            };
        });
    }
    return params;
};

export const getArrFromURL = (URL) => {
    const keys = [];
    const values = [];
    if (!URL || typeof URL !== 'string') {
        return {
            keys,
            values
        };
    }
    const query = URL.split('?').length > 1 ? URL.split('?')[1] : '';
    if (query) {
        query.split('&').forEach(item => {
            const arr = item.split('=');
            keys.push(arr[0]);
            values.push({
                checked: true,
                value: arr[1] || ''
            })
        });
    }
    return {
        keys,
        values
    };
};

export const cleanData = (dataFormated) => {
    const data = {};
    Object.keys(dataFormated).forEach(key => {
        if (dataFormated[key].checked) {
            data[key] = dataFormated[key].value;
        }
    });
    return data;
};

export const formatedData = (data) => {
    const dataFormated = {};
    Object.keys(data).forEach(key => {
        let value = data[key] || '';
        dataFormated[key] = {
            checked: true,
            value
        }
    });
    return dataFormated;
}

export const paramsToUrl = (params, host) => {
    const keys = Object.keys(params);
    let query = '?';
    keys.forEach((key) => {
        if (params[key].checked === false) {
            return;
        }
        query += `${key}=${params[key].value}&`;
    });
    return `${host}${query.substr(0, query.length - 1)}`;
}

export const arrToUrl = (keys, values, host) => {
    let query = '?';
    keys.forEach((key, index) => {
        if (values[index].checked === false) {
            return;
        }
        query += `${key}=${values[index].value}&`;
    });
    return `${host}${query.substr(0, query.length - 1)}`;
}

export const exch = (arr, i, j) => {
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}