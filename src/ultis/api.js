import Promise from 'bluebird'
import axios, { AxiosRequestConfig } from 'axios'

const ListErrors = {}

const defaultTimeout = 5000
const defaultRoles = []

Promise.config({
    cancellation: true,
    warnings: {
        wForgottenReturn: false
    }
})

const ApiInstance = axios.create({
    baseURL: getBaseUrl()
})

const ApiService = {
    roles: [],
    setRoles(roles) {
        this.roles = [].concat([], defaultRoles, roles)
    },
    addRole(role) {
        this.roles.push(role)
    },
    url(path) {
        if (String(path).match(/^https?:\/\//)) {
            return path
        }
        return getBaseUrl(path)
    },
    /**
     *
     * @returns {{accessToken: string, tokenType: string}}
     */
    getUserToken() {
        return getToken()
    },
    setUserToken(token) {
        return setToken(token)
    },
    removeUserToken() {
        return clearToken()
    },
    /**
     *
     * @param path
     * @param params
     * @param {AxiosRequestConfig} obj
     * @returns {Promise}
     */
    get(path, params, obj = {}) {
        if (!obj.params) obj.params = params
        if (!obj.timeout) obj.timeout = 10000
        return ApiInstance.get(path, obj)
    },
    /**
     *
     * @param path
     * @param data
     * @param {{currency}} obj
     * @returns {Promise}
     */
    post(path, data, obj) {
        if (typeof obj != 'object') obj = {}
        if (!obj.timeout) obj.timeout = 30000
        return ApiInstance.post(path, data, obj)
    },
    /**
     *
     * @param path
     * @param data
     * @param {AxiosRequestConfig} obj
     * @returns {Promise}
     */
    patch(path, data, obj) {
        if (typeof obj != 'object') obj = {}
        if (!obj.timeout) obj.timeout = 30000
        return ApiInstance.patch(path, data, obj)
    },
    /**
     *
     * @param path
     * @param data
     * @param {AxiosRequestConfig} obj
     * @returns {Promise}
     */
    put(path, data, obj) {
        if (typeof obj != 'object') obj = {}
        if (!obj.timeout) obj.timeout = 30000
        return ApiInstance.put(path, data, obj)
    },
    /**
     *
     * @param path
     * @param data
     * @param {AxiosRequestConfig} obj
     * @returns {Promise}
     */
    delete(path, obj) {
        // if (!obj.data) obj.data = data;
        return ApiInstance.delete(path, obj)
    },
    isSuccess(response) {
        return response.code === 0
    },
    getMessageError(response) {
        return ListErrors[response.code]
    }
}

ApiInstance.interceptors.request.use((config) => {
    if((process.env.VUE_APP_NODE_ENV == 'testing' || process.env.VUE_APP_NODE_ENV == 'production') && window.WalletApp){
        config.baseURL = window.WalletApp.$CoreSettings.get('link_api_app');
    }

    if (!config.timeout) {
        config.timeout = defaultTimeout
    }
    const dataToken = ApiService.getUserToken()

    // V-Dev EDITED HERE!!! ----------------------------------------------------------------------------------------------//
    // V-Dev EDITED HERE!!! ----------------------------------------------------------------------------------------------//
    // dataToken is a string ("value" property of "token" key in localStorage), so it doesnt have accessToken property   //
    if (dataToken /*dataToken.accessToken*/ && typeof dataToken === 'string') {
        config.headers['Authorization'] = `Bearer ${/*dataToken.accessToken*/ dataToken}`
        // config.headers['Access-Control-Allow-Origin'] = '*'
    }                                                                                                                 //
    // V-Dev EDITED HERE!!! -----------------------------------------------------------------------------------------//

    // if (ApiService.roles.length) {
    //     config.headers['X-Roles'] = `${this.roles.join(',')}`;
    // }
    // config.headers['X-Locale'] = getLanguage();
    return config
}, function (error) {
    return Promise.reject(error)
})

ApiInstance.interceptors.response.use((response) => {
    /*const data = response.data;
    const { code, status } = data;
    if (code === 0) */
    return response.data
}, (error) => {
    return Promise.reject(error)
})


ApiService.get('errors').then(response => {
    // ListErrors[800] = 'Không tìm thấy Route'
})

export { ApiService, ApiInstance }
