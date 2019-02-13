export const getParamsFormURL = (URL) => {
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
                value: arr[1]
            };
        });
    }
    return params;
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

export const paramsToUrl = (host, params) => {
    const keys = Object.keys(params);
    let query = '?';
    keys.forEach((key, index) => {
        if (params[key].checked === false) {
            return;
        }
        query += `${key}=${params[key].value}&`;
    });
    return `${host}${query.substr(0, query.length - 1)}`;
}