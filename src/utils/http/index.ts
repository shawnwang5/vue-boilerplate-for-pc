import axios from 'axios'
import { router } from '@/routes/router'
import { UrlUtils } from '@/utils/url'
import { Message } from 'element-ui'

const errorMsgMap = new Map()
errorMsgMap.set('Network Error', '网络或服务器错误，请稍后再试')

export class HttpUtils {
    static async get(url: string, data: any = {}, opts = {}) {
        try {
            if (UrlUtils.stringify(data)) {
                url =
                    url +
                    (url.includes('?') ? '&' : '?') +
                    UrlUtils.stringify(data)
            }
            const resp: any = await axios.get(url, opts)
            return resp.data
        } catch (e) {
            throw e
        }
    }

    static async post(url: string, data: any, opts = {}) {
        const options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            ...opts,
        }
        try {
            let postData = UrlUtils.stringify(data)
            if (options.headers['Content-Type'] === 'application/json') {
                postData = data
            }
            const resp: any = await axios.post(url, postData, options)
            if (resp && resp.data.code === 401) {
                Message.error('您的登录状态已失效，请重新登录')
                router.replace('/user/login')
            } else if (resp) {
                return resp.data
            }
        } catch (e) {
            if (typeof e.response === 'undefined') {
                return {
                    code: -1,
                    message: e.message,
                }
            } else if (e.response.status === 500) {
                const message = e.response.data.message
                try {
                    return JSON.parse(message)
                } catch (e) {
                    return { code: 500, message }
                }
            } else {
                throw e
            }
        }
    }

    static uploadFile(url: string, formData: FormData) {
        return HttpUtils.post(url, formData, {
            'Content-Type': 'multipart/form-data',
        })
    }
}
