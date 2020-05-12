import axios from 'axios'
import { router } from '@/routes/router'
import { Message } from 'element-ui'
import { UrlUtils } from '@/utils/url'
import { SessionStorageUtils } from '@/utils/storage/session'
import { BACK_API_TOKEN } from '@/store/modules/app'

const errorMsgMap = new Map()
errorMsgMap.set('Network Error', '网络或服务器错误，请稍后再试')
axios.defaults.withCredentials = true

export class HttpUtils {
    static get(path: string, opts = {}) {
        return new Promise(function(resolve, reject) {
            axios
                .get(path, opts)
                .then(function(response) {
                    resolve(response.data)
                })
                .catch(function(error) {
                    reject(error)
                })
        })
    }

    static post(path: string, data: any, opts = {}) {
        const DEFAULT_POST_OPTS = {
            headers: {
                token: SessionStorageUtils.read(BACK_API_TOKEN),
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=UTF-8',
            },
        }
        opts = { ...DEFAULT_POST_OPTS, ...opts }
        return new Promise(function(resolve, reject) {
            axios
                .post(path, UrlUtils.stringify(data), opts)
                .catch(function(error: any) {
                    if (typeof error.response === 'undefined') {
                        resolve({
                            code: -1,
                            message: errorMsgMap.get(error.message),
                        })
                    } else if (error.response.status === 500) {
                        try {
                            resolve(JSON.parse(error.response.data.message))
                        } catch (e) {
                            resolve({
                                code: error.response.status,
                                message: error.response.data.message,
                            })
                        }
                    } else {
                        reject(error)
                    }
                })
                .then(function(response: any) {
                    if (response && response.data.code === 401) {
                        Message.error('您的登录状态已失效，请重新登录')
                        router.replace('/user/login')
                    } else if (response) {
                        resolve(response.data)
                    }
                })
        })
    }

    static uploadFile(url: string, data: FormData, method = 'post') {
        return new Promise(function(resolve, reject) {
            axios({
                url,
                data,
                method,
                headers: {
                    token: SessionStorageUtils.read(BACK_API_TOKEN),
                    'Content-Type': 'multipart/form-data',
                },
            })
                .catch(function(error: any) {
                    if (typeof error.response === 'undefined') {
                        resolve({
                            code: -1,
                            message: errorMsgMap.get(error.message),
                        })
                    } else if (error.response.status === 500) {
                        try {
                            resolve(JSON.parse(error.response.data.message))
                        } catch (e) {
                            resolve({
                                code: error.response.status,
                                message: error.response.data.message,
                            })
                        }
                    } else {
                        reject(error)
                    }
                })
                .then(function(response: any) {
                    if (response && response.data.code === 401) {
                        Message.error('您的登录状态已失效，请重新登录')
                        router.replace('/user/login')
                    } else if (response) {
                        resolve(response.data)
                    }
                })
        })
    }
}
