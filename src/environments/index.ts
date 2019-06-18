import { LocalStorageUtils } from '../utils/storage/local'

declare const process: any

export const apiBaseUrlMap = new Map()
// apiBaseUrlMap.set('development', 'http://www.credit114.cn/merchantServer/api/')
// apiBaseUrlMap.set('development', 'http://172.18.132.195:21000/merchant/api/')
apiBaseUrlMap.set('development', 'http://39.105.209.85/merchant/api/')
// apiBaseUrlMap.set('production', 'http://39.105.209.85/merchant/api/')
apiBaseUrlMap.set('production', 'http://www.credit114.cn/merchantServer/api/')


let nodeEnv: string = process.env.NODE_ENV || 'development'
if (LocalStorageUtils.read('forTest') === 'true') {
    nodeEnv = 'test'
}

export const environments = {
    docTitle:'EMPFE',
    apiBaseURL: apiBaseUrlMap.get(nodeEnv),
    wechatAppId: '',
}
