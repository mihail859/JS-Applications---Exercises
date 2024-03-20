const settings = {
    host: ''
};

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'get', body) {
    const options = {
        method,
        headers: {}
    };

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    const accessToken = sessionStorage.getItem('accessToken');
    
    if (accessToken != null) {
        options.headers['X-Authorization'] = accessToken;
    }
    
    return options;
}

async function get(url) {
    return request(url, createOptions());
}

async function post(url, data) {
    return await request(url, createOptions('post', data));
}

async function put(url, data) {
    return request(url, createOptions('put', data));
}

async function del(url) {
    return request(url, createOptions('delete'));
}

async function login(email, password) {
    const response = await post(settings.host + '/users/login', { email, password });

    sessionStorage.setItem('accessToken', response.accessToken);
    sessionStorage.setItem('userId', response._id);
    sessionStorage.setItem('userEmail', response.email);

    return response;
}

async function register(email, password) {
    const response = await post(settings.host + '/users/register', { email, password });

    sessionStorage.setItem('accessToken', response.accessToken);
    sessionStorage.setItem('userId', response._id);
    sessionStorage.setItem('userEmail', response.email);

    return response;
}

async function logout() {
    const response = await get(settings.host + '/users/logout', createOptions());

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userEmail');

    return response;
}

function getUserEmail() {
    return sessionStorage.getItem('userEmail');
}

function getUserId() {
    return sessionStorage.getItem('userId');
}

export {
    settings,
    get,
    post,
    put,
    del,
    login,
    register,
    logout,
    getUserEmail,
    getUserId
};