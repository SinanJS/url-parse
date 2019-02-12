export const getParamsFormURL = (URL) => {
    const params = {};
    if (!URL || typeof URL !== 'string') {
        return params;
    }
    const query = URL.split('?').length > 1 ? URL.split('?')[1] : '';
    if (query) {
        query.split('&').forEach(item => {
            const arr = item.split('=');
            params[arr[0]] = arr[1];
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
        let value = data[key];
        dataFormated[key] = {
            checked: true,
            value
        }
    });
    return dataFormated;
}

export const paramsToUrl = (host, params) => {
    let query = '?';
    const keys = Object.keys(params);
    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            query += `${key}=${params[key]}`;
        } else {
            query += `${key}=${params[key]}&`;
        }
    });
    console.log(`${host}${query}`)
    return `${host}${query}`;
}